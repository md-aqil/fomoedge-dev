<?php

namespace App\Services;

use Exception;
use Illuminate\Support\Facades\Http;

class CashfreeService
{
    protected $cashfreeXApiVersion;
    protected $cashfreeXApiUrl;
    protected $cashfreeXClientId;
    protected $cashfreeXClientSecret;
    protected $cashfreeApiUrl;

    public function __construct()
    {
        $this->cashfreeXApiVersion = env('CASHFREE_X_API_VERSION');
        $this->cashfreeXApiUrl = "https://sandbox.cashfree.com/pg"; //env('CASHFREE_X_API_URL');
        $this->cashfreeXClientId = env('CASHFREE_X_CLIENT_ID');
        $this->cashfreeXClientSecret = env('CASHFREE_X_CLIENT_SECRET');

        $this->cashfreeApiUrl = Http::baseUrl($this->cashfreeXApiUrl)->withHeaders([
            'x-api-version' => $this->cashfreeXApiVersion,
            'x-client-id' => $this->cashfreeXClientId,
            'x-client-secret' => $this->cashfreeXClientSecret,
        ]);
    }

    /*{
        "customer_details": {
            "customer_email": "john@cashfree.com",
            "customer_name": "John Doe",
            "customer_phone": "9999999999"
        },
        "link_amount": 100,
        "link_auto_reminders": true,
        "link_currency": "INR",
        "link_expiry_time": "2021-10-14T15:04:05+05:30",
        "link_id": "my_link_id",
        "link_meta": {
            "notify_url": "https://ee08e626ecd88c61c85f5c69c0418cb5.m.pipedream.net",
            "return_url": "https://www.cashfree.com/devstudio/thankyou",
            "upi_intent": false
        },
        "link_minimum_partial_amount": 20,
        "link_notes": {
            "key_1": "value_1",
            "key_2": "value_2"
        },
        "link_notify": {
            "send_email": true,
            "send_sms": false
        },
        "link_partial_payments": true,
        "link_purpose": "Payment for PlayStation 11",
        "order_splits": [
            {
            "vendor_id": "Jane",
            "amount": 1.45,
            "tags": {
                "address": "Hyderabad"
            }
            },
            {
            "vendor_id": "Barbie",
            "amount": 3.45,
            "tags": {
                "address": "Bengaluru, India"
            }
            }
        ]
    }*/
    public function createPaymentLink($data)
    {
        try {
            $response = $this->cashfreeApiUrl->post('/links', $data);
            if ($response->successful() && $response->ok() == 200) {
                return ['status' => true, 'status_code' => $response->status(), 'data' => $response->object()];
            } else {
                return ['status' => false, 'status_code' => $response->status(), 'message' => $response->object()->message, 'data' => $response->object()];
            }
        } catch (Exception $e) {
            return ['status' => false, 'status_code' => $e->getCode(), 'message' => $e->getMessage(), 'data' => $e->getFile() . ' ' . $e->getLine() . ' ' . $e->getMessage()];
        }
    }
}
