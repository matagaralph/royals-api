import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { Link, router, usePage } from '@inertiajs/react';
import { BiMenu } from 'react-icons/bi';
import {
    GoChevronDown,
    GoInbox,
    GoMail,
    GoPerson,
    GoSignOut,
} from 'react-icons/go';
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
        <div className='border-b border-b-default py-4 sm:py-3 lg:mx-0 lg:px-8'>
            <div className='relative mx-4 flex items-center'>
                <Link
                    className='mr-3 flex items-center gap-x-3 overflow-hidden md:w-auto'
                    href='/'
                >
                    <span className='sr-only'>Royals home page</span>
                    <img src='/logo.png' className='size-6' />
                    <span className='leading-tight font-semibold text-default'>
                        Royals
                    </span>
                </Link>

                <div className='relative ml-auto hidden items-center lg:flex'>
                    <nav className='text-sm leading-6 font-medium text-default'>
                        <ul className='flex space-x-8'>
                            <li>
                                <Link className='hover:text-link' href='/'>
                                    Home
                                </Link>
                            </li>

                            <Popover>
                                <PopoverButton className='data-open:&_svg:rotate-180 flex items-center gap-x-2 font-medium focus:outline-none data-active:text-default data-focus:outline data-focus:outline-slate-900 data-hover:text-default'>
                                    Campaigns
                                    <GoChevronDown />
                                </PopoverButton>
                                <PopoverPanel
                                    transition
                                    anchor='bottom'
                                    className='divide-y divide-slate-200 rounded-xl border border-default bg-white text-sm/6 shadow-lg transition duration-200 ease-in-out [--anchor-gap:--spacing(5)] data-closed:-translate-y-1 data-closed:opacity-0'
                                >
                                    <div className='p-3'>
                                        <Link
                                            className='block rounded-lg px-3 py-2 transition hover:bg-hover'
                                            href='/admin/vouchers/create'
                                        >
                                            <p className='font-semibold text-default'>
                                                Issue Vouchers
                                            </p>
                                            <p className='text-secondary'>
                                                Generate and distribute points
                                                vouchers.
                                            </p>
                                        </Link>
                                        <Link
                                            className='block rounded-lg px-3 py-2 transition hover:bg-hover'
                                            href='/admin'
                                        >
                                            <p className='font-semibold text-default'>
                                                Campaigns
                                            </p>
                                            <p className='text-secondary'>
                                                Create and manage loyalty
                                                campaigns.
                                            </p>
                                        </Link>
                                        <Link
                                            className='block rounded-lg px-3 py-2 transition hover:bg-hover'
                                            href='/admin/vouchers/verify'
                                        >
                                            <p className='font-semibold text-default'>
                                                Verify Claim
                                            </p>
                                            <p className='text-secondary'>
                                                Verify claims and reward
                                                customers
                                            </p>
                                        </Link>
                                    </div>
                                    <div className='p-3'>
                                        <a
                                            className='block rounded-lg px-3 py-2 transition hover:bg-hover'
                                            href='#'
                                        >
                                            <p className='font-semibold text-default'>
                                                API Documentation
                                            </p>
                                            <p className='text-secondary'>
                                                Start integrating products and
                                                tools
                                            </p>
                                        </a>
                                    </div>
                                </PopoverPanel>
                            </Popover>
                            <li>
                                <Link
                                    className='hover:text-link'
                                    href='admin/collaborators'
                                >
                                    Collaborators
                                </Link>
                            </li>
                            <li>
                                <a className='hover:text-link' href='/contact'>
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <div className='ml-6 flex items-center border-l border-l-default pl-6'>
                        <button type='button'>
                            {user && (
                                <GoInbox className='hidden size-5 text-icon-default sm:inline-flex' />
                            )}
                        </button>
                        {user ? (
                            <Dropdown
                                trigger={
                                    <img
                                        className='ml-6 inline-block size-8 rounded-full'
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

                                <Dropdown.Item
                                    label='Account'
                                    Icon={GoPerson}
                                />
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
                            <div className='flex items-center gap-x-4'>
                                <Button theme='secondary' href='/login'>
                                    Sign In
                                </Button>
                                <Button href='/register'>Sign Up</Button>
                            </div>
                        )}
                    </div>
                </div>
                <button
                    type='button'
                    className='-my-1 ml-auto flex h-8 w-8 items-center justify-center text-slate-500 hover:text-secondary lg:hidden dark:text-slate-400 dark:hover:text-slate-300'
                >
                    <span className='sr-only'>Search</span>
                    <svg
                        width={24}
                        height={24}
                        fill='none'
                        stroke='currentColor'
                        strokeWidth={2}
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        aria-hidden='true'
                    >
                        <path d='m19 19-3.5-3.5' />
                        <circle cx={11} cy={11} r={6} />
                    </svg>
                </button>
                <div className='-my-1 ml-2 lg:hidden'>
                    <button
                        type='button'
                        className='flex h-8 w-8 items-center justify-center text-icon-default hover:text-secondary'
                    >
                        <span className='sr-only'>Navigation</span>
                        <BiMenu className='size-6' />
                    </button>
                    <div
                        style={{
                            position: 'fixed',
                            top: 1,
                            left: 1,
                            width: 1,
                            height: 0,
                            padding: 0,
                            margin: '-1px',
                            overflow: 'hidden',
                            clip: 'rect(0px, 0px, 0px, 0px)',
                            whiteSpace: 'nowrap',
                            borderWidth: 0,
                            display: 'none',
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
