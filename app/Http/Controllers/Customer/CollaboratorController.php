<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Mail\CollaboratorMail;
use App\Models\CollaboratorInvitation;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CollaboratorController extends Controller {

    public function invite(Request $request) {

        $validated = $request->validate([
            'email' => 'required|email',
        ]);


        $invitation = CollaboratorInvitation::create([
            'company_id' =>    $request->user()->company_id,
            'email' => $validated['email'],
            'token' => Str::uuid(),
        ]);

        Mail::to($validated['email'])->send(new CollaboratorMail($invitation));
        return redirect()->back();
    }

    public function index(Request $request) {
        $company = $request->user()->company()->firstOrFail();
        $users = $company->users()->with('roles:name')->get()->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'email_verified_at' => $user->email_verified_at,
                'company_id' => $user->company_id,
                'created_at' => $user->created_at,
                'updated_at' => $user->updated_at,
                'role' => $user->roles->first()->name ?? null,
            ];
        });
        return Inertia::render('admin/collaborators', ['collaborators' => $users]);
    }
}
