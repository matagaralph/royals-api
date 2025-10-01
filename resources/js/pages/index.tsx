import NavBar from '@/components/navbar';
import { Button } from '@/components/ui/button';

export default function IndexPage() {
    return (
        <>
            <NavBar />
            <div className='mx-auto max-w-7xl px-6 pt-8 pb-16 sm:pt-12 sm:pb-24 lg:flex lg:items-center lg:gap-x-16 lg:px-8 lg:pt-20 lg:pb-24'>
                <div className='mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8'>
                    <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
                        Turn loyal customers into brand advocates
                    </h1>
                    <p className='mt-6 text-lg leading-8 text-gray-600 sm:text-xl sm:leading-8'>
                        Getting more repeat purchases isn't the only benefit of
                        using Royals for loyalty. Enjoy the added bonus of
                        acquiring new customers efficiently when shoppers refer
                        their friends to your brand.
                    </p>
                    <div className='mt-10 flex items-center gap-x-6'>
                        <Button
                            size='md'
                            className='bg-black text-white hover:bg-gray-800'
                        >
                            Get Started for Free
                        </Button>
                        <Button size='md' theme='secondary'>
                            Integrations
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
        </>
    );
}
