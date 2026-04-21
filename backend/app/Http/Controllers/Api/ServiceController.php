<?php

namespace App\Http\Controllers\Api;

use App\Contracts\ServiceRepositoryInterface;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreServiceRequest;
use App\Http\Resources\ServiceResource;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function __construct(protected ServiceRepositoryInterface $serviceRepo)
    {
    }

    // US-11, US-12: Search & filter services
    public function index(Request $request)
    {
        $services = $this->serviceRepo->all(
            $request->only(['category', 'city', 'rating'])
        );

        return ServiceResource::collection($services);
    }

    // US-08: Add service (craftsman only)
    public function store(StoreServiceRequest $request)
    {
        $service = $this->serviceRepo->create(
            $request->user()->id,
            $request->validated()
        );

        return new ServiceResource($service);
    }

    // US-09: Update service
    public function update(StoreServiceRequest $request, int $id)
    {
        $service = Service::findOrFail($id);
        abort_if($service->craftsman_id !== $request->user()->id, 403, 'Not your service.');

        return new ServiceResource(
            $this->serviceRepo->update($id, $request->validated())
        );
    }

    // US-09: Delete service
    public function destroy(Request $request, int $id)
    {
        $service = Service::findOrFail($id);
        abort_if($service->craftsman_id !== $request->user()->id, 403, 'Not your service.');
        $this->serviceRepo->delete($id);

        return response()->json(['message' => 'Service deleted successfully.']);
    }
}