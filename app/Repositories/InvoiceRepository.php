<?php

namespace App\Repositories;

use App\Models\Invoice;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class InvoiceRepository extends BaseRepository
{
    public $model;

    function __construct(Invoice $model)
    {
        $this->model = $model;
    }

    public function createWithPdf($request)
    {
        $invoice = $this->model->create($request->all());
        $this->generateInvoicePdf($invoice);
        return $invoice;
    }

    public function generateInvoicePdf($invoice)
    {
        try {
            $pdf = Pdf::loadView('pdf.invoice', ['invoice' => $invoice]);
            $fileName = 'invoice-' . $invoice->id . '-' . time() . '.pdf';
            $filePath = 'pdf/' . $fileName;
            Storage::disk(env('FILESYSTEM_DISK'))->put($filePath, $pdf->output());

            $invoice->invoice_path = $filePath;
            $invoice->save();
        } catch (\Exception $e) {
            Log::error($e);
        }
    }
}
