<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\City;
use App\Models\Country;
use App\Models\State;
use Illuminate\Http\Request;

class RegionController extends Controller
{
    public function countries(Request $request)
    {
        $countries = Country::orderBy('name', 'asc')->get();
        return response()->json(['countries' => $countries]);
    }

    public function states(Request $request)
    {
        $request->validate([
            'country_id' => 'required|string|exists:states,country_id'
        ]);

        $states = State::where('country_id', $request->country_id)->orderBy('name', 'asc')->get();
        return response()->json(['states' => $states]);
    }

    public function cities(Request $request)
    {
        $request->validate([
            'country_id' => 'required|string|exists:cities,country_id',
            'state_id' => 'required|string|exists:cities,state_id'
        ]);

        $cities = City::where('country_id', $request->country_id)->where('state_id', $request->state_id)->orderBy('name', 'asc')->get();
        return response()->json(['cities' => $cities]);
    }
}
