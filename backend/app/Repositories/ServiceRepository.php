<?php

namespace App\Repositories;

use App\Contracts\ServiceRepositoryInterface;
use App\Models\Service;

class ServiceRepository implements ServiceRepositoryInterface
{
    public function all(array $filters = [])
    {
        return Service::with('craftsman')
            ->where('is_active', true)
            ->when(
                $filters['category'] ?? null,
                fn($q, $v) => $q->where('category', $v)
            )
            ->when(
                $filters['city'] ?? null,
                fn($q, $v) => $q->whereHas('craftsman', fn($q) => $q->where('city', $v))
            )
            ->when(
                $filters['rating'] ?? null,
                fn($q, $v) => $q->whereHas(
                    'craftsman',
                    fn($q) =>
                    $q->whereRaw(
                        '(SELECT COALESCE(AVG(rating),0) FROM reviews WHERE craftsman_id = users.id) >= ?',
                        [$v]
                    )
                )
            )
            ->paginate(12);
    }

    public function create(int $craftsmanId, array $data)
    {
        return Service::create(array_merge($data, ['craftsman_id' => $craftsmanId]));
    }

    public function update(int $id, array $data)
    {
        $service = Service::findOrFail($id);
        $service->update($data);
        return $service->fresh();
    }

    public function delete(int $id): void
    {
        Service::findOrFail($id)->delete();
    }
}