import AppLayout from '@/layouts/app';
import { router } from '@inertiajs/react';
import { Scanner } from '@yudiel/react-qr-scanner';
import { toast } from 'sonner';

export default function VerifyClaim() {
    return (
        <AppLayout>
            <div className='flex min-h-[60vh] items-center justify-center px-6'>
                <div className='w-full max-w-md space-y-6'>
                    <div className='mt-6 overflow-hidden rounded-lg border border-default'>
                        <Scanner
                            onError={(err) => console.log(err)}
                            onScan={(result) => {
                                console.log(result);
                                router.post(
                                    route('vouchers.verify'),
                                    {
                                        voucher_code: 'ABC123',
                                    },
                                    {
                                        onSuccess: () =>
                                            toast.success(
                                                'Voucher was success verified.',
                                            ),
                                        onError: (err) =>
                                            toast.error(err.voucher_code),
                                    },
                                );
                            }}
                            styles={{
                                container: {
                                    width: '100%',
                                    maxWidth: '100%',
                                },
                            }}
                        />
                    </div>

                    <div className='rounded-lg bg-gray-50 p-4 text-sm text-secondary'>
                        <p className='mb-2 font-medium text-default'>
                            How to scan:
                        </p>
                        <ul className='list-inside list-disc space-y-1'>
                            <li>Hold your device steady</li>
                            <li>Ensure the QR code is well lit</li>
                            <li>Keep the QR code within the frame</li>
                        </ul>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
