<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use App\Enums\UserRole;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\RedirectResponse;
use App\Models\CollaboratorInvitation;
use Illuminate\Validation\ValidationException;

class RegisteredUserController extends Controller {
    /**
     * Show the registration page.
     */
    public function create(): Response {
        return Inertia::render('auth/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse {
        $request->validate([
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required',  Rules\Password::defaults()],
            'token' => 'nullable|string'
        ]);

        $invitation = null;

        if ($request->filled('token')) {
            $invitation = CollaboratorInvitation::where('token', $request->token)
                ->where('email', $request->email)
                ->whereNull('accepted_at')
                ->first();

            if (!$invitation) {
                throw ValidationException::withMessages([
                    'token' => ['Invalid or expired invitation.'],
                ]);
            }
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'company_id' => $invitation?->company_id,
        ]);

        if ($invitation) {
            $user->assignRole(UserRole::Issuer);
            $invitation->markAsAccepted();
        } else {
            $user->assignRole(UserRole::Shopper);
        }

        return redirect()->intended(route('login', absolute: false));
    }
}
