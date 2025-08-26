<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\BookingResource;
use App\Repositories\BookingRepository;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function __construct(protected BookingRepository $bookingRepository) {}

    public function index(Request $request)
    {
        $booking = $this->bookingRepository->model()->with(['course', 'user', 'transaction'])->paginate($request->get('limit', config('app.pagination_limit')))->withQueryString();

        return inertia('Admin/Bookings/Bookings', ['bookings' => BookingResource::collection($booking)]);
    }
    public function view($id)
    {
        $booking = $this->bookingRepository->model()->with(['course', 'transaction.invoice', 'courseRating', 'mentorProfileRating', 'courseTiming', 'user'])->findOrFail($id);

        $bookingResource = new BookingResource($booking);
        $bookingResource->wrap(null);

        return Inertia('Admin/Bookings/Booking', ['booking' => new BookingResource($booking)]);
    }
}
