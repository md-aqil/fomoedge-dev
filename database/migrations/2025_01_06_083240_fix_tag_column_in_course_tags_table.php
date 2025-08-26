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
        Schema::table('course_tags', function (Blueprint $table) {
            $table->dropForeign('course_tags_tag_id_foreign');
            $table->dropColumn('tag_id');
            $table->foreignId('topic_tags_id')->after('course_id')->constrained('topic_tags');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('course_tags', function (Blueprint $table) {
            //
        });
    }
};
