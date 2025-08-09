<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckUserRole {
    public function handle(Request $request, Closure $next, string $role): Response {

        if (!Auth::check() || Auth::user()->role->value !== $role) {
            return response()->json(['message' => 'Unauthorised'], 403);
        }

        return $next($request);
    }
}
