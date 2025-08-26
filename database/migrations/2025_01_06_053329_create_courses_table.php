<?php

use App\Enums\CourseTypeEnum;
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
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mentor_profile_id')->constrained('mentor_profiles');
            $table->string('type')->default(CourseTypeEnum::VIDEO_CALL);
            $table->string('title');
            $table->string('slug')->unique();
            $table->tinyText('excerpt')->nullable();
            $table->longText('description');
            $table->string('value')->nullable();
            $table->boolean('is_free')->default(false);
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
        Schema::dropIfExists('courses');
    }
};
