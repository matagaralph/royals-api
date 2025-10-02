<?php

namespace App\Mail;

use App\Models\CollaboratorInvitation;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class CollaboratorMail extends Mailable {
    use Queueable, SerializesModels;

    public $invitation;

    public function __construct(CollaboratorInvitation $invitation) {
        $this->invitation = $invitation;
    }

    public function envelope(): Envelope {
        return new Envelope(
            subject: 'You’ve been invited to collaborate',
        );
    }

    public function build() {
        $url = 'https://royals.africa/register?token='
            . $this->invitation->token
            . '&email=' . urlencode($this->invitation->email);

        return $this->subject('You have been invited to collaborate')
            ->view('emails.collaborator', [
                'url' => $url,
                'company' => $this->invitation->company->name,
            ]);
    }
}
