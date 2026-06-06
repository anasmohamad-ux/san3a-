<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Http\Controllers\Controller;

class ChatbotController extends Controller
{
    public function chat(Request $request)
    {
        $userMessage = $request->message;

        $prompt = "
        You are San3a Assistant.
        San3a is a platform that connects clients with craftsmen.
        Services include: Plumbing, Electrical, Carpentry, Painting, AC Services.
        Answer user questions in a friendly way.
        User Question: {$userMessage}
        ";

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('OPENROUTER_API_KEY'),
            'Content-Type' => 'application/json',
        ])->post('https://openrouter.ai/api/v1/chat/completions', [
           'model' => 'nvidia/nemotron-3-super-120b-a12b:free',
            'messages' => [
                ['role' => 'user', 'content' => $prompt]
            ]
        ]);
        $response = Http::withHeaders([
    'Authorization' => 'Bearer ' . env('OPENROUTER_API_KEY'),
    'Content-Type' => 'application/json',
])->timeout(60)->post('https://openrouter.ai/api/v1/chat/completions', [
    'model' => 'nvidia/nemotron-3-super-120b-a12b:free',
    'messages' => [
        ['role' => 'user', 'content' => $prompt]
    ]
]);

     $data = $response->json();

return response()->json([
    'candidates' => [[
        'content' => ['parts' => [[
            'text' => $data['choices'][0]['message']['content'] ?? 'Sorry, I could not generate a response.'
        ]]]
    ]]
    
]);
    }
    
}