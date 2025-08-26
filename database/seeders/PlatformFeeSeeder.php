<?php

namespace Database\Seeders;

use App\Models\PlatformFee;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PlatformFeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'title' => 'Flat 2% Platform Fee',
                'type' => 'percentage',
                'value' => 2,
                'is_default' => 0,
                'activated_at' => now()
            ],
            [
                'title' => 'Flat 1% Platform Fee',
                'type' => 'percentage',
                'value' => 1,
                'is_default' => 0,
                'activated_at' => now()
            ]
        ];
        PlatformFee::query()->update(['is_default' => 0]);
        foreach ($data as $data) {
            PlatformFee::firstOrCreate(['title' => $data['title']], $data);
        }
    }
}
