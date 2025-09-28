<?php

namespace App\Enums;

enum ClaimVoucherStatus: string {
    case Pending = 'pending';
    case Issued = 'issued';
}
