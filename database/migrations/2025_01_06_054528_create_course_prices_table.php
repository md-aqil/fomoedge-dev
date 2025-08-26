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
        Schema::create('course_prices', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_id')->constrained('courses');
            $table->double('price', 10, 2);
            $table->timestamp('start_at')->nullable();
            $table->timestamp('end_at')->nullable();
            $table->double('special_price', 10, 2)->nullable();
            $table->timestamp('special_price_start_at')->nullable();
            $table->timestamp('special_price_end_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('course_prices');
    }
};
