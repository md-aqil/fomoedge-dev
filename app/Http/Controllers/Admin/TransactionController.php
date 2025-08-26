<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\TransactionResource;
use App\Repositories\RazorpayRepository;
use App\Repositories\TransactionRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function __construct(protected TransactionRepository $transactionRepository, protected RazorpayRepository $razorpayRepository) {}

    public function index(Request $request)
    {
        $transactions = $this->transactionRepository->model()->latest()->with('booking')->paginate($request->get('limit', config('app.pagination_limit')))->withQueryString();

        return Inertia::render('Admin/Transactions/Transactions', ['transactions' => TransactionResource::collection($transactions)]);
    }

    public function payToMentor(Request $request, string $id)
    {
        $transaction = $this->transactionRepository->findOrFail($id);

        $response = $this->razorpayRepository->mentorSettlement($transaction->booking);

        if ($response) {
            return redirect()->back()->with(['flash_type' => 'success', 'flash_message' => 'Mentor payment settled successfully']);
        } else {
            return redirect()->back()->with(['flash_type' => 'failed', 'flash_message' => 'Mentor payment settlement failed']);
        }
    }
}
