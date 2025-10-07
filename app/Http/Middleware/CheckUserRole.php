<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CheckUserRole {

    public function handle(Request $request, Closure $next, string $roles) {

        if (!Auth::check()) {
            return redirect()->intended('login');
        }

        $allowedRoles = collect(explode('|', $roles));
        $userRole = Auth::user()->getRoleNames()->first();


        if (!$allowedRoles->contains($userRole)) {
            return Inertia::render('errors/forbidden');
        }

        return $next($request);
    }
}
