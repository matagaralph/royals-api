import { Button } from '@/components/ui/button';
import { InlineMessage } from '@/components/ui/inline-message';
import { Input } from '@/components/ui/input';
import { Form, Link } from '@inertiajs/react';
import { GoChevronRight } from 'react-icons/go';

export default function Register() {
    return (
        <div className='relative flex min-h-screen flex-col items-center justify-center bg-white'>
            <div className='flex w-full max-w-[512px] flex-col gap-12 px-6'>
                <div>
                    <div className='space-y-8'>
                        <div className='flex w-full flex-col items-start justify-start gap-2'>
                            <h1 className='text-xl leading-6 font-medium text-default'>
                                Welcome to Royals Loyalty
                            </h1>
                            <p className='text-sm text-secondary'>
                                Sign up and launch your first campaign today.
                            </p>
                        </div>
                        <Form
                            className='space-y-6'
                            method='post'
                            action={route('register')}
                            resetOnSuccess={['password']}
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
                                                placeholder='example@company.com'
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor='password'
                                            className='block text-sm leading-6 font-medium text-default'
                                        >
                                            Password
                                        </label>

                                        <div className='mt-2'>
                                            <Input
                                                id='password'
                                                name='password'
                                                type='password'
                                                autoComplete='current-password'
                                                placeholder='New Password'
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
                                            Continue
                                        </Button>
                                        <p className='mt-6 text-[13px] text-default'>
                                            By creating an account, you agree to
                                            our
                                            <Link
                                                href='/legal/terms'
                                                target='_blank'
                                                rel='noopener noreferrer'
                                                className='mx-1 font-medium text-link focus:outline-hidden'
                                            >
                                                Terms of Service
                                            </Link>
                                            and
                                            <Link
                                                href='/legal/privacy-policy'
                                                target='_blank'
                                                rel='noopener noreferrer'
                                                className='mx-1 font-medium text-link focus:outline-hidden'
                                            >
                                                Privacy Policy
                                            </Link>
                                            .
                                        </p>
                                    </div>
                                </>
                            )}
                        </Form>
                        <p className='text-[13px] text-tertiary'>
                            Already have an account?
                            <Link
                                className='mx-1 text-link hover:text-link/90'
                                href='/login'
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
