export default function NotFound() {
    return (
        <>
            <title>Not Found</title>
            <div className='relative flex min-h-screen items-center justify-center bg-screen sm:items-center sm:pt-0'>
                <div className='mx-auto max-w-xl sm:px-6 lg:px-8'>
                    <div className='flex items-center pt-8 sm:justify-start sm:pt-0'>
                        <div className='border-r border-default px-4 text-lg tracking-wider text-secondary'>
                            404
                        </div>
                        <div className='ml-4 text-lg tracking-wider text-secondary uppercase'>
                            Not Found
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
