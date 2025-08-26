<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;

class PostController extends Controller
{
	public function index(Request $request)
	{
		$posts = Post::with('image', 'categories')->latest()->published();
		if ($request->has('category')) {
			$posts->whereHas('categories', function ($query) use ($request) {
				$query->where('slug', $request->get('category'));
			});
		}
		$posts = $posts->paginate($request->get('limit', config('app.pagination_limit')))->withQueryString();

		// $response = Http::withHeaders([
		// 	'Content-Type' => 'application/json',
		// 	'authkey' => '444579AGMcHDYyM67ea8a3bP1'
		// ])
		// 	->post('https://api.msg91.com/api/v5/whatsapp/whatsapp-outbound-message/bulk/', [
		// 		"integrated_number" => "918924888508",
		// 		"content_type" => "template",
		// 		"payload" => [
		// 			"messaging_product" => "whatsapp",
		// 			"type" => "template",
		// 			"template" => [
		// 				"name" => "mentor_registered",
		// 				"language" => [
		// 					"code" => "en",
		// 					"policy" => "deterministic"
		// 				],
		// 				"namespace" => null,
		// 				"to_and_components" => [
		// 					[
		// 						"to" => [
		// 							"918882331603"
		// 						],
		// 						"components" => [
		// 							"body_1" => [
		// 								"type" => "text",
		// 								"value" => "Jane Doe"
		// 							],
		// 							"button_1" => [
		// 								"subtype" => "url",
		// 								"type" => "text",
		// 								"value" => "https://fomoedge.com/how-it-works"
		// 							]
		// 						]
		// 					]
		// 				]
		// 			]
		// 		]
		// 	]);

		// dd($response->body());

		return Inertia::render('Blog/Blog', ['posts' => PostResource::collection($posts)]);
	}

	public function show($slug)
	{
		$post = Post::with('image', 'categories')->where('slug', $slug)->published()->firstOrFail();

		return Inertia::render('Blog/Post', ['post' => new PostResource($post)]);
	}
}
