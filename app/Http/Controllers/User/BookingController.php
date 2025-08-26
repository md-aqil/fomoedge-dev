<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\BookingResource;
use App\Repositories\BookingRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookingController extends Controller
{
    public function __construct(protected BookingRepository $bookingRepository) {}

    public function index(Request $request)
    {
        $booking = $this->bookingRepository->filter($request)->with(['course', 'transaction', 'courseRating', 'mentorProfileRating'])->latest()->paginate($request->get('limit', config('app.pagination_limit')))->withQueryString();

        return Inertia::render('User/Bookings/Bookings', ['bookings' => BookingResource::collection($booking)]);
    }

    public function view($id)
    {
        try {
            $id = decrypt($id);
        } catch (\Throwable $th) {
            abort(404);
        }

        $booking = $this->bookingRepository->model()->with(['course', 'transaction.invoice', 'courseRating', 'mentorProfileRating', 'courseTiming'])->findOrFail($id);

        $bookingResource = new BookingResource($booking);
        $bookingResource->wrap(null);

        return Inertia::render('User/Bookings/Booking', ['booking' => new BookingResource($booking)]);
    }
}
