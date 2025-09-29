import { router, usePage } from '@inertiajs/react';
import { GoMail, GoPerson, GoSignOut } from 'react-icons/go';
import { Button } from './ui/button';
import Dropdown from './ui/dropdown';

export default function NavBar() {
    const {
        auth: { user },
    } = usePage<SharedData>().props;

    const handleLogout = () => {
        router.post(route('logout'));
        router.flushAll();
    };

    return (
        <nav className='max-md-gutters:border-default relative isolate z-1 flex h-15 items-center justify-between gap-2 border-b border-default bg-default px-4'>
            <div className='flex items-center gap-2 overflow-hidden'>
                <div className='mr-2'>
                    <button
                        className='max-md-gutters:mt-0 mt-px flex cursor-pointer'
                        type='button'
                        aria-label='Navigate to home'
                    >
                        <svg
                            viewBox='0 0 71 20'
                            fill='none'
                            role='img'
                            className='icon-md w-[74px] text-default'
                        >
                            <path
                                d='M9.258 6.342c.158-.23.331-.26.472-.26.14 0 .374.03.532.26 2.06 2.806 6.332 10.208 6.727 10.611.585.597 1.388.225 1.854-.452.46-.667.587-1.135.587-1.634 0-.34-6.653-12.614-7.324-13.636C11.462.248 11.252 0 10.15 0h-.825c-1.1 0-1.259.248-1.903 1.23C6.75 2.254.097 14.528.097 14.868c0 .5.127.967.587 1.634.466.677 1.269 1.05 1.854.452.395-.403 4.661-7.805 6.72-10.61zm14.941-5.237v15.344h9.35v-3.113h-6.125v-3.244h5.45V6.98h-5.45V4.218h6.125V1.105h-9.35zM46.25 16.449l-3.88-5.568 3.619-5.195h-3.662L40.54 8.23l-1.765-2.543h-3.706l3.618 5.217-3.857 5.546h3.661l2.027-2.915 2.027 2.915h3.705zm7.572-10.982c-1.482 0-2.637.614-3.378 1.732V5.686H47.37V20h3.073v-5.063c.74 1.117 1.896 1.731 3.378 1.731 2.768 0 4.97-2.52 4.97-5.611 0-3.091-2.202-5.59-4.97-5.59zm-.697 8.242c-1.504 0-2.681-1.14-2.681-2.652 0-1.49 1.177-2.653 2.68-2.653 1.483 0 2.681 1.184 2.681 2.653 0 1.49-1.198 2.652-2.68 2.652zm12.188-8.242c-3.16 0-5.558 2.411-5.558 5.612 0 3.2 2.397 5.59 5.557 5.59 3.139 0 5.558-2.39 5.558-5.59 0-3.2-2.42-5.612-5.558-5.612zm0 2.96c1.438 0 2.55 1.117 2.55 2.652 0 1.49-1.112 2.63-2.55 2.63-1.46 0-2.55-1.14-2.55-2.63 0-1.535 1.09-2.653 2.55-2.653z'
                                fill='currentColor'
                            />
                        </svg>
                    </button>
                </div>
                <div className='flex flex-row items-center gap-2.5'>
                    <Button href='/' theme='quaternary'>
                        Home
                    </Button>
                    <Button href='/campaigns' theme='quaternary'>
                        Campaigns
                    </Button>
                    <Button href='/campaigns' theme='quaternary'>
                        Support
                    </Button>
                </div>
            </div>
            <div className='max-lg-gutters:hidden flex items-center gap-3'>
                {user ? (
                    <Dropdown
                        trigger={
                            <img
                                className='inline-block size-8 rounded-full'
                                src='/avatar.png'
                                alt='Avatar'
                            />
                        }
                    >
                        <div className='flex flex-col px-2 text-left'>
                            <span className='text-sm font-medium text-default'>
                                {user.name}
                            </span>
                            <span className='text-xs text-quaternary'>
                                {user.email}
                            </span>
                        </div>
                        <Dropdown.Separator />

                        <Dropdown.Item label='Account' Icon={GoPerson} />
                        <Dropdown.Item label='Get Help' Icon={GoMail} />
                        <Dropdown.Separator />
                        <Dropdown.Item
                            onSelect={handleLogout}
                            label='Log out'
                            Icon={GoSignOut}
                            destructive
                        />
                    </Dropdown>
                ) : (
                    <>
                        <Button theme='secondary' href='/login'>
                            Sign In
                        </Button>
                        <Button href='/register'>Sign Up</Button>
                    </>
                )}
            </div>
            <div className='flex items-center gap-2 sm:hidden'>
                <button
                    className='text-3xs relative inline-flex size-9 cursor-pointer items-center justify-center gap-1.5 rounded-md border border-solid border-button-quaternary bg-button-quaternary px-3 font-medium whitespace-nowrap text-button-quaternary shadow-none transition active:scale-98 hocus:bg-button-quaternary-hover'
                    type='button'
                    aria-label='Notifications'
                    aria-haspopup='dialog'
                    aria-expanded='false'
                    aria-controls='radix-«R1cmm»'
                    data-state='closed'
                >
                    <span className='flex self-center leading-none text-inherit'>
                        <svg
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            className='icon-md translate-z shrink-0 text-icon-default'
                            role='img'
                        >
                            <g id='bell-03-outline-icon'>
                                <path
                                    id='Icon'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M14.9997 19C14.9997 20.6569 13.6566 22 11.9997 22C10.3429 22 8.99972 20.6569 8.99972 19M13.7962 6.23856C14.2317 5.78864 14.4997 5.17562 14.4997 4.5C14.4997 3.11929 13.3804 2 11.9997 2C10.619 2 9.49972 3.11929 9.49972 4.5C9.49972 5.17562 9.76772 5.78864 10.2032 6.23856M17.9997 11.2C17.9997 9.82087 17.3676 8.49823 16.2424 7.52304C15.1171 6.54786 13.591 6 11.9997 6C10.4084 6 8.8823 6.54786 7.75708 7.52304C6.63186 8.49823 5.99972 9.82087 5.99972 11.2C5.99972 13.4818 5.43385 15.1506 4.72778 16.3447C3.92306 17.7056 3.5207 18.3861 3.53659 18.5486C3.55476 18.7346 3.58824 18.7933 3.73906 18.9036C3.87089 19 4.53323 19 5.85791 19H18.1415C19.4662 19 20.1286 19 20.2604 18.9036C20.4112 18.7933 20.4447 18.7346 20.4629 18.5486C20.4787 18.3861 20.0764 17.7056 19.2717 16.3447C18.5656 15.1506 17.9997 13.4818 17.9997 11.2Z'
                                />
                            </g>
                        </svg>
                    </span>
                </button>
                <button
                    className='relative inline-flex h-9 w-9 cursor-pointer items-center justify-center gap-2 rounded-md border border-solid border-button-quaternary bg-button-quaternary px-0 text-xs font-medium whitespace-nowrap text-button-quaternary shadow-none transition active:scale-98 hocus:bg-button-quaternary-hover'
                    type='button'
                    id='mobile-menu'
                    aria-label='Open menu'
                >
                    <svg
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        className='translate-z size-6 shrink-0 text-icon-default'
                        role='img'
                    >
                        <g id='menu-01-outline-icon'>
                            <path
                                id='Icon'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M3 12H21M3 6H21M3 18H21'
                            />
                        </g>
                    </svg>
                </button>
            </div>
        </nav>
    );
}
