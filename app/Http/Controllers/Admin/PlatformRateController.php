<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\PlatformFeeRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PlatformRateController extends Controller
{
    public function __construct(protected PlatformFeeRepository $platformFeeRepository) {}

    public function index(Request $request)
    {
        $taxes = $this->platformFeeRepository->latest()->paginate($request->limit ?? config('app.pagination_limit'))->withQueryString();

        return Inertia::render('Admin/PlatformRates/PlatformRates', compact('taxes'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'type' => 'required|string|in:PERCENTAGE,FIXED',
            'value' => 'required|numeric',
            'is_default' => 'sometimes|required|boolean',
            'activated_at' => 'sometimes|required|boolean',
        ]);

        if ($request->is_default && $request->filled('is_default')) {
            $this->platformFeeRepository->model()->update(['is_default' => false]);
        }

        $request->merge(['activated_at' => $request->activated_at ? now() : null]);

        $platformFeeRepository = $this->platformFeeRepository->create($request->all());

        return redirect()->back()->with(['flash_type' => 'success', 'flash_message' => 'Platform rate created successfully', 'flash_description' => $platformFeeRepository->title]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'sometimes|required|string',
            'type' => 'sometimes|required|string|in:PERCENTAGE,FIXED',
            'value' => 'sometimes|required|numeric',
            'is_default' => 'sometimes|required|boolean',
            'activated_at' => 'sometimes|required|boolean',
        ]);

        $platformFeeRepository = $this->platformFeeRepository->findOrFail($id);

        if ($request->is_default && $request->filled('is_default')) {
            $this->platformFeeRepository->model()->update(['is_default' => false]);
        }

        if ($request->activated_at || $request->activated_at == '0') {
            $request->merge(['activated_at' => $request->activated_at ? now() : null]);
        }

        $platformFeeRepository->update($request->all());

        return redirect()->back()->with(['flash_type' => 'success', 'flash_message' => 'Platform rate updated successfully', 'flash_description' => $platformFeeRepository->title]);
    }
}
