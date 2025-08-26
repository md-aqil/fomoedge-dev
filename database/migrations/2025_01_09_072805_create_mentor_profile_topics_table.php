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
        Schema::create('mentor_profile_topics', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mentor_profile_id')->constrained('mentor_profiles');
            $table->foreignId('topic_id')->constrained('topics');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mentor_profile_topics');
    }
};
