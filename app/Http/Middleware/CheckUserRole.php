<?php

namespace App\Http\Middleware;

use App\Enums\UserRole;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;


class CheckUserRole {

    public function handle(Request $request, Closure $next, string $roles): InertiaResponse {

        if (!Auth::check()) {
            return Inertia::render('errors/forbidden');
        }

        $allowedRoles = collect(explode('|', $roles))
            ->map(fn(string $role) => UserRole::from($role)->value);

        $userRoleName = Auth::user()->getRoleNames()->first(); // e.g. "owner"

        if (!$allowedRoles->contains($userRoleName)) {
            return Inertia::render('errors/not-found');
        }

        return $next($request);
    }
}
