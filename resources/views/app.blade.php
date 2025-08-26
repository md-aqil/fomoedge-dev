<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    {{-- <meta charset="utf-8"> --}}
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title inertia>{{ config('app.name', 'Laravel') }}</title>
    <meta name="language" content="English">
    <meta name="robots" content="index, follow">
    <meta property="og:site_name" content="fomoedge">
    <meta property="og:url" content="{{ url()->current() }}">
    {{-- <meta property="og:description" content="{{ $page['meta_description'] }}">
    <meta property="og:image" content="{{ $page['image'] }}"> --}}
    <meta property="og:type" content="website">
    <meta property="og:locale" content="en_US">
    <meta property="og:image:width" content="1200">
    <!-- Fonts -->
    <link rel="icon" type="image/png"
    href="{{ $globalSettings['general']['app_favicon'] ?? '/fav/favicon-32x32.png' }}">
    <link rel="manifest" href="/fav/manifest.json">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="theme-color" content="#ffffff">
    <link rel="canonical" href="{{ url()->current() }}">
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-P1DYBNKPC6"></script>
    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());

        gtag('config', 'G-P1DYBNKPC6');
    </script>

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    @inertiaHead
    
    {!! $globalSettings['scripts']['app_head_scripts'] !!}
</head>

<body class="font-sans antialiased scroll-smooth" style="margin-bottom: 0 ">
    @inertia

    {!! $globalSettings['scripts']['app_body_footer_scripts'] !!}
</body>

</html>
