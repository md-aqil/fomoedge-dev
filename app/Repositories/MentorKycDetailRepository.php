<?php

namespace App\Repositories;

use App\Enums\AttachmentTypeEnum;
use App\Models\MentorKycDetail;
use App\Models\MentorProfile;
use App\Services\RazorPayService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class MentorKycDetailRepository extends BaseRepository
{
    public $model;

    function __construct(MentorKycDetail $model, protected RazorPayService $razorPayService)
    {
        $this->model = $model;
    }

    public function storeWithRazorPay($request)
    {
        $razorPayAccountCreationData = [
            'email' => $request->email,
            'phone' => $request->phone_number,
            'type' =>  "route",
            'reference_id' => (string) mt_rand(100000, 999999),
            'legal_business_name' => $request->bank_account_holder_name,
            'business_type' => "individual",
            "contact_name" => $request->full_name,
            "profile" => [
                "category" => "education",
                "subcategory" => "professional_courses",
                "addresses" => [
                    "registered" => [
                        "street1" => $request->address,
                        "street2" => $request->address,
                        "city" =>   $request->city,
                        "state" =>  $request->state,
                        "postal_code" => $request->pin_code,
                        "country" => $request->country,
                    ]
                ]
            ]
        ];

        $razorPayResponse = $this->razorPayService->createAccount($razorPayAccountCreationData);

        if ($razorPayResponse['status'] == true && $razorPayResponse['status_code'] == 200) {

            $kycDetails = $this->create($request->all());

            $this->update($kycDetails->id, [
                'razor_pay_account' => $razorPayResponse['data'],
            ]);

            if ($request->hasFile('pan_card_attachment')) {
                $this->uploadAttachment(
                    $kycDetails,
                    $request->pan_card_attachment,
                    new Request(['type' =>  AttachmentTypeEnum::PAN_CARD->value])
                );
            }

            return ['status' => true, 'message' => 'KYC details added successfully', 'data' => $kycDetails];
        } else {
            return ['status' => false, 'message' => $razorPayResponse['message']];
        }
    }

    public function storeAndUpdateRazorPayKyc($mentorProfile)
    {
        $mentorProfile->load('kycDetail');
        $kycDetail = $mentorProfile->kycDetail;
        $razorPayService = $this->razorPayService;

        if ($kycDetail) {
            if ($kycDetail->razor_pay_account) {
                $razorPayAccount = $kycDetail->razor_pay_account;

                $updateRazorPayRouteAccountData = [
                    'phone' => $kycDetail->phone_number,
                    'legal_business_name' => $kycDetail->bank_account_holder_name,
                    "contact_name" => $kycDetail->full_name,
                    "profile" => [
                        "category" => "education",
                        "subcategory" => "professional_courses",
                        "addresses" => [
                            "registered" => [
                                "street1" => $kycDetail->address,
                                "street2" => $kycDetail->address,
                                "city" =>   $kycDetail->city,
                                "state" =>  $kycDetail->state,
                                "postal_code" => $kycDetail->pin_code,
                                "country" => $kycDetail->country,
                            ]
                        ]
                    ]
                ];

                $response = $razorPayService->updateAccount($razorPayAccount->id, $updateRazorPayRouteAccountData);

                if ($response['status'] == true && $response['status_code'] == 200) {
                    $this->update($kycDetail->id, [
                        'razor_pay_account' => $response['data']
                    ]);
                    $kycDetail->refresh();
                } else {
                    return [
                        'status' => false,
                        'message' => $response['message'],
                        'additional_message' => 'Kyc Account Creation Failed',
                    ];
                }
            } else {
                $createRazorPayRouteAccountData = [
                    'email' => $kycDetail->email,
                    'phone' => $kycDetail->phone_number,
                    "type" => "route",
                    "reference_id" => (string) mt_rand(100000, 999999),
                    'legal_business_name' => $kycDetail->bank_account_holder_name,
                    'business_type' => "individual",
                    "contact_name" => $kycDetail->full_name,
                    "profile" => [
                        "category" => "education",
                        "subcategory" => "professional_courses",
                        "addresses" => [
                            "registered" => [
                                "street1" => $kycDetail->address,
                                "street2" => $kycDetail->address,
                                "city" =>   $kycDetail->city,
                                "state" =>  $kycDetail->state,
                                "postal_code" => $kycDetail->pin_code,
                                "country" => $kycDetail->country,
                            ]
                        ]
                    ]
                ];

                $response = $razorPayService->createAccount($createRazorPayRouteAccountData);

                if ($response['status'] == true && $response['status_code'] == 200) {
                    $this->update($kycDetail->id, [
                        'razor_pay_account' => $response['data']
                    ]);
                    $kycDetail->refresh();
                } else {
                    return [
                        'status' => false,
                        'message' => $response['message'],
                        'additional_message' => 'Kyc Account Creation Failed',
                    ];
                }
            }

            $razorPayAccount = $kycDetail->razor_pay_account;

            if ($kycDetail->razor_pay_account_stake_holder) {
                $stakeHolderInfo = $kycDetail->razor_pay_account_stake_holder;
            } else {
                $createStakeHolderAccountData = [
                    "name" => $kycDetail->full_name,
                    "email" => $kycDetail->email,
                    "addresses" => [
                        "residential" => [
                            "street" => $kycDetail->address,
                            "city" =>   $kycDetail->city,
                            "state" =>  $kycDetail->state,
                            "postal_code" => $kycDetail->pin_code,    //"110034",
                            "country" =>  strtolower($kycDetail->country),
                        ]
                    ],
                    "kyc" => [
                        //"pan" => $request->pan_number,   //AAACL1234C
                    ],
                    "notes" => [
                        //"random_key" => "random_value"
                    ]
                ];

                $response = $razorPayService->createAccountStakeholder($razorPayAccount->id, $createStakeHolderAccountData);

                if ($response['status'] == true && $response['status_code'] == 200) {
                    $this->update($kycDetail->id, [
                        'razor_pay_account_stake_holder' => $response['data']
                    ]);
                    $kycDetail->refresh();
                    $stakeHolderInfo = MentorKycDetail::find($kycDetail->id)->razor_pay_account_stake_holder;
                } else {
                    return [
                        'status' => false,
                        'message' => $response['message'],
                        'additional_message' => 'Kyc Stake Holder Account Creation Failed',
                    ];
                }
            }

            if ($kycDetail->razor_pay_account_product_configuration) {
                $productConfigureInfo = $kycDetail->razor_pay_account_product_configuration;
            } else {
                $response = $razorPayService->requestProductConfiguration($razorPayAccount->id);

                if ($response['status'] == true && $response['status_code'] == 200) {
                    $this->update($kycDetail->id, [
                        'razor_pay_account_product_configuration' => $response['data']
                    ]);
                    $kycDetail->refresh();
                    $productConfigureInfo = MentorKycDetail::find($kycDetail->id)->razor_pay_account_product_configuration;
                } else {
                    return [
                        'status' => false,
                        'message' => $response['message'],
                        'additional_message' => 'Kyc Product Configuration Creation Failed',
                    ];
                }
            }

            $updateProductConfigurationData = [
                "settlements" => [
                    "account_number" => $kycDetail->bank_account_number,
                    "ifsc_code" => $kycDetail->bank_ifsc_code,
                    "beneficiary_name" => $kycDetail->bank_account_holder_name,
                ],
                "tnc_accepted" => true
            ];

            $response = $razorPayService->updateProductConfiguration($razorPayAccount->id, $productConfigureInfo->id, $updateProductConfigurationData);

            if ($response['status'] == true && $response['status_code'] == 200) {
                $this->update($kycDetail->id, [
                    'razor_pay_account_product_configuration' => $response['data']
                ]);
                $kycDetail->refresh();
                $productConfigureInfo = MentorKycDetail::find($kycDetail->id)->razor_pay_account_product_configuration;
            } else {
                return [
                    'status' => false,
                    'message' => $response['message'],
                    'additional_message' => 'Kyc Product Configuration Updating Failed',
                ];
            }

            $kycDetail->razor_pay_status = 1;
            $kycDetail->save();

            return [
                'status' => 'success',
                'message' => 'KYC details added successfully',
                'additional_message' => 'KYC details added successfully',
            ];
        } else {
            return ['status' => false, 'message' => 'KYC details not found'];
        }
    }
}
