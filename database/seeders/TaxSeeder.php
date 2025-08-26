<?php

namespace Database\Seeders;

use App\Models\Tax;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TaxSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'title' => 'Indian Tax (18%)',
                'value' => 18,
                'is_default' => 0,
                'activated_at' => now()
            ],
            [
                'title' => 'Indian Tax (12%)',
                'value' => 12,
                'is_default' => 0,
                'activated_at' => now()
            ]
        ];

        foreach ($data as $tax) {
            Tax::firstOrCreate(['title' => $tax['title']], $tax);
        }
    }
}
