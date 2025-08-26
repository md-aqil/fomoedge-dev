<?php

use App\Enums\BookingStatusEnum;
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
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_id')->constrained('courses');
            $table->foreignId('mentor_profile_id')->constrained('mentor_profiles');
            $table->foreignId('user_id')->nullable()->constrained('users');
            $table->string('full_name');
            $table->string('email');
            $table->string('phone_number');
            $table->tinyText('note')->nullable();
            $table->foreignId('course_timing_id')->nullable()->constrained('course_timings');
            $table->string('course_value')->nullable();
            $table->double('price', 10, 2);
            $table->double('special_price', 10, 2)->nullable()->default(0);
            $table->foreignId('tax_id')->nullable()->constrained('taxes');
            $table->double('tax_amount', 10, 2)->nullable()->default(0);
            $table->foreignId('platform_fee_id')->nullable()->constrained('platform_fees');
            $table->double('platform_fee_amount', 10, 2)->nullable()->default(0);
            $table->double('grand_total_amount', 10, 2);
            $table->json('create_payment_gateway')->nullable();
            $table->json('google_meet_response')->nullable();
            $table->boolean('is_gift')->default(false);
            $table->boolean('is_paid')->default(false);
            $table->string('status')->default(BookingStatusEnum::PENDING->value);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
