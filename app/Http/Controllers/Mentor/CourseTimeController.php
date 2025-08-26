<?php

namespace App\Http\Controllers\Mentor;

use App\Http\Controllers\Controller;
use App\Models\CourseTiming;
use Illuminate\Http\Request;

class CourseTimeController extends Controller
{
    public function delete($courseId, $id)
    {
        $courseTime = CourseTiming::findOrFail($id);

        // $courseTime->delete();

        $courseTime->update(['activated_at' => null]);

        return redirect()->back()->with(['flash_type' => 'success', 'flash_message' => 'Course Time Deleted Successfully']);
    }
}
