interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    phone?: number;
    company_id?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

interface Auth {
    user: User;
}

interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    [key: string]: unknown;
}

interface Campaign {
    id: string;
    company_id: string;
    name: string;
    description: string | null;
    start_date: string;
    end_date: string;
    min_points_per_voucher: number;
    min_spend_for_point: string;
    status: 'active' | 'inactive' | 'draft';
    updated_at: string;
    [key: string]: unknown;
}
