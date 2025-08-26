<?php

use App\Enums\MentorProfileStatusEnum;
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
        Schema::create('mentor_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users');
            $table->boolean('show_email')->default(true);
            $table->string('alias_name')->nullable();
            $table->boolean('show_alias')->default(true);
            $table->string('phone');
            $table->boolean('show_phone')->default(true);
            $table->tinyText('why_choose_us')->nullable();
            $table->string('experience')->nullable();
            $table->tinyText('short_description')->nullable();
            $table->text('bio')->nullable();
            $table->json('languages')->nullable();
            $table->json('educations')->nullable();
            $table->json('social_links')->nullable();
            $table->json('topic_ids')->nullable();
            $table->json('tag_ids')->nullable();
            $table->string('status', 10)->default(MentorProfileStatusEnum::PENDING);
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
        Schema::dropIfExists('mentor_profiles');
    }
};
