<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fomoedge - Account Rejected</title>
</head>

<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif; color: #333;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f4f4; padding: 20px;">
        <tr>
            <td align="center">
                <!-- Main Container -->
                <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border: 1px solid #ddd;">
                    <tr>
                        <!-- Logo Section -->
                        <td style="background-color: #FFC93B; text-align: center; padding: 20px;">
                            <img src="{{ asset('images/logo.jpeg') }}" alt="FOMOEdge Logo" style="display: block; width: 200px; height: 100px;">
                        </td>
                    </tr>
                    <tr>
                        <!-- Content Section -->
                        <td style="padding: 20px;">
                            <h1 style="color: #4CAF50; text-align: center; margin: 0;">Hi, {{ $user->full_name ?? '' }}</h1>
                            <p style="font-size: 16px; font-weight: bold; font-style: italic; text-align: center; margin: 20px 0;">
                                Thank you for your interest in Fomoedge.
                            </p>
                            <p style="font-size: 16px; margin: 20px 0; text-align: center;">
                                Your account has been <strong>rejected</strong>.
                            </p>
                            <p style="font-size: 16px; font-style: italic; line-height: 1.5; margin: 20px 0; text-align: center;">
                                After careful review, we’ve decided not to proceed with your application at this time. 
                                We wish you the best in your mentoring journey and future endeavours!
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <!-- Footer Section -->
                        <td style="padding: 20px; text-align: center;">
                            <p style="font-size: 16px; margin: 0;">Warm regards,</p>
                            <p style="font-size: 16px; margin: 0;">Admin</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>
