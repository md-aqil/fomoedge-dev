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
		Schema::create('b2b_mentorship_queries', function (Blueprint $table) {
			$table->id();
			$table->foreignId('mentor_profile_id')->nullable()->constrained('mentor_profiles');
			$table->foreignId('user_id')->nullable()->constrained('users');
			$table->boolean('isInterested')->default(false);
			$table->json('preferred_modes')->nullable()->default(null);
			$table->json('interested_institutions')->nullable()->default(null);
			$table->json('minimum_hourly_rate')->nullable()->default(null);
			$table->boolean('open_to_long_duration_mentorship')->default(false);
			$table->longText('about')->nullable()->default(null);
			$table->json('meta')->nullable()->default(null);
			$table->longText('notes')->nullable()->default(null);
			$table->timestamps();
			$table->softDeletes();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('b2b_mentorship_queries');
	}
};
