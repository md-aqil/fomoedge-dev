<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('mentor_kyc_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mentor_profile_id')->constrained('mentor_profiles');
            $table->string('full_name');
            $table->string('email');
            $table->string('phone_number');
            $table->string('pan_number');
            $table->string('gst')->nullable();
            $table->string('address');
            $table->string('city');
            $table->string('state');
            $table->string('country');
            $table->string('pin_code');
            $table->string('bank_name');
            $table->string('bank_account_number');
            $table->string('bank_ifsc_code');
            $table->string('bank_account_holder_name');
            $table->json('razor_pay_account')->nullable();
            $table->json('razor_pay_account_stake_holder')->nullable();
            $table->json('razor_pay_account_product_configuration')->nullable();
            $table->boolean('razor_pay_status')->default(false);
            $table->timestamp('activated_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mentor_kyc_details');
    }
};
