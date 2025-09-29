import { Button } from '@/components/ui/button';
import { InlineMessage } from '@/components/ui/inline-message';
import { Input } from '@/components/ui/input';
import { Link } from '@/components/ui/link';
import { Form, Head } from '@inertiajs/react';

export default function LoginPage() {
    return (
        <>
            <Head title='Sign in to your account' />
            <div className='flex h-dvh flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
                <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                    <img
                        className='mx-auto h-10 w-auto'
                        src='https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500'
                        alt='Royals'
                    />
                    <h2 className='mt-10 text-center text-2xl leading-9 font-bold tracking-tight text-default'>
                        Sign up to Royals Platform
                    </h2>
                </div>

                <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
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
                                        htmlFor='name'
                                        className='block text-sm leading-6 font-medium text-default'
                                    >
                                        Name
                                    </label>
                                    <div className='mt-2'>
                                        <Input
                                            id='name'
                                            name='name'
                                            autoComplete='name'
                                            placeholder='Maria Kuleya'
                                            required
                                        />
                                    </div>
                                </div>

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
                                        disabled={processing}
                                        type='submit'
                                        className='w-full justify-center'
                                    >
                                        Sign up with Email
                                    </Button>
                                </div>
                            </>
                        )}
                    </Form>

                    <p className='mt-4 text-sm text-tertiary'>
                        Already have an account?
                        <Link
                            href='/login'
                            className='mx-1 leading-6 font-medium text-secondary hover:text-link'
                        >
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}
