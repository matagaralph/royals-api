import { Button } from '@/components/ui/button';
import { InlineMessage } from '@/components/ui/inline-message';
import { Input } from '@/components/ui/input';
import { Link } from '@/components/ui/link';
import { Form, Head } from '@inertiajs/react';
import { GoChevronRight } from 'react-icons/go';

export default function LoginPage() {
    return (
        <>
            <Head title='Sign in to your account' />
            <div className='flex h-dvh flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
                <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                    <img
                        className='mx-auto h-10 w-auto'
                        src='/logo.png'
                        alt='Royals'
                    />
                    <h2 className='mt-10 text-center text-2xl leading-9 font-bold tracking-tight text-default'>
                        Sign in to your account
                    </h2>
                </div>

                <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                    <Form
                        className='space-y-6'
                        method='post'
                        action={route('login')}
                        resetOnSuccess={['password']}
                        transform={(data: Record<string, any>) => {
                            const payload = { ...data, remember: true };
                            return payload;
                        }}
                    >
                        {({ processing, errors }) => (
                            <>
                                <div>
                                    <label
                                        htmlFor='email'
                                        className='block text-sm leading-6 font-medium text-default'
                                    >
                                        Email address
                                    </label>
                                    <div className='mt-2'>
                                        <Input
                                            id='email'
                                            name='email'
                                            type='email'
                                            autoComplete='email'
                                            placeholder='someone@example.com'
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className='flex items-center justify-between'>
                                        <label
                                            htmlFor='password'
                                            className='block text-sm leading-6 font-medium text-default'
                                        >
                                            Password
                                        </label>
                                        <div className='text-sm'>
                                            <Link
                                                href='#'
                                                className='font-medium text-link'
                                            >
                                                Forgot password?
                                            </Link>
                                        </div>
                                    </div>
                                    <div className='mt-2'>
                                        <Input
                                            id='password'
                                            name='password'
                                            type='password'
                                            autoComplete='current-password'
                                            placeholder='Password'
                                            required
                                        />
                                    </div>
                                    {Object.keys(errors).length > 0 && (
                                        <InlineMessage variant='critical'>
                                            {Object.values(errors)[0]}
                                        </InlineMessage>
                                    )}
                                </div>

                                <div>
                                    <Button
                                        rightSlot={
                                            <GoChevronRight className='size-4' />
                                        }
                                        disabled={processing}
                                        type='submit'
                                        className='w-full justify-center'
                                    >
                                        Continue With Email
                                    </Button>
                                </div>
                            </>
                        )}
                    </Form>

                    <p className='mt-4 text-sm text-tertiary'>
                        Don't have an account?
                        <Link
                            href='/register'
                            className='mx-1 leading-6 font-medium text-secondary hover:text-link'
                        >
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}
