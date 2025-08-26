<?php

namespace App\Services;

use Exception;
use Illuminate\Support\Facades\Http;
use PHPUnit\Event\Runtime\PHP;
use Razorpay\Api\Api;

class RazorPayService
{
    protected $razorPayKey;
    protected $razorPaySalt;
    protected $razorPayApi;
    protected $razorPayApiUrl;

    public function __construct()
    {
        $this->razorPayKey = env('RAZORPAY_KEY');
        $this->razorPaySalt = env('RAZORPAY_SALT');
        $this->razorPayApi = new Api($this->razorPayKey, $this->razorPaySalt);
        $this->razorPayApiUrl = Http::baseUrl("https://api.razorpay.com/v2")->withBasicAuth($this->razorPayKey, $this->razorPaySalt);
    }

    /*
        $data = [
            // "email" => "gaurav.kumar@exampla.com",
            "phone" => "9000090002",
       s     // "type" => "route",
            // "reference_id" => mt_rand(100000, 999999),
            "legal_business_name" => "Acme Corp",
            // "business_type" => "partnership",
            "contact_name" => "Gaurav Kumar",
            "profile" => [
                "category" => "healthcare",
                "subcategory" => "clinic",
                "addresses" => [
                    "registered" => [
                        "street1" => "507, Koramangala 1st block",
                        "street2" => "MG Road",
                        "city" => "Bengaluru",
                        "state" => "KARNATAKA",
                        "postal_code" => "560034",
                        "country" => "IN"
                    ]
                ]
            ],
            "legal_info" => [
                "pan" => "AAACL1234A",
                "gst" => "18AABCU9603R1ZN"
            ]
        ];
    */
    public function createAccount($data)
    {
        try {
            $response = $this->razorPayApiUrl->post('accounts', $data);
            $responseObject = $response->object();
            if ($response->successful() && $response->ok() == 200) {
                return ['status' => true, 'status_code' => $response->status(), 'data' => $responseObject];
            } else {
                return ['status' => false, 'status_code' => $response->status(), 'message' => $responseObject->error->description, 'data' => $responseObject];
            }
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'status_code' => $e->getCode(),
                'message' => $e->getMessage()
            ]);
        }
    }

    /*
        $data = [
            "email" => "gaurav.kumar@exampla.com",
            "phone" => "9000090002",
            "type" => "route",
            "reference_id" => mt_rand(100000, 999999),
            "legal_business_name" => "Acme Corp",
            "business_type" => "partnership",
            "contact_name" => "Gaurav Kumar",
            "profile" => [
                "category" => "healthcare",
                "subcategory" => "clinic",
                "addresses" => [
                    "registered" => [
                        "street1" => "507, Koramangala 1st block",
                        "street2" => "MG Road",
                        "city" => "Bengaluru",
                        "state" => "KARNATAKA",
                        "postal_code" => "560034",
                        "country" => "IN"
                    ]
                ]
            ],
            "legal_info" => [
                "pan" => "AAACL1234A",
                "gst" => "18AABCU9603R1ZN"
            ]
        ];
    */
    public function updateAccount($razorPayAccountId, $data)
    {
        try {
            $response = $this->razorPayApiUrl->withUrlParameters([
                'razorPayAccountId' => $razorPayAccountId
            ])->patch('accounts/{razorPayAccountId}', $data);
            $responseObject = $response->object();
            if ($response->successful() && $response->ok() == 200) {
                return ['status' => true, 'status_code' => $response->status(), 'data' => $responseObject];
            } else {
                return ['status' => false, 'status_code' => $response->status(), 'message' => $responseObject->error->description, 'data' => $responseObject];
            }
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'status_code' => $e->getCode(),
                'message' => $e->getMessage()
            ]);
        }
    }

    public function fetchAccount($razorPayAccountId)
    {
        try {
            $response = $this->razorPayApiUrl->withUrlParameters([
                'razorPayAccountId' => $razorPayAccountId
            ])->get('accounts/{razorPayAccountId}');
            $responseObject = $response->object();
            if ($response->successful() && $response->ok() == 200) {
                return ['status' => true, 'status_code' => $response->status(), 'data' => $responseObject];
            } else {
                return ['status' => false, 'status_code' => $response->status(), 'message' => $responseObject->error->description, 'data' => $responseObject];
            }
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'status_code' => $e->getCode(),
                'message' => $e->getMessage()
            ]);
        }
    }

    /*
        $data = [
            "name" => "Gaurav Kumar",
            "email" => "gaurav.kumar@example.com",
            "addresses" => [
                "residential" => [
                    "street" => "506, Koramangala 1st block",
                    "city" => "Bengaluru",
                    "state" => "Karnataka",
                    "postal_code" => "560034",
                    "country" => "IN"
                ]
            ],
            "kyc" => [
                // "pan" => "AAACL1234A"
            ],
            "notes" => [
                "random_key" => "random_value"
            ]
        ];
    */
    public function createAccountStakeholder($razorPayAccountId, $data)
    {
        try {
            $response = $this->razorPayApiUrl->withUrlParameters([
                'razorPayAccountId' => $razorPayAccountId,
            ])->post('accounts/{razorPayAccountId}/stakeholders', $data);
            $responseObject = $response->object();
            if ($response->successful() && $response->ok() == 200) {
                return ['status' => true, 'status_code' => $response->status(), 'data' => $responseObject];
            } else {
                return ['status' => false, 'status_code' => $response->status(), 'message' => $responseObject->error->description, 'data' => $responseObject];
            }
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'status_code' => $e->getCode(),
                'message' => $e->getMessage()
            ]);
        }
    }

    /*
        $data = [
            "product_name" => "route",
            "tnc_accepted" => true
        ];
    */
    public function requestProductConfiguration($razorPayAccountId, $data = null)
    {
        $data = [
            "product_name" => "route",
            "tnc_accepted" => true
        ];

        try {
            $response = $this->razorPayApiUrl->withUrlParameters([
                'razorPayAccountId' => $razorPayAccountId,
            ])->post('accounts/{razorPayAccountId}/products', $data);
            $responseObject = $response->object();
            if ($response->successful() && $response->ok() == 200) {
                return ['status' => true, 'status_code' => $response->status(), 'data' => $responseObject];
            } else {
                return ['status' => false, 'status_code' => $response->status(), 'message' => $responseObject->error->description, 'data' => $responseObject];
            }
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'status_code' => $e->getCode(),
                'message' => $e->getMessage()
            ]);
        }
    }

    /*
        $updateProductConfiguration = [
            "settlements" => [
                "account_number" => "1234567890",
                "ifsc_code" => "HDFC0000317",
                "beneficiary_name" => "Gaurav Kumar"
            ],
            "tnc_accepted" => true
        ];
    */
    public function updateProductConfiguration($razorPayAccountId, $razorPayProductId, $data)
    {
        try {
            $response = $this->razorPayApiUrl->withUrlParameters([
                'razorPayAccountId' => $razorPayAccountId,
                'razorPayProductId' => $razorPayProductId
            ])->patch('accounts/{razorPayAccountId}/products/{razorPayProductId}', $data);
            $responseObject = $response->object();
            if ($response->successful() && $response->ok() == 200) {
                return ['status' => true, 'status_code' => $response->status(), 'data' => $responseObject];
            } else {
                return ['status' => false, 'status_code' => $response->status(), 'message' => $responseObject->error->description, 'data' => $responseObject];
            }
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'status_code' => $e->getCode(),
                'message' => $e->getMessage()
            ]);
        }
    }

    /*
        $transferRequest = [
            "transfers" => [
                [
                    "account" => "acc_PWBmFNE95frHRe",
                    "amount" => 1 * 100,
                    "currency" => "INR",
                    "notes" => [
                        "name" => "Saurav Kumar",
                        "roll_no" => "IEC2011026"
                    ],
                    "linked_account_notes" => [
                        "roll_no"
                    ],
                    // "on_hold" => false
                    "on_hold" => true,
                    "on_hold_until" => strtotime(now()->addWeek())
                ]
            ]
        ];
    */
    public function transferMoney($paymentId, $data)
    {
        try {
            $response = $this->razorPayApi->payment->fetch($paymentId)->transfer($data);
            return ['status' => true, 'status_code' => 200, 'data' => collect($response)->toArray()];
        } catch (Exception $e) {
            return [
                'status' => false,
                'status_code' => $e->getCode(),
                'message' => $e->getMessage()
            ];
        }
    }

    /*
    $data = ['account' => $accountId, 'amount' => 500, 'currency' => 'INR']
    */
    public function directTransfer(array $data)
    {
        try {
            $response = $this->razorPayApi->transfer->create($data);
            return ['status' => true, 'status_code' => 200, 'data' => collect($response)->toArray()];
        } catch (Exception $e) {
            return [
                'status' => false,
                'status_code' => $e->getCode(),
                'message' => $e->getMessage()
            ];
        }
    }

    // $data = ['receipt' => '123', 'amount' => 100, 'currency' => 'INR', 'notes'=> array('key1'=> 'value3','key2'=> 'value2')];
    public function createOrder($data)
    {
        try {
            $response = $this->razorPayApi->order->create($data);
            return ['status' => true, 'status_code' => 200, 'data' => collect($response)->toArray()];
        } catch (Exception $e) {
            return [
                'status' => false,
                'status_code' => $e->getCode(),
                'message' => $e->getMessage()
            ];
        }
    }

    public function createPaymentLink($data)
    {
        try {
            $response = $this->razorPayApi->paymentLink->create($data);
            return ['status' => true, 'status_code' => 200, 'data' => collect($response)->toArray()];
        } catch (Exception $e) {
            return [
                'status' => false,
                'status_code' => $e->getCode(),
                'message' => $e->getMessage()
            ];
        }
    }

    public function fetchPaymentWithId(string $paymentId)
    {
        try {
            $response = $this->razorPayApi->payment->fetch($paymentId);
            return ['status' => true, 'status_code' => 200, 'data' => collect($response)->toArray()];
        } catch (Exception $e) {
            return [
                'status' => false,
                'status_code' => $e->getCode(),
                'message' => $e->getMessage()
            ];
        }
    }
}
