<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Reset Password</title>
</head>

<body style="font-family: Arial, sans-serif, Helvetica, sans-serif; background-color: #f4f4f4; color: #333; padding: 20px;">
    <div style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); padding: 20px; max-width: 600px; margin: auto;">
        
        <!-- Logo Section -->
        <table role="presentation" cellspacing="0" cellpadding="0" style="width: 100%; text-align: center; padding: 20px 0; background-color: #FFC93B;">
            <tr>
                <td>
                    <img src="{{ asset('images/logo.jpeg') }}" alt="FOMOEdge logo" style="height: 100px; width: 200px;">
                </td>
            </tr>
        </table>

        <h1 style="color: #222; text-align: center; margin: 0; margin-top: 20px;">Reset Password</h1>

        <p style="font-size: 16px; text-align: center; line-height: 1.5; margin: 10px 0;">Click the button below to reset your password.</p>

        <div style="text-align: center; margin-top: 20px;">
            <a href="{{ route('password.reset', ['token' => $token, 'email' => $user->email]) }}" style="display: inline-block; background-color: #000; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; transition: background-color 0.3s ease;">Reset Password</a>
        </div>

        <p style="font-size: 16px; line-height: 1.5; margin: 10px 0;">Warm regards,</p>
        <p style="font-size: 16px; line-height: 1.5; margin: 10px 0;">Admin</p>
    </div>
</body>

</html>
