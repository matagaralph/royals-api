<?php

namespace App\Http\Middleware;

use App\Enums\UserRole;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckUserRole {
    public function handle(Request $request, Closure $next, string $roles): Response {
        if (!Auth::check()) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        $allowedRoles = collect(explode('|', $roles))
            ->map(fn(string $role) => UserRole::from($role));

        if (!$allowedRoles->contains(Auth::user()->role)) {
            return response()->json(['message' => 'You are not authorised to access the resource.'], 403);
        }

        return $next($request);
    }
}
