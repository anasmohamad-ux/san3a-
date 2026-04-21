<?php

namespace App\Http\Controllers\Api;

use App\Contracts\UserRepositoryInterface;
use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateProfileRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function __construct(protected UserRepositoryInterface $userRepo)
    {
    }

    // US-13: View any user / craftsman profile
    public function show(int $id)
    {
        return new UserResource($this->userRepo->findById($id));
    }

    // US-06: Edit own profile
    public function update(UpdateProfileRequest $request)
    {
        $user = $this->userRepo->update(
            $request->user()->id,
            $request->only(['name', 'phone', 'bio', 'city'])
        );

        return new UserResource($user);
    }

    // US-06: Upload profile photo
    public function updatePhoto(Request $request)
    {
        $request->validate(['photo' => 'required|image|max:2048']);

        $user = $this->userRepo->updatePhoto(
            $request->user()->id,
            $request->file('photo')
        );

        return new UserResource($user);
    }

    // US-10: Set craftsman availability
    public function setAvailability(Request $request)
    {
        $request->validate([
            'availability' => 'required|in:available,unavailable,busy',
        ]);

        $user = $this->userRepo->update(
            $request->user()->id,
            ['availability' => $request->availability]
        );

        return new UserResource($user);
    }
}