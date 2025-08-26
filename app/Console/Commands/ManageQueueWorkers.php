<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Process;

class ManageQueueWorkers extends Command
{
    protected $signature = 'queue:manage {action : Action to perform (restart|clear|status)}';
    protected $description = 'Manage queue workers and clear stale jobs';

    public function handle()
    {
        $action = $this->argument('action');

        switch ($action) {
            case 'restart':
                $this->restartWorkers();
                break;
            case 'clear':
                $this->clearStaleJobs();
                break;
            case 'status':
                $this->showStatus();
                break;
            default:
                $this->error('Invalid action. Use: restart, clear, or status');
                return 1;
        }

        return 0;
    }

    private function restartWorkers()
    {
        $this->info('Restarting queue workers...');

        // Kill existing queue workers
        Process::run('pkill -f "queue:work"');

        // Start new workers
        Process::run('php artisan queue:work --daemon --sleep=3 --tries=3 --max-time=3600');

        $this->info('Queue workers restarted successfully.');
    }

    private function clearStaleJobs()
    {
        $this->info('Clearing stale jobs...');

        $cleared = DB::table('jobs')
            ->where('reserved_at', '<=', now()->subMinutes(10))
            ->update(['reserved_at' => null]);

        $this->info("Cleared {$cleared} stale jobs.");
    }

    private function showStatus()
    {
        $totalJobs = DB::table('jobs')->count();
        $reservedJobs = DB::table('jobs')->whereNotNull('reserved_at')->count();
        $availableJobs = DB::table('jobs')->whereNull('reserved_at')->count();

        $this->info("Queue Status:");
        $this->line("Total jobs: {$totalJobs}");
        $this->line("Reserved jobs: {$reservedJobs}");
        $this->line("Available jobs: {$availableJobs}");
    }
}