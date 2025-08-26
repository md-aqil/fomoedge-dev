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
        Schema::table('topics', function (Blueprint $table) {
            $table->text('meta_tags')->nullable()->after('slug');
            $table->text('description')->nullable()->after('meta_tags');
            $table->text('keywords')->nullable()->after('description');
            $table->text('schema')->nullable()->after('keywords');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('topics', function (Blueprint $table) {
            $table->dropColumn(['meta_tags', 'description', 'keywords', 'schema']);
        });
    }
};
