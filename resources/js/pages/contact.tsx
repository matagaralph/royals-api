import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/text-area';
import AppLayout from '@/layouts/app';

export default function ContactPage() {
    return (
        <AppLayout>
            <div className='relative isolate overflow-hidden px-6 pt-12 pb-24 lg:pt-16 lg:pb-32'>
                <div className='relative z-10 mx-auto w-full max-w-xl lg:max-w-7xl'>
                    <div className='grid grid-cols-1 gap-y-12 lg:grid-cols-2 lg:gap-x-16 lg:divide-x lg:divide-[#DFE3E6]'>
                        <div className='flex flex-col items-stretch lg:pr-16'>
                            <h1 className='font-heading text-4xl font-bold lg:text-5xl'>
                                Get in touch
                            </h1>
                            <p className='mt-6 text-base leading-7 text-secondary'>
                                We'd love to answer any questions about Royals,
                                or address any problems you're running into!
                            </p>
                            <p className='mt-4 text-base leading-7 text-secondary'>
                                Provide your information and we'll be in touch.
                            </p>
                            <div className='flex-1'></div>
                        </div>
                        <div className='lg:pl-16'>
                            <div className='w-full max-w-[460px]'>
                                <form className='space-y-6'>
                                    <div>
                                        <label
                                            htmlFor='name'
                                            className='block text-sm leading-6 font-medium text-default'
                                        >
                                            Full Name
                                        </label>
                                        <div className='mt-2'>
                                            <Input
                                                id='name'
                                                name='name'
                                                autoComplete='name'
                                                placeholder='Full name'
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
                                                placeholder='email@company.com'
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor='message'
                                            className='block text-sm leading-6 font-medium text-default'
                                        >
                                            Message
                                        </label>
                                        <div className='mt-2'>
                                            <Textarea
                                                id='message'
                                                name='message'
                                                characterLimit={500}
                                                className='h-36 outline-0'
                                            />
                                        </div>
                                    </div>
                                    <div className='flex justify-end pt-2'>
                                        <Button
                                            size='md'
                                            type='submit'
                                            className='w-full sm:w-auto'
                                        >
                                            Send message
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
