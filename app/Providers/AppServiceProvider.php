<?php

namespace App\Providers;

use App\Models\MentorProfile;
use App\Models\Setting;
use App\Observers\MentorProfileObserver;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\View;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Arr;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Gate::before(function ($user, $ability) {
            return true; //$user->is_super_admin ? true : null;
        });

        try {
            View::share('globalSettings', [
                'general' => Setting::getValues('general'),
                'scripts' => Setting::getValues('scripts')
            ]);
        } catch (\Throwable $th) {
            //throw $th;
        }

        // Event::listen();

        $this->registerObservers();

        $this->bootFunction();
    }

    protected function bootFunction(): void
    {
        Builder::macro('whereLike', function ($attributes, string $searchTerm) {
            $this->where(function (Builder $query) use ($attributes, $searchTerm) {
                foreach (Arr::wrap($attributes) as $attribute) {
                    $query->when(
                        str_contains($attribute, '.'),
                        function (Builder $query) use ($attribute, $searchTerm) {
                            [$relationName, $relationAttribute] = explode('.', $attribute);

                            $query->orWhereHas($relationName, function (Builder $query) use ($relationAttribute, $searchTerm) {
                                $query->where($relationAttribute, 'LIKE', "%{$searchTerm}%");
                            });
                        },
                        function (Builder $query) use ($attribute, $searchTerm) {
                            $query->orWhere($attribute, 'LIKE', "%{$searchTerm}%");
                        }
                    );
                }
            });

            return $this;
        });

        $this->customizeEmailVerification();
    }

    public function customizeEmailVerification()
    {
        VerifyEmail::toMailUsing(function (object $notifiable, string $url) {
            return (new MailMessage)
                ->subject('Verify Email Address')
                ->view('mails.verify-email', ['url' => $url, 'notifiable' => $notifiable]);
        });
    }

    public function registerObservers()
    {
        MentorProfile::observe(MentorProfileObserver::class);
    }
}
