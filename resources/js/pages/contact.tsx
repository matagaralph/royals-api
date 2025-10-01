import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/text-area';
import AppLayout from '@/layouts/app';

export default function ContactPage() {
    return (
        <AppLayout>
            <div className='relative isolate overflow-hidden px-6 pt-20 pb-40 lg:pb-72'>
                <div className='relative z-10 mx-auto w-full max-w-xl lg:max-w-7xl'>
                    <div className='grid grid-cols-1 gap-y-12 lg:grid-cols-2 lg:divide-x lg:divide-[#DFE3E6]'>
                        <div className='flex flex-col items-stretch lg:pr-20 lg:pb-16'>
                            <h1 className='font-heading text-4xl lg:text-5xl'>
                                Talk to our sales team
                            </h1>
                            <p className='mt-8 text-default sm:text-lg'>
                                We'd love to answer any questions about Royals,
                                or address any problems you're running into!
                            </p>
                            <p className='mt-8 text-default sm:text-lg'>
                                Provide your information and we'll be in touch.
                            </p>
                            <div className='flex-1'></div>
                        </div>
                        <div className='lg:pl-20'>
                            <h1>Tell us how can we help</h1>
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
                                            htmlFor='email'
                                            className='block text-sm leading-6 font-medium text-default'
                                        >
                                            Message
                                        </label>
                                        <div className='mt-2'>
                                            <Textarea
                                                characterLimit={500}
                                                className='h-36 outline-0'
                                            />
                                        </div>
                                    </div>
                                    <Button type='submit'>Send message</Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
