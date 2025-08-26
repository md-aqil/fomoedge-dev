<?php

namespace App\Http\Controllers;

use App\Models\ContactQuery;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactQueryController extends Controller
{
    public function create()
    {
        return Inertia::render('ContactUs/ContactForm');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'phone' => 'required|string|min:10|max:15',
            'message' => 'required',
        ]);

        $contactQuery = ContactQuery::create($request->all());

        return redirect()->back()->with(['flash_type' => 'success', 'flash_message' => 'Contact query successfully submitted', 'flash_description' => $contactQuery->name]);
    }
}
