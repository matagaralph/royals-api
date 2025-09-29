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
                        className='max-md-gutters:mt-0 mt-px flex cursor-pointer items-center gap-x-3'
                        type='button'
                        aria-label='Navigate to home'
                    >
                        <img src='/logo.png' alt='Company' className='size-7' />
                        <span>Royals</span>
                    </button>
                </div>
                <div className='flex flex-row items-center gap-2.5'>
                    <Button href='/' theme='quaternary'>
                        Home
                    </Button>
                    <Button href='/admin' theme='quaternary'>
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
