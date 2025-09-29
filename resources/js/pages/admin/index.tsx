import { Button } from '@/components/ui/button';
import Dialog from '@/components/ui/dialog';
import { InlineMessage } from '@/components/ui/inline-message';
import { Input } from '@/components/ui/input';
import { Link } from '@/components/ui/link';
import Table from '@/components/ui/table';
import AppLayout from '@/layouts/app';
import { Form, usePage } from '@inertiajs/react';
import { format, intervalToDuration, parseISO } from 'date-fns';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { GoGift, GoPlus } from 'react-icons/go';

export default function AdminIndexPage() {
    const { campaigns } = usePage<{ campaigns: Campaign[] }>().props;

    return (
        <AppLayout>
            <div className='mb-6 flex flex-col gap-3 pb-4 sm:flex-row sm:items-center sm:justify-between'>
                <div>
                    <h1 className='text-xl font-semibold text-default'>
                        Campaigns
                    </h1>
                    <p className='mt-1 text-sm text-secondary'>
                        Manage and track all your campaigns in one place
                    </p>
                </div>
                <NewCampaign />
            </div>
            {campaigns.length !== 0 ? (
                <Table>
                    <Table.Head>
                        <Table.Row>
                            <Table.HeaderCell>Title</Table.HeaderCell>
                            <Table.HeaderCell>Active From</Table.HeaderCell>
                            <Table.HeaderCell>
                                Points per Voucher
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                Amount for Point
                            </Table.HeaderCell>
                            <Table.HeaderCell>Duration</Table.HeaderCell>
                            <Table.HeaderCell>End Date</Table.HeaderCell>
                        </Table.Row>
                    </Table.Head>
                    <tbody>
                        {campaigns.map((c) => (
                            <Table.Row key={c.id}>
                                <Table.Cell>
                                    <Link href={`admin/${c.id}`}>{c.name}</Link>
                                </Table.Cell>
                                <Table.Cell>
                                    {format(
                                        parseISO(c.start_date),
                                        'd MMM yyyy',
                                    )}
                                </Table.Cell>
                                <Table.Cell>
                                    {c.min_points_per_voucher}
                                </Table.Cell>
                                <Table.Cell>
                                    {new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                        // @ts-expect-error
                                    }).format(c.min_spend_for_point)}
                                </Table.Cell>
                                <Table.Cell>
                                    {
                                        intervalToDuration({
                                            start: parseISO(c.start_date),
                                            end: parseISO(c.end_date),
                                        }).days
                                    }{' '}
                                    days
                                </Table.Cell>
                                <Table.Cell>
                                    {format(parseISO(c.end_date), 'd MMM yyyy')}
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <EmptyState />
            )}
        </AppLayout>
    );
}

function EmptyState() {
    return (
        <div className='flex min-h-[60vh] items-center justify-center'>
            <div className='text-center'>
                <GoGift className='mx-auto size-12 text-icon-secondary' />

                <h3 className='mt-2 text-sm font-semibold text-gray-900'>
                    No campaigns
                </h3>
                <p className='mt-1 text-sm text-default'>
                    Get started by creating a new campaign.
                </p>
                <div className='mt-6'>
                    <NewCampaign />
                </div>
            </div>
        </div>
    );
}

function NewCampaign() {
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [open, setOpen] = useState(false);

    const {
        auth: { user },
    } = usePage<SharedData>().props;

    const onChange = (dates: [Date | null, Date | null]) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
            title='Create Campaign'
            footerButtons={[
                {
                    content: 'Cancel',
                    buttonTheme: 'quaternary',
                },
                {
                    form: 'add-campaign',
                    type: 'submit',
                    content: 'Create',
                },
            ]}
            size='xl'
        >
            <Dialog.Trigger asChild>
                <Button
                    leftSlot={<GoPlus className='size-4' />}
                    onClick={() => setOpen(true)}
                >
                    New Campaign
                </Button>
            </Dialog.Trigger>
            <Dialog.Content className='overflow-visible'>
                <Form
                    id='add-campaign'
                    className='space-y-6'
                    method='post'
                    action={route('campaigns.store')}
                    resetOnSuccess={[
                        'name',
                        'min_points_per_voucher',
                        'min_spend_for_point',
                        'duration',
                    ]}
                    transform={(data: Record<string, any>) => {
                        const campaign = {
                            ...data,
                            start_date: startDate,
                            end_date: endDate,
                            company_id: user.company_id,
                            status: 'active',
                        };

                        return campaign;
                    }}
                    onSuccess={() => setOpen(false)}
                >
                    {({ errors }) => (
                        <>
                            <div className='grid grid-cols-1 gap-x-6 sm:grid-cols-6'>
                                <div className='col-span-3'>
                                    <label
                                        htmlFor='name'
                                        className='block text-sm leading-6 font-medium text-default'
                                    >
                                        Title
                                    </label>
                                    <Input
                                        className='mt-1.5'
                                        id='name'
                                        name='name'
                                        required
                                    />
                                </div>
                                <div className='col-span-3'>
                                    <label
                                        htmlFor='min_spend_for_point'
                                        className='block text-sm leading-6 font-medium text-default'
                                    >
                                        Amount per Point
                                    </label>
                                    <Input
                                        className='mt-1.5'
                                        id='min_spend_for_point'
                                        name='min_spend_for_point'
                                        type='number'
                                        step='0.01'
                                        required
                                    />
                                </div>
                            </div>
                            <div className='grid grid-cols-1 gap-x-6 sm:grid-cols-6'>
                                <div className='col-span-3'>
                                    <label
                                        htmlFor='min_points_per_voucher'
                                        className='block text-sm leading-6 font-medium text-default'
                                    >
                                        Points per Voucher
                                    </label>
                                    <Input
                                        className='mt-1.5'
                                        id='min_points_per_voucher'
                                        name='min_points_per_voucher'
                                        type='number'
                                        required
                                    />
                                    {Object.keys(errors).length > 0 && (
                                        <InlineMessage variant='critical'>
                                            {Object.values(errors)[0]}
                                        </InlineMessage>
                                    )}
                                </div>
                                <div className='col-span-3'>
                                    <label className='block text-sm leading-6 font-medium text-default'>
                                        Duration
                                    </label>
                                    <DatePicker
                                        id='duration'
                                        name='duration'
                                        startDate={startDate}
                                        endDate={endDate}
                                        popperClassName='z-[9999]'
                                        calendarClassName='z-[999] text-default'
                                        selectsRange={true}
                                        onChange={onChange}
                                        wrapperClassName='w-full'
                                        className='mt-1.5 h-9 w-full rounded-md border border-default bg-default px-4 text-sm text-default outline-none placeholder:text-icon-quaternary'
                                        placeholderText='Select date range'
                                    />
                                </div>
                            </div>
                        </>
                    )}
                </Form>
            </Dialog.Content>
        </Dialog>
    );
}
