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
            $table->foreignId('phone_country_id')->nullable()->after('show_alias')->constrained('countries');
            $table->string('company_name')->nullable()->after('bio');
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
