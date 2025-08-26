<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            padding: 20px;
        }

        .container {
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 20px;
            max-width: 600px;
            margin: auto;
        }

        h1 {
            color: #4CAF50;
            text-align: center;
        }

        p {
            font-size: 16px;
            line-height: 1.5;
        }

        a {
            display: inline-block;
            margin-top: 20px;
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 4px;
        }

        a:hover {
            background-color: #45a049;
        }
    </style>
</head>

<body>
    <div class="container">
        <div
            style="display: flex; justify-content: center; padding: 20px 0; align-items: center; background-color: #FFC93B">
            <img src="{{ asset('images/logo.jpeg') }}" alt="FOMOEdge logo" style="height: 100px; width: 200px;">
        </div>

        <h1>Verify Email Address</h1>

        <p>Click the button below to verify your email address.</p>

        <a href="{{ $url }}">Verify Email Address</a>

        <p>Warm regards,</p>
        <p>Admin</p>
    </div>
</body>

</html>
