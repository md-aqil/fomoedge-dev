<?php

namespace App\Services;

use Exception;
use Google\ApiCore\ApiException;
use Google\Apps\Meet\V2\Client\SpacesServiceClient;
use Google\Apps\Meet\V2\CreateSpaceRequest;
use Google\Auth\Credentials\ServiceAccountCredentials;
use Illuminate\Support\Facades\Storage;
use Google\Client;
use Google\Service\Calendar;
use Google\Service\Calendar\Event;
use Google\Service\Calendar\EventDateTime;
use Google\Service\HangoutsChat\SetUpSpaceRequest;
use Google\Service\Meet;
use Google\Service\Meet\Space;
use Illuminate\Support\Facades\Http;

class GoogleClientServices
{
    private $serviceFilePath;
    private $oauth2FilePath;
    private $setClientScope;
    private $accessToken;
    private $client;
    private $calendarService;

    public function __construct()
    {
        $this->oauth2FilePath = Storage::disk('local')->get('private/fomoedge-oauth-credentials.json');
        $this->serviceFilePath = Storage::disk('local')->get('private/fomoedge-service-credentials.json');
        $this->setClientScope = [Calendar::CALENDAR, Meet::MEETINGS_SPACE_CREATED, Meet::MEETINGS_SPACE_READONLY];
        $this->setupClient();
        //$this->createServiceAccount();
        //$this->accessToken = $this->generateGoogleAccessToken()->getAccessToken();
    }

    public function setUpGetClient()
    {
        $client = new Client();
        $client->setAuthConfig(json_decode($this->serviceFilePath, true));
        $client->setScopes($this->setClientScope);
        $client->setAccessType('offline');
        $client->setApprovalPrompt('force');
        $client->setApplicationName('Fomoedge Web Application');
        $redirect_uri = url('admin/callback/google');
        $client->setRedirectUri($redirect_uri);
        $client->authorize();

        return $client;
    }

    public function setupClient()
    {
        // Create a new Google Client
        $this->client = new Client();

        // Set the path to your OAuth 2.0 credentials JSON file
        $this->client->setAuthConfig(json_decode($this->oauth2FilePath, true));

        // Add the required scopes
        $this->client->addScope(Calendar::CALENDAR);
        $this->client->addScope(Meet::MEETINGS_SPACE_CREATED);
        $this->client->addScope(Meet::MEETINGS_SPACE_READONLY);

        // Set up token management (you'll need to implement token refresh logic)
        $this->client->setAccessType('offline');
        $this->client->setPrompt('consent');
        $redirect_uri = url('admin/callback/google');
        $this->client->setRedirectUri($redirect_uri);

        // Create Calendar Service
        $this->calendarService = new Calendar($this->client);
    }

    public function generateGoogleAccessToken()
    {
        $client = new Client();
        $client->setAuthConfig(json_decode($this->serviceFilePath, true));
        $client->setScopes($this->setClientScope);
        $client->setAccessType('offline');
        $client->setApprovalPrompt('force');
        $client->setApplicationName('Fomoedge Web Application');
        $client->authorize();

        // Call the API to trigger token generation
        $service = new Calendar($client);
        $events = $service->events->listEvents('primary');

        // Access the access token
        $accessToken = $client->getAccessToken();
        $client->setAccessToken($accessToken);

        return $client;
    }

    public function setupServiceClient()
    {
        $serviceAccountCredentials = new ServiceAccountCredentials($this->setClientScope, json_decode($this->serviceFilePath, true));

        // Create a client.
        $spacesServiceClient = new SpacesServiceClient(['credentials' => $serviceAccountCredentials]);

        return $spacesServiceClient;
    }

    public function createServiceAccount()
    {
        $serviceAccountCredentials = new ServiceAccountCredentials($this->setClientScope, json_decode($this->serviceFilePath, true));

        //dd($serviceAccountCredentials);

        // Create a client.
        $spacesServiceClient = new SpacesServiceClient(['credentials' => $serviceAccountCredentials]);

        // Prepare the request message.
        $request = new CreateSpaceRequest();

        // Call the API and handle any network failures.
        try {
            /** @var Space $response */
            $response = $spacesServiceClient->createSpace($request);
            printf('Response data: %s' . PHP_EOL, $response->serializeToJsonString());
        } catch (ApiException $ex) {
            return $ex;
            printf('Call failed with message: %s' . PHP_EOL, $ex->getMessage());
        }
    }

    public function generateMeetLink($summary, $description, $startTime, $durationMinutes = 60)
    {
        // Create a new calendar event
        $event = new Event([
            'summary' => $summary,
            'description' => $description,
            'conferenceData' => [
                'createRequest' => [
                    'requestId' => uniqid(), // Unique request ID
                    'conferenceSolutionKey' => [
                        'type' => 'hangoutsMeet'
                    ]
                ]
            ]
        ]);

        // Set start time
        $start = new EventDateTime();
        $start->setDateTime(now());
        $event->setStart($start);

        // Set end time
        $end = new EventDateTime();
        $end->setDateTime(now()->addMinutes($durationMinutes));
        $event->setEnd($end);

        // Create the event with conference details
        $event = $this->calendarService->events->insert('primary', $event);

        dd($event);

        // Extract and return the Google Meet link
        $meetLink = $event->getHtmlLink();
        return $meetLink;
    }

    public function createMeetLinkWithCalendar()
    {
        try {
            $this->setupClient();
            $meetLink = $this->generateMeetLink(
                'Team Sync Meeting',
                'Weekly team synchronization call',
                '2024-01-15T10:00:00',
                60
            );
            return "Google Meet Link: " . $meetLink;
        } catch (Exception $e) {
            return "Error: " . $e->getMessage();
        }
    }

    public function createMeetingSpace($postData = [])
    {
        $this->setAndFetchToken();

        $postData = [
            "config" => [
                "accessType" => "OPEN",
                "entryPointAccess" => "ALL"
            ]
        ];

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->client->getAccessToken()['access_token'],
        ])->post('https://meet.googleapis.com/v2/spaces', $postData);

        if ($response->successful() && $response->ok() == 200) {
            return $response->object();
        } else {
            return $response->object();
        }
    }

    public function setAndFetchToken()
    {
        $tokenPath = 'private/token.json';
        if (Storage::disk('local')->exists($tokenPath)) {
            $accessToken = json_decode(Storage::disk('local')->get($tokenPath), true);
            $this->client->setAccessToken($accessToken);
        }

        if ($this->client->isAccessTokenExpired()) {
            if ($this->client->getRefreshToken()) {
                $accessToken = $this->client->fetchAccessTokenWithRefreshToken($this->client->getRefreshToken());
                $this->client->setAccessToken($accessToken);
                if (!file_exists(dirname($tokenPath))) {
                    mkdir(dirname($tokenPath), 0700, true);
                }
                file_put_contents(storage_path('app/' . $tokenPath), json_encode($accessToken));
            } else {
                $authCode = request()->code ?? null;

                if (!$authCode) {
                    return redirect()->away($this->client->createAuthUrl());
                }

                // Exchange authorization code for an access token
                $accessToken = $this->client->fetchAccessTokenWithAuthCode($authCode);
                $this->client->setAccessToken($accessToken);

                // Save the token for later use
                if (!file_exists(dirname($tokenPath))) {
                    mkdir(dirname($tokenPath), 0700, true);
                }
                file_put_contents(storage_path('app/' . $tokenPath), json_encode($accessToken));
            }
        }
    }

    public function oauth2GenerateAuthToken()
    {
        $authUrl = $this->client->createAuthUrl();
        return redirect()->away($authUrl);
    }
}
