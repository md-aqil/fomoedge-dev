<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\TaxRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaxController extends Controller
{
    public function __construct(protected TaxRepository $taxRepository) {}

    public function index(Request $request)
    {
        $taxes = $this->taxRepository->latest()->paginate($request->limit ?? config('app.pagination_limit'))->withQueryString();

        return Inertia::render('Admin/Taxes/Taxes', compact('taxes'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'value' => 'required|numeric',
            'is_default' => 'sometimes|required|boolean',
            'activated_at' => 'sometimes|required|boolean',
        ]);

        if ($request->is_default && $request->filled('is_default')) {
            $this->taxRepository->model()->update(['is_default' => false]);
        }

        $request->merge(['activated_at' => $request->activated_at ? now() : null]);

        $tax = $this->taxRepository->create($request->all());

        return redirect()->back()->with(['flash_type' => 'success', 'flash_message' => 'Tax created successfully', 'flash_description' => $tax->title]);
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

        $tax = $this->taxRepository->findOrFail($id);

        if ($request->is_default && $request->filled('is_default')) {
            $this->taxRepository->model()->update(['is_default' => false]);
        }

        if ($request->activated_at || $request->activated_at == '0') {
            $request->merge(['activated_at' => $request->activated_at ? now() : null]);
        }

        $tax->update($request->all());
        $tax->refresh();

        return redirect()->back()->with(['flash_type' => 'success', 'flash_message' => 'Tax updated successfully', 'flash_description' => $tax->title]);
    }
}
