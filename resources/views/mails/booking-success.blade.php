<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fomoedge - Booking Confirmation</title>
</head>

<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333; padding: 20px; margin: 0;">
    <div style="background-color: #ffffff; border: 1px solid #ddd; padding: 20px; max-width: 600px; margin: auto;">
        <!-- Header -->
        <div style="text-align: center; background-color: #FFC93B; padding: 20px;">
            <img src="{{ asset('images/logo.jpeg') }}" alt="FOMOEdge Logo" style="max-width: 200px; height: auto;">
        </div>

        <!-- Greeting -->
        <h1 style="color: #000; text-align: center;">Dear, {{ $booking->full_name ?? '' }}</h1>

        <p style="font-weight: bold; font-style: italic; text-align: center;">
            We’re thrilled to confirm your booking with Fomoedge! Below are the details of your booking.
        </p>

        <!-- Booking Summary and Slot Details Table -->
        <h3 style="color: #333;">Booking Summary:</h3>
        <table style="width: 100%; border-collapse: collapse; background-color: #f9f9f9;">
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Booking Status</td>
                <td style="border: 1px solid #ddd; padding: 8px;">{{ $booking->status_label ?? '' }}</td>
            </tr>
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Booking ID</td>
                <td style="border: 1px solid #ddd; padding: 8px;">{{ $booking->id ?? '' }}</td>
            </tr>
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Created DateTime</td>
                <td style="border: 1px solid #ddd; padding: 8px;">{{ $booking->created_at ?? '' }}</td>
            </tr>
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Course Type</td>
                <td style="border: 1px solid #ddd; padding: 8px;">{{ $booking->course->type_label ?? '' }}</td>
            </tr>
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Course</td>
                <td style="border: 1px solid #ddd; padding: 8px;">{{ $booking->course->title ?? '' }}</td>
            </tr>
            @if ($booking->google_meet_response)
                <tr>
                    <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Meeting Link</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">
                        <a href="{{ $booking->google_meet_response->meetingUri ?? '' }}" 
                            style="color: #007BFF; text-decoration: none;">
                            {{ $booking->google_meet_response->meetingUri ?? '' }}
                        </a>
                    </td>
                </tr>
            @endif
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Session Start</td>
                <td style="border: 1px solid #ddd; padding: 8px;">
                    {{ $booking->courseTiming->start_date ?? '' }} {{ $booking->courseTiming->start_time ?? '' }}
                </td>
            </tr>
            @if ($booking->courseTiming->end_date && $booking->courseTiming->end_time)
                <tr>
                    <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Session End</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">
                        {{ $booking->courseTiming->end_date ?? '' }} {{ $booking->courseTiming->end_time ?? '' }}
                    </td>
                </tr>
            @endif
        </table>

        <!-- Message -->
        <p style="margin-top: 20px;">
            Fomoedge exists to cut through the noise and give people the power of trusted, one-on-one mentorship. 
            With the right mentor, no dream is too big, and no goal is out of reach.
        </p>
        <p>We’re excited to start this journey with you!</p>

        <!-- CTA Button -->
        <div style="margin: 20px 0; width: 220px">
            <a href="{{ route('login') }}" 
                style="background-color: #000; color: #fff; text-decoration: none; font-size: 18px; padding: 10px 20px; border-radius: 4px; display: inline-block; margin-top: 10px;">
                Access Your Account
            </a>
        </div>

        <!-- Footer -->
        <p style="text-align: start; color: #555;">Warm regards,<br><strong>Admin</strong></p>
    </div>
</body>

</html>
