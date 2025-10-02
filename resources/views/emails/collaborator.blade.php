<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Collaboration Invitation</title>
</head>

<body style="margin:0; padding:0; background-color:#ffffff; font-family:Arial, sans-serif;">

    <div style="max-width:600px; margin:0 auto; padding:30px; background-color:#ffffff; color:#333;">
        <h2 style="color:#111; margin-bottom:20px;">You’ve Been Invited!</h2>

        <p style="font-size:15px; line-height:1.5;">
            You have been invited to collaborate with <strong>{{ $company }}</strong>.
            As a collaborator, you will be able to manage campaigns assigned to you, monitor customer rewards,
            and contribute to the success of the loyalty program.
        </p>

        <p style="text-align:center; margin:30px 0;">
            <a href="{{ $url }}"
                style="background-color:#a855f7; color:#fff; text-decoration:none;
                      padding:12px 24px; border-radius:6px; font-size:15px; font-weight:bold; display:inline-block;">
                Accept Invitation
            </a>
        </p>

        <div style="border-top:1px solid #eee; margin-top:40px; padding-top:20px;">
            <p style="font-size:13px; color:#888; margin:0;">
                Please do not respond to this message. This email was sent from an unattended mailbox.
                This report was generated at approximately {{ now()->format('h:i A T d/m/Y') }}.
            </p>
            <p style="font-size:12px; color:#555; margin-top:15px; text-align:center;">
                &copy; {{ date('Y') }} Royals. All rights reserved.
            </p>
        </div>
    </div>

</body>

</html>
