<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Fomoedge - Mentorship Session Details</title>
</head>

<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f4; padding: 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 8px; padding: 20px;">
                    <!-- Header Section -->
                    <tr>
                        <td align="center" style="background-color: #FFC93B; padding: 20px 0;">
                            <img src="{{ asset('images/logo.jpeg') }}" alt="FOMOEdge logo" style="display: block; height: 100px; width: 200px;">
                        </td>
                    </tr>
                    <!-- Greeting Section -->
                    <tr>
                        <td align="center" style="padding: 20px;">
                            <h1 style="color: #000; font-size: 24px; margin: 0;">Hello Dear {{ $user->full_name ?? '' }}!</h1>
                            <p style="font-size: 16px; line-height: 1.5; margin: 10px 0;">Thank you for scheduling your mentorship session on Fomoedge! We are excited about the opportunity for you to connect and exchange valuable insights.</p>
                        </td>
                    </tr>
                    <!-- Session Details Table -->
                    <tr>
                        <td>
                            <table width="100%" cellpadding="5" cellspacing="0" border="1" style="border-collapse: collapse; background-color: #f0f0f0; border-color: #ccc; margin: 20px 0;">
                                <tr>
                                    <td style="padding: 10px; font-weight: bold;">Course Name</td>
                                    <td style="padding: 10px;">{{ $booking->course->title ?? '' }}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px; font-weight: bold;">Course Type</td>
                                    <td style="padding: 10px;">{{ $booking->course->type_label ?? '' }}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px; font-weight: bold;">Mentor</td>
                                    <td style="padding: 10px;">{{ $booking->mentorProfile->full_name }}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px; font-weight: bold;">Mentee</td>
                                    <td style="padding: 10px;">{{ $booking->user->full_name }}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px; font-weight: bold;">Booking Session Start Timings</td>
                                    <td style="padding: 10px;">{{ $booking->courseTiming->start_date ?? '' }} {{ $booking->courseTiming->start_time ?? '' }}</td>
                                </tr>
                                @if ($booking->courseTiming->end_date && $booking->courseTiming->end_time)
                                <tr>
                                    <td style="padding: 10px; font-weight: bold;">Booking Session End Timings</td>
                                    <td style="padding: 10px;">{{ $booking->courseTiming->end_date ?? '' }} {{ $booking->courseTiming->end_time ?? '' }}</td>
                                </tr>
                                @endif
                            </table>
                        </td>
                    </tr>
                    <!-- Meeting Link Section -->
                    <tr>
                        <td align="center" style="padding: 20px;">
                            <p style="font-size: 16px; margin: 0;"><strong>Join the meeting</strong></p>
                            <a href="{{ $booking->google_meet_response->meetingUri ?? '' }}" style="background-color: #000; color: #fff; text-decoration: none; font-size: 18px; padding: 10px 20px; border-radius: 4px; display: inline-block; margin-top: 10px;">Click here to Join</a>
                        </td>
                    </tr>
                    <!-- Fallback Link -->
                    <tr>
                        <td style="padding: 10px; background-color: #f0f0f0; word-wrap: break-word;">
                            <p style="margin: 0; font-size: 14px;">If you are having issues, please copy and paste the below link in your browser to join the meet:</p>
                            <p style="color: #000;">{{ $booking->google_meet_response->meetingUri ?? '' }}</p>
                        </td>
                    </tr>
                    <!-- Footer Section -->
                    <tr>
                        <td style="padding: 20px; font-size: 16px; line-height: 1.5;">
                            <p>Please ensure that you join the meeting at least 5 minutes before the scheduled time to ensure everything is set up smoothly.</p>
                            <p>If you have any questions or need assistance before the session, feel free to reach out. We hope this session provides meaningful guidance and support on your journey!</p>
                            <p>Best regards,</p>
                            <p>Admin</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>
