<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fomoedge - Welcome Onboard</title>
</head>

<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif; color: #333;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f4f4; padding: 20px;">
        <tr>
            <td align="center">
                <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border: 1px solid #ddd;">
                    <tr>
                        <td align="center" style="background-color: #FFC93B; padding: 20px;">
                            <img src="{{ asset('images/logo.jpeg') }}" alt="FOMOEdge Logo" style="display: block; height: 100px; width: 200px;">
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px;">
                            <h1 style="color: #000; text-align: center; margin: 0; font-size: 24px;">Hi, {{ $user->full_name }}</h1>
                            <p style="font-size: 16px; line-height: 1.5; font-weight: bold; font-style: italic; text-align: center;">
                                Welcome to Fomoedge - a mentorship platform, connecting learners with the experts.
                            </p>
                            <table width="100%" style="margin: 20px 0; background-color: #f9f9f9; border-collapse: collapse; text-align: left;">
                                <tr>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">Email:</td>
                                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">{{ $user->email }}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px;">Password:</td>
                                    <td style="padding: 10px;">{{ env('DEFAULT_USER_PASSWORD') }}</td>
                                </tr>
                            </table>
                            <p style="text-align: center; font-size: 16px;">Please login and update your password.</p>
                            <div style="text-align: center; margin: 20px 0;">
                                <a href="{{ route('login') }}" style="display: inline-block; padding: 10px 20px; background-color: #000; color: #fff; text-decoration: none; font-size: 16px; border-radius: 4px;">
                                    Login
                                </a>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px; text-align: center; font-size: 14px; color: #555;">
                            <p>Warm regards,</p>
                            <p>Admin</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>
