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
        Schema::table('topic_tags', function (Blueprint $table) {
            $table->text('tag_cta_description')->nullable()->after('tag_cta');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('topic_tags', function (Blueprint $table) {
            $table->dropColumn(['tag_cta_description']);
        });
    }
};
