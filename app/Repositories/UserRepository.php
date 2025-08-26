<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Auth\Events\Registered;

class UserRepository extends BaseRepository
{
    public $model;

    function __construct(User $model)
    {
        $this->model = $model;
    }

    public function filter($request, $with = [])
    {
        $model = $this->model;

        if (!empty($with)) {
            $model = $model->with($with);
        }

        if ($request->has('role_type') && $request->filled('role_type')) {
            $model = $model->whereHas('roles', function ($q) use ($request) {
                $q->where('name', $request->role_type);
            });
        }

        return $model;
    }

    public function authByUserId($id)
    {
        return Auth::loginUsingId($id);
    }

    public function createMentorUser(array $data)
    {
        $user = $this->model->create($data);
        $this->assignRole($user, 'mentor');
        return $user;
    }

    public function createUser(array $data)
    {
        $user = $this->model->create($data);
        $this->assignRole($user, 'user');
        return $user;
    }

    public function assignRole(User $user, string $role = 'mentor')
    {
        $user->assignRole($role);
        return $user;
    }

    public function sendEmailVerificationNotification(User $user)
    {
        event(new Registered($user));
    }

    public function logout($request)
    {
        $user = $request->user();

        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();
    }
}
