import { Link, router, usePage } from '@inertiajs/react';
import { BiMenu } from 'react-icons/bi';
import { GoBell, GoMail, GoPerson, GoSignOut } from 'react-icons/go';
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
        <div className='border-b border-b-default py-3 lg:mx-0 lg:px-8'>
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
                            <li>
                                <Link href='#' className='hover:text-link'>
                                    Campaigns
                                </Link>
                            </li>
                            <li>
                                <Link className='hover:text-link' href='#'>
                                    Pricing
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
                        <label
                            className='sr-only'
                            htmlFor='headlessui-listbox-button-:r5:'
                            id='headlessui-label-:r4:'
                            data-headlessui-state=''
                        >
                            Theme
                        </label>
                        <button
                            type='button'
                            id='headlessui-listbox-button-:r5:'
                            aria-haspopup='listbox'
                            aria-expanded='false'
                            data-headlessui-state=''
                            aria-labelledby='headlessui-label-:r4: headlessui-listbox-button-:r5:'
                        >
                            <span className='dark:hidden'>
                                <svg
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    strokeWidth={2}
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    className='h-6 w-6'
                                >
                                    <path
                                        d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                                        className='fill-sky-400/20 stroke-sky-500'
                                    />
                                    <path
                                        d='M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836'
                                        className='stroke-sky-500'
                                    />
                                </svg>
                            </span>
                            {user && (
                                <GoBell className='hidden size-5 text-icon-default sm:inline-flex' />
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
                    className='-my-1 ml-auto flex h-8 w-8 items-center justify-center text-slate-500 hover:text-slate-600 lg:hidden dark:text-slate-400 dark:hover:text-slate-300'
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
                        className='flex h-8 w-8 items-center justify-center text-icon-default hover:text-slate-600'
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
