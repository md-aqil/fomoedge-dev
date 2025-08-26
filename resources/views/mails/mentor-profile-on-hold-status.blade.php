<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fomoedge - Application Review Update</title>
</head>

<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif; color: #333;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f4f4; padding: 20px;">
        <tr>
            <td align="center">
                <!-- Main Container -->
                <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border: 1px solid #ddd; padding: 20px;">
                    <tr>
                        <!-- Logo Section -->
                        <td style="background-color: #FFC93B; text-align: center; padding: 20px;">
                            <img src="{{ asset('images/logo.jpeg') }}" alt="FOMOEdge Logo" style="display: block; width: 200px; height: 100px;">
                        </td>
                    </tr>
                    <tr>
                        <!-- Greeting Section -->
                        <td style="padding: 20px; text-align: center;">
                            <h1 style="color: #4CAF50; font-size: 24px; margin: 0;">Hi, {{ $user->full_name ?? '' }}</h1>
                        </td>
                    </tr>
                    <tr>
                        <!-- Message Section -->
                        <td style="padding: 20px; text-align: center;">
                            <p style="font-size: 16px; font-weight: bold; font-style: italic; margin: 20px 0;">
                                Thank you for applying to join Fomoedge.
                            </p>
                            <p style="font-size: 16px; font-style: italic; line-height: 1.5; margin: 20px 0;">
                                We value your expertise but are currently reviewing applications to ensure the best fit for our platform. We’ll keep your profile on <strong>hold</strong> and update you soon. Stay tuned!
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <!-- Closing Section -->
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
