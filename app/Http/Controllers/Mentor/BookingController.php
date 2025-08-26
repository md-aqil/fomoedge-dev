<?php

namespace App\Http\Controllers\Mentor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\BookingResource;
use App\Repositories\BookingRepository;
use Inertia\Inertia;

class BookingController extends Controller
{
    public function __construct(protected BookingRepository $bookingRepository) {}

    public function index(Request $request)
    {
        $booking = $this->bookingRepository->filter($request, ['course', 'transaction', 'courseRating', 'mentorProfileRating', 'courseTiming'])->latest()->paginate($request->get('limit', config('app.pagination_limit')))->withQueryString();

        return Inertia::render('Mentor/Bookings/Bookings', ['bookings' => BookingResource::collection($booking)]);
    }

    public function view($id)
    {
        $booking = $this->bookingRepository->model()->with(['course', 'transaction.invoice', 'courseRating', 'mentorProfileRating', 'courseTiming'])->findOrFail($id);

        $bookingResource = new BookingResource($booking);
        $bookingResource->wrap(null);

        return Inertia::render('Mentor/Bookings/Booking', ['booking' => new BookingResource($booking)]);
    }
}
