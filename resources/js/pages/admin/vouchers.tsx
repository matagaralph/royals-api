import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { InlineMessage } from '@/components/ui/inline-message';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app';
import axios, { AxiosError } from 'axios';
import { FormEvent, useState } from 'react';

type Voucher = {
    voucher_id: number;
    voucher_code: string;
    points_value: number;
    qr_code: string;
};

function getCookie(name: string): string | undefined {
    const value: string = `; ${document.cookie}`;
    const parts: string[] = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop()?.split(';').shift();
    }
    return undefined;
}

export default function IssueVoucher() {
    const campaignId = new URLSearchParams(window.location.search).get(
        'campaign',
    );
    const [voucher, setVoucher] = useState<Voucher | null>(null);
    const [error, setError] = useState('');

    return (
        <AppLayout>
            <Heading>Vouchers</Heading>
            <p className='text-sm text-secondary'>
                Generate points vouchers for your shoppers. Track and share
                vouchers easily from this page.
            </p>
            <div className='mt-4 grid grid-cols-1 gap-8 sm:grid-cols-6'>
                <div className='sm:col-span-3'>
                    <form
                        className='space-y-6'
                        onSubmit={async (e: FormEvent<HTMLFormElement>) => {
                            setError('');
                            e.preventDefault();
                            const form = e.currentTarget;
                            const formData = new FormData(form);
                            const shopper_paid_amount = parseFloat(
                                formData.get('shopper_paid_amount') as string,
                            );
                            const reference = formData.get(
                                'reference',
                            ) as string;

                            try {
                                // await axios.get(
                                //     'http://localhost:8000/sanctum/csrf-cookie',
                                //     { withCredentials: true },
                                // );
                                const token = getCookie('XSRF-TOKEN');
                                const res = await axios.post(
                                    `http://localhost:8000/api/vouchers/generate/${campaignId}`,
                                    {
                                        shopper_paid_amount,
                                        reference,
                                    },
                                    {
                                        // withCredentials: true,
                                        headers: {
                                            Accept: 'application/json',
                                            // 'X-XSRF-TOKEN': decodeURIComponent(
                                            //     token as string,
                                            // ),
                                        },
                                    },
                                );
                                const data: Voucher = res.data;
                                setVoucher(data);
                            } catch (err) {
                                if (err instanceof AxiosError) {
                                    setError(err.response?.data.message);
                                }
                            }
                        }}
                    >
                        <div>
                            <label
                                htmlFor='shopper_paid_amount'
                                className='block text-sm leading-6 font-medium text-default'
                            >
                                Amount Paid
                            </label>
                            <Input
                                id='shopper_paid_amount'
                                name='shopper_paid_amount'
                                type='number'
                                step='0.01'
                                min='1'
                                placeholder='Enter amount paid by shopper'
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor='reference'
                                className='block text-sm leading-6 font-medium text-default'
                            >
                                Reference
                            </label>
                            <Input
                                id='reference'
                                name='reference'
                                placeholder='Enter receipt number (optional)'
                            />
                            {error && (
                                <InlineMessage variant='critical'>
                                    {error}
                                </InlineMessage>
                            )}
                        </div>
                        <div className='flex items-center gap-x-4'>
                            <Button type='submit'>Generate</Button>
                        </div>
                    </form>
                </div>
                <div className='sm:col-span-3'>
                    <div className='grid w-full grid-cols-1 sm:mt-8'>
                        {voucher && (
                            <div>
                                {voucher.qr_code && (
                                    <img
                                        src={voucher.qr_code}
                                        className='h-[200px]'
                                    />
                                )}
                                <div className='mt-2'>
                                    <span className='text-[16px] font-medium text-default'>
                                        Your voucher is worth{' '}
                                        {voucher.points_value} pts
                                    </span>
                                    <p className='text-[14px] text-secondary'>
                                        Code: {voucher.voucher_code}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
