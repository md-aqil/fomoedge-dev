<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactQuery;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactQueryController extends Controller
{
    public function index(Request $request)
    {
        $contactQueries = ContactQuery::latest()->paginate($request->get('per_page', config('app.pagination_limit')))->withQueryString();

        return Inertia::render('Admin/ContactQueries/ContactQueries', ['contactQueries' => $contactQueries]);
    }
}
