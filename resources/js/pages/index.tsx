import NavBar from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { BsBarChartFill } from 'react-icons/bs';
import { FaFacebook, FaRobot, FaYoutube } from 'react-icons/fa';
import { FaCircleCheck, FaGift } from 'react-icons/fa6';
import { GoChevronRight, GoCodescanCheckmark, GoPeople } from 'react-icons/go';

const faqs = [
    {
        question: 'How do you make holy water?',
        answer: 'You boil the hell out of it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.',
    },
    {
        question: `What's the best thing about Switzerland?`,
        answer: `I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.`,
    },
    {
        question: `What do you call someone with no body and no nose?`,
        answer: `Nobody knows. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.`,
    },
    {
        question: `Why do you never see elephants hiding in trees?`,
        answer: `Because they're so good at it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.`,
    },
    // More questions...
];

export default function IndexPage() {
    return (
        <>
            <NavBar />
            <div className='mx-auto max-w-7xl px-6 pt-8 pb-16 sm:pt-12 sm:pb-24 lg:flex lg:items-center lg:gap-x-16 lg:px-8 lg:pt-20 lg:pb-24'>
                <div className='mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8'>
                    <h1 className='!font-heading text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl'>
                        Turn loyal customers into brand advocates
                    </h1>
                    <p className='mt-6 text-lg leading-8 text-slate-600 sm:text-xl sm:leading-8'>
                        Getting more repeat purchases isn't the only benefit of
                        using Royals for loyalty. Enjoy the added bonus of
                        acquiring new customers efficiently when shoppers refer
                        their friends to your brand.
                    </p>
                    <div className='mt-10 flex items-center gap-x-6'>
                        <Button
                            href='/register'
                            rightSlot={
                                <GoChevronRight className='size-4 text-icon-default' />
                            }
                            size='md'
                            className='bg-black text-white hocus:bg-black/90'
                        >
                            Get Started for Free
                        </Button>
                    </div>
                </div>

                <div className='mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:mt-0 lg:mr-0 lg:ml-0 lg:max-w-none lg:flex-1'>
                    <div className='relative w-full max-w-lg lg:max-w-none'>
                        <img
                            alt='App screenshot'
                            loading='lazy'
                            className='h-auto w-full'
                            src='/points-earned.png'
                        />
                    </div>
                </div>
            </div>
            <div className='relative overflow-hidden !bg-[var(--purple-10)] px-6 py-12 md:px-8 md:py-20'>
                <picture>
                    <source
                        srcSet='/pro-features-glow.avif'
                        type='image/avif'
                    />
                    <img
                        alt='Glow'
                        loading='lazy'
                        width={731}
                        height={535}
                        decoding='async'
                        data-nimg={1}
                        className='pointer-events-none absolute -top-48 left-3/4 isolate z-50 ml-[-50rem] w-[calc(1460/16*1rem)] max-w-none mix-blend-overlay select-none'
                        src='/pro-features-glow.png'
                        style={{ color: 'transparent' }}
                    />
                </picture>
                <section className='mx-auto sm:max-w-[40rem] md:max-w-3xl lg:max-w-5xl xl:max-w-[77.5rem]'>
                    <div className='mx-auto border border-slate-100 bg-white pt-12 pb-16'>
                        <div className='mx-auto w-full px-6 text-center sm:max-w-[40rem] md:max-w-[48rem] md:px-8 lg:max-w-[64rem] xl:max-w-[80rem]'>
                            <h2 className='text-sm font-medium text-gray-500'>
                                Everything you need
                            </h2>
                            <p className='mt-5 font-heading text-3xl font-semibold text-balance text-[var(--purple-10)] sm:text-4xl'>
                                All the advanced
                                <span className='[text-shadow:0_-1px_10px_theme(colors.purple/0.45)] mx-2'>
                                    features
                                </span>
                                you need
                            </p>
                        </div>
                        <ul
                            role='list'
                            className='mt-20 grid grid-cols-1 gap-x-10 gap-y-8 px-6 sm:px-12 md:grid-cols-2 md:gap-y-12 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-16'
                        >
                            <li>
                                <h3 className='flex items-center gap-2.5 font-medium whitespace-nowrap text-default'>
                                    <FaGift className='size-4 text-icon-default' />
                                    Shopper Rewards
                                </h3>
                                <p className='mt-2 text-[0.875rem]/5 text-secondary'>
                                    Reward your shoppers with points and
                                    vouchers. Every voucher includes a unique
                                    code and QR code for seamless redemption and
                                    tracking.
                                </p>
                            </li>
                            <li>
                                <h3 className='flex items-center gap-2.5 font-medium whitespace-nowrap text-default'>
                                    <GoCodescanCheckmark className='size-4 text-icon-default' />
                                    Instant Voucher Scan
                                </h3>
                                <p className='mt-2 text-[0.875rem]/5 text-secondary'>
                                    Scan QR codes to instantly add vouchers to
                                    accounts and watch points grow in real time.
                                </p>
                            </li>
                            <li>
                                <h3 className='flex items-center gap-2.5 font-medium whitespace-nowrap text-default'>
                                    <FaCircleCheck className='size-4 text-icon-default' />
                                    Reward Redemption
                                </h3>
                                <p className='mt-2 text-[0.875rem]/5 text-secondary'>
                                    Redeem rewards automatically once points
                                    requirements are met. Voucher claims are
                                    verified by owners to ensure smooth and
                                    secure distribution.
                                </p>
                            </li>
                            <li>
                                <h3 className='flex items-center gap-2.5 font-medium whitespace-nowrap text-default'>
                                    <GoPeople className='size-4 text-icon-default' />
                                    Campaign Management
                                </h3>
                                <p className='mt-2 text-[0.875rem]/5 text-secondary'>
                                    Manage campaigns, authorize trusted issuers,
                                    and oversee the reward system with full
                                    control and transparency.
                                </p>
                            </li>
                            <li>
                                <h3 className='flex items-center gap-2.5 font-medium whitespace-nowrap text-default'>
                                    <BsBarChartFill className='size-4 text-icon-default' />
                                    Real-Time Analytics
                                </h3>
                                <p className='mt-2 text-[0.875rem]/5 text-secondary'>
                                    Track redemption rates, monitor active
                                    users, and measure campaign performance
                                    instantly with live insights.
                                </p>
                            </li>
                            <li>
                                <h3 className='flex items-center gap-2.5 font-medium whitespace-nowrap text-default'>
                                    <FaRobot className='size-4 text-icon-default' />
                                    Whatsapp Assistant
                                </h3>
                                <p className='mt-2 text-[0.875rem]/5 text-secondary'>
                                    Let customers instantly check their balance,
                                    points, and vouchers through a simple chat
                                    with our WhatsApp assistant.
                                </p>
                            </li>
                        </ul>
                    </div>
                    <div className='relative mt-2 h-4'>
                        <canvas
                            className='absolute inset-0 h-full w-full'
                            aria-hidden='true'
                            width={1024}
                            height={16}
                        />
                    </div>
                </section>
            </div>
            <div className='bg-white'>
                <div className='mx-auto max-w-7xl px-6 py-24 sm:pt-32 lg:px-8 lg:py-36'>
                    <div className='lg:grid lg:grid-cols-12 lg:gap-8'>
                        <div className='lg:col-span-5'>
                            <h2 className='font-heading text-2xl leading-10 font-bold tracking-tight text-default'>
                                Frequently asked questions
                            </h2>
                            <p className='mt-4 text-base leading-7 text-gray-600'>
                                Can’t find the answer you’re looking for? Reach
                                out to our{' '}
                                <Link
                                    href='/contact'
                                    className='font-semibold text-link hover:text-link/90'
                                >
                                    customer sales
                                </Link>{' '}
                                team.
                            </p>
                        </div>
                        <div className='mt-10 lg:col-span-7 lg:mt-0'>
                            <dl className='space-y-10'>
                                {faqs.map((faq) => (
                                    <div key={faq.question}>
                                        <dt className='text-base leading-7 font-semibold text-default'>
                                            {faq.question}
                                        </dt>
                                        <dd className='mt-2 text-base leading-7 text-gray-600'>
                                            {faq.answer}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
            <footer className='mt-16 border-t border-t-default text-sm leading-6'>
                <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                    <div className='justify-between py-10 text-slate-500 sm:flex'>
                        <div className='mb-6 sm:mb-0 sm:flex'>
                            <p>
                                Copyright © {new Date().getFullYear()} Royals
                                Africa
                            </p>
                            <p className='sm:ml-4 sm:border-l sm:border-slate-200 sm:pl-4'>
                                <Link
                                    className='hover:text-slate-900'
                                    href='/policy'
                                >
                                    Privacy Policy
                                </Link>
                            </p>
                        </div>
                        <div className='flex space-x-10 text-slate-400'>
                            <Link
                                href='#'
                                className='hover:text-slate-500'
                                aria-label='GitHub'
                            >
                                <span className='sr-only'>Facebook</span>
                                <FaFacebook className='size-6 text-icon-default' />
                            </Link>
                            <Link
                                href='#'
                                className='hover:text-slate-500'
                                aria-label='Discord'
                            >
                                <span className='sr-only'>YouTube</span>
                                <FaYoutube className='size-6 text-icon-default' />
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
