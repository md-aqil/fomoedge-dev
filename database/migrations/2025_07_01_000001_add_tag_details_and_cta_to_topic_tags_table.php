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
            $table->text('tag_details')->nullable()->after('schema');
            $table->json('tag_cta')->nullable()->after('tag_details');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('topic_tags', function (Blueprint $table) {
            $table->dropColumn(['tag_details', 'tag_cta']);
        });
    }
};
