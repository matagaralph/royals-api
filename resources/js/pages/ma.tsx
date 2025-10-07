import AppLayout from '@/layouts/app';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import { HiChevronRight, HiDotsVertical, HiGift } from 'react-icons/hi';

export default function ShopperPage() {
    const [points, setPoints] = useState(250);
    const { auth } = usePage<SharedData>().props;
    console.log(auth);
    const rewards = [
        {
            id: 1,
            name: '$10 Off Coupon',
            points: 500,
            date: '15 Sept',
            type: 'Reward',
        },
        {
            id: 2,
            name: '$25 Gift Card',
            points: 1200,
            date: '10 Sept',
            type: 'Reward',
        },
    ];

    return (
        <AppLayout>
            <div className='grid grid-cols-1 gap-8 pt-8 lg:grid-cols-3'>
                {/* Left Column - Points & Upgrade */}
                <div className='space-y-6 lg:col-span-1'>
                    {/* Points Balance Card */}
                    <div className='rounded-lg border border-default bg-white p-6 shadow-xs'>
                        <div className='mb-4 flex items-start justify-between'>
                            <h2 className='text-lg font-normal text-gray-700'>
                                Points balance
                            </h2>
                            <button className='text-gray-500 hover:text-gray-700'>
                                <HiDotsVertical className='h-5 w-5' />
                            </button>
                        </div>

                        <div className='mb-1'>
                            <p className='text-5xl font-light text-gray-900'>
                                {points.toLocaleString()}
                            </p>
                        </div>
                        <p className='text-sm text-gray-600'>Available</p>
                    </div>

                    {/* Upgrade Section */}
                    <div className='rounded-lg border border-default bg-white p-6 shadow-xs'>
                        <div className='mb-4'>
                            <h3 className='mb-2 text-base font-medium text-gray-900'>
                                Become a Platform Owner
                            </h3>
                            <p className='text-sm text-gray-600'>
                                Run your own campaigns and manage customer
                                rewards
                            </p>
                        </div>

                        <ul className='mb-4 space-y-2'>
                            <li className='flex items-center gap-2 text-sm text-gray-700'>
                                <div className='h-1 w-1 rounded-full bg-blue-600'></div>
                                <span>Create loyalty campaigns</span>
                            </li>
                            <li className='flex items-center gap-2 text-sm text-gray-700'>
                                <div className='h-1 w-1 rounded-full bg-blue-600'></div>
                                <span>Analytics dashboard</span>
                            </li>
                            <li className='flex items-center gap-2 text-sm text-gray-700'>
                                <div className='h-1 w-1 rounded-full bg-blue-600'></div>
                                <span>Manage rewards</span>
                            </li>
                        </ul>

                        <button className='flex w-full items-center justify-center gap-2 rounded bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700'>
                            Upgrade now
                            <HiChevronRight className='h-4 w-4' />
                        </button>
                    </div>
                </div>

                <div className='lg:col-span-2'>
                    <div className='rounded-lg border border-default bg-white shadow-xs'>
                        <div className='border-b border-secondary p-3.5'>
                            <h2 className='text-lg font-medium text-gray-900'>
                                Available rewards
                            </h2>
                        </div>

                        <div className='divide-y divide-default'>
                            {rewards.map((reward) => {
                                const canClaim = points >= reward.points;
                                return (
                                    <div
                                        key={reward.id}
                                        className='flex items-center justify-between p-6 transition-colors hover:bg-gray-50'
                                    >
                                        <div className='flex items-center gap-4'>
                                            <div className='flex h-10 w-10 items-center justify-center rounded bg-gray-100'>
                                                <HiGift className='h-5 w-5 text-gray-600' />
                                            </div>
                                            <div>
                                                <p className='text-sm font-medium text-gray-900'>
                                                    {reward.name}
                                                </p>
                                                <p className='text-sm text-gray-600'>
                                                    {reward.date} ·{' '}
                                                    {reward.type}
                                                </p>
                                            </div>
                                        </div>
                                        <div className='text-right'>
                                            <p
                                                className={`text-sm font-medium ${canClaim ? 'text-gray-900' : 'text-gray-400'}`}
                                            >
                                                {reward.points.toLocaleString()}{' '}
                                                pts
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className='border-t border-gray-200 p-4'>
                            <button className='text-sm font-medium text-blue-600 hover:text-blue-700'>
                                Show all
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
