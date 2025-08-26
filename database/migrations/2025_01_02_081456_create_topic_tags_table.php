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
        Schema::create('topic_tags', function (Blueprint $table) {
            $table->id();
            $table->foreignId('topic_id')->constrained('topics');
            $table->string('title');
            $table->string('slug')->unique();
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
        Schema::dropIfExists('topic_tags');
    }
};
