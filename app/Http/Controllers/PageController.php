<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
    function __invoke($slug)
    {
        $page = Page::where('slug', $slug)->published()->firstOrFail();
        $page->increment('views');

        return Inertia::render('Page', ['page' => $page]);
    }

    public function aboutUs(Request $request)
    {
        $page = Page::where('slug', 'about-us')->published()->firstOrFail();
        $page->increment('views');
        return Inertia::render('AboutUs', ['page' => $page]);
    }

    public function contactUs(Request $request)
    {
        $page = Page::where('slug', 'contact-us')->published()->firstOrFail();
        $page->increment('views');
        return Inertia::render('ContactUs/ContactUs', ['page' => $page]);
    }
    public function howItWorks(Request $request)
    {
        $page = Page::where('slug', 'how-it-works')->published()->firstOrFail();
        $page->increment('views');
        return Inertia::render('HowItWorks/HowItWorks', ['page' => $page]);
    }
}
