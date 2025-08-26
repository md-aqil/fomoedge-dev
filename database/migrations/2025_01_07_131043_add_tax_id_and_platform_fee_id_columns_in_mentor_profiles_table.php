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
        Schema::table('mentor_profiles', function (Blueprint $table) {
            $table->foreignId('tax_id')->nullable()->after('topic_tag_ids')->constrained('taxes');
            $table->foreignId('platform_fee_id')->nullable()->after('tax_id')->constrained('platform_fees');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('mentor_profiles', function (Blueprint $table) {
            //
        });
    }
};
