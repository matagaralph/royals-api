import NavBar from '@/components/navbar';
import { ReactNode } from 'react';

export default function AppLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <NavBar />
            <main className='mx-auto max-w-7xl px-4 pt-6'>{children}</main>
        </>
    );
}
