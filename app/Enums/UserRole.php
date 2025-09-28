<?php

namespace App\Enums;

enum UserRole: string {
    case Admin = 'admin';
    case Owner = 'owner';
    case Issuer = 'issuer';
    case Shopper = 'shopper';
}
