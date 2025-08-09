<?php

namespace App\Enums;

enum UserRole: string {
    case Owner = 'owner';
    case Issuer = 'issuer';
    case Shopper = 'shopper';
}
