<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CourseBundle;
use Illuminate\Http\Request;

class CourseBundleController extends Controller
{
    public function delete($courseBundleId)
    {
        $courseBundle = CourseBundle::destroy($courseBundleId);

        return response()->json(['success' => true, 'message' => 'Course bundle deleted successfully']);
    }
}
