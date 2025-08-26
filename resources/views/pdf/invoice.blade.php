<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            /* background-color: #f4f4f9; */
        }

        .invoice-container {
            max-width: 800px;
            /* margin: 30px auto; */
            padding: 20px;
            /* background: #fff; */
            border: 1px solid #ccc;
            border-radius: 10px;
            /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
        }

        .header {
            display: flex;
            justify-content: space-between;
            /* align-items: center; */
        }

        .header img {
            max-height: 60px;
        }

        .header .company-details {
            text-align: right;
        }

        .header .company-details h2 {
            margin: 0;
            /* font-size: 1.6em; */
        }

        .header .company-details p {
            /* margin: 5px 0; */
            /* font-size: 0.9em; */
            color: #555;
        }

        .invoice-details,
        .user-details,
        .transaction-details {
            margin: 20px 0;
        }

        .section-title {
            font-size: 1.2em;
            margin-bottom: 10px;
            font-weight: bold;
            color: #333;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin: 10px 0;
        }

        table th,
        table td {
            border: 1px solid #ddd;
            padding: 10px;
            text-align: left;
        }

        table th {
            background: #f8f8f8;
            font-weight: bold;
        }

        .total-row {
            font-weight: bold;
        }

        .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 0.9em;
            color: #666;
        }
    </style>
</head>

<body>
    <div class="invoice-container">
        <!-- Header -->

        <table style="width: 100%; border-collapse: collapse; border: none;">
            <tr>
                <th style="text-align: left; padding: 10px; border: none;background-color: #fff">
                    <img src={{ asset('images/logo.jpeg') }} alt="Fomo Edge logo" style="height: 100px; width: 200px;" />
                </th>
                <th style="text-align: left; padding: 10px; border: none;background-color: #fff; font-weight:normal">
                    <div class="">
                        <h3 style="margin: 0; font-size: 1.6em;">FOMOEDGE</h3>
                        <p style="margin: 5px 0;">Lucknow, UP, India</p>
                        <p style="margin: 5px 0;">Email: support@fomoedge.com</p>
                        <p style="margin: 5px 0;">Date: {{ $invoice->created_at->format('d-m-Y') }}</p>
                    </div>
                </th>
            </tr>
        </table>
        <!-- <div class="header">
          
         
          
        </div> -->

        <!-- Invoice Details -->
        <div class="invoice-details">
            <div class="section-title">Invoice Details</div>
            <table>
                <tr>
                    <th>Course Name</th>
                    <td>{{ $invoice->transaction->course->title }}</b>
                    </td>
                </tr>
                <tr>
                    <th>Mentor Name</th>
                    <td>{{ $invoice->transaction->course->mentorProfile->full_name }}</td>
                </tr>
                <tr>
                    <th>Invoice ID</th>
                    <td>{{ $invoice->id }}</td>
                </tr>
                <tr>
                    <th>Issue Date</th>
                    <td>{{ $invoice->created_at->format('d-m-Y') }}</td>
                </tr>
            </table>
        </div>

        <!-- User Details -->
        <div class="user-details">
            <div class="section-title">User Details</div>
            <table>
                <tr>
                    <th>Full Name</th>
                    <td>{{ $invoice->transaction->booking->full_name }}</td>
                </tr>
                <tr>
                    <th>Email</th>
                    <td>{{ $invoice->transaction->booking->email }}</td>
                </tr>
                <tr>
                    <th>Phone</th>
                    <td>{{ $invoice->transaction->booking->phone_number }}</td>
                </tr>
            </table>
        </div>

        <!-- Transaction Details -->
        <div class="transaction-details">
            <div class="section-title">Transaction Details</div>
            <table>
                <thead>
                    <tr>
                        <th>Transaction ID</th>
                        <th>Amount</th>
                        <th>Special Price</th>
                        <th>Tax</th>
                        <th>Platform Fee</th>
                        <th>Grand Total Amount </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{{ $invoice->transaction_id }}</td>
                        <td>{{ number_format($invoice->amount, 2) }}</td>
                        <td>{{ number_format($invoice->special_amount, 2) }}</td>
                        <td>{{ number_format($invoice->tax_amount, 2) }}</td>
                        <td>{{ number_format($invoice->platform_fee_amount, 2) }}</td>
                        <td>{{ number_format($invoice->grand_total_amount, 2) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p>If you have any questions about this invoice, please contact us at support@fomoedge.com</p>
            <p>&copy; 2024 FomoEdge, Inc. All rights reserved.</p>
        </div>

    </div>
</body>

</html>
