import { Divider } from '@/components/divider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DescriptionDetails,
    DescriptionList,
    DescriptionTerm,
} from '@/components/ui/description-list';
import Dialog from '@/components/ui/dialog';
import { Heading, Subheading } from '@/components/ui/heading';
import { InlineMessage } from '@/components/ui/inline-message';
import { Input } from '@/components/ui/input';
import { Link } from '@/components/ui/link';
import AppLayout from '@/layouts/app';
import { Form, usePage } from '@inertiajs/react';
import { format, intervalToDuration, parseISO } from 'date-fns';
import { useState } from 'react';
import { GoCalendar, GoChevronLeft, GoCreditCard } from 'react-icons/go';

export default function CampaignPage() {
    const { campaign } = usePage<{
        campaign: Campaign & {
            total_rewards: number;
            total_vouchers: number;
            users_participating: number;
        };
    }>().props;
    console.log(campaign);
    return (
        <AppLayout>
            <div className='max-lg:hidden'>
                <Link
                    href='/admin'
                    className='inline-flex items-center gap-2 text-sm/6 text-tertiary'
                >
                    <GoChevronLeft className='!size-4 fill-icon-default' />
                    Campaigns
                </Link>
            </div>
            <div className='mt-4 lg:mt-8'>
                <div className='flex items-center gap-4'>
                    <Heading>#{campaign.id.slice(0, 7)}</Heading>
                    {campaign.status === 'active' ? (
                        <Badge color='lime'>Active</Badge>
                    ) : (
                        <Badge color='red'>Inactive</Badge>
                    )}
                </div>
                <div className='isolate mt-2.5 flex flex-wrap justify-between gap-x-6 gap-y-4'>
                    <div className='flex flex-wrap gap-x-10 gap-y-4 py-1.5'>
                        <span className='flex items-center gap-3 text-base/6 text-slate-950 sm:text-sm/6'>
                            <GoCalendar className='h-4 w-4 flex-shrink-0 fill-icon-default' />
                            <span>
                                {format(
                                    parseISO(campaign.start_date),
                                    'yyyy-MM-dd',
                                )}
                            </span>
                        </span>

                        <span className='flex items-center gap-3 text-base/6 text-slate-950 sm:text-sm/6'>
                            <GoCalendar className='h-4 w-4 flex-shrink-0 fill-icon-default' />
                            <span className='inline-flex gap-3'>
                                {format(
                                    parseISO(campaign.end_date),
                                    'yyyy-MM-dd',
                                )}
                            </span>
                        </span>

                        <span className='flex items-center gap-3 text-base/6 text-slate-950 sm:text-sm/6'>
                            <GoCreditCard className='h-4 w-4 flex-shrink-0 fill-icon-default' />
                            <span>${campaign.min_spend_for_point}</span>
                        </span>
                    </div>

                    <div className='flex items-center gap-4'>
                        <Button
                            theme='secondary'
                            href={`/admin/vouchers/create?campaign=${campaign.id}`}
                        >
                            Issue Voucher
                        </Button>
                        <AddReward campaign={campaign} />
                    </div>
                </div>
                <div className='mt-12'>
                    <Subheading>Summary</Subheading>
                    <Divider className='mt-4' />
                    <DescriptionList>
                        <DescriptionTerm>Title</DescriptionTerm>
                        <DescriptionDetails>{campaign.name}</DescriptionDetails>
                        <DescriptionTerm>Description</DescriptionTerm>
                        <DescriptionDetails>
                            {campaign.description || 'No description'}
                        </DescriptionDetails>
                        <DescriptionTerm>Points per Voucher</DescriptionTerm>
                        <DescriptionDetails>
                            {campaign.min_points_per_voucher}
                        </DescriptionDetails>
                        <DescriptionTerm>Duration</DescriptionTerm>
                        <DescriptionDetails>
                            {
                                intervalToDuration({
                                    start: parseISO(campaign.start_date),
                                    end: parseISO(campaign.end_date),
                                }).days
                            }
                            <span className='mx-0.5'>days</span>
                        </DescriptionDetails>
                    </DescriptionList>
                </div>
                <div className='mt-12'>
                    <Subheading>Metrics</Subheading>
                    <Divider className='mt-4' />
                    <DescriptionList>
                        <DescriptionTerm>Participating users</DescriptionTerm>
                        <DescriptionDetails>
                            {campaign.users_participating}
                        </DescriptionDetails>
                        <DescriptionTerm>Campaign Rewards</DescriptionTerm>
                        <DescriptionDetails>
                            {campaign.total_rewards}
                        </DescriptionDetails>
                        <DescriptionTerm>Vouchers</DescriptionTerm>
                        <DescriptionDetails>
                            {campaign.total_vouchers}
                        </DescriptionDetails>
                    </DescriptionList>
                </div>
            </div>
        </AppLayout>
    );
}

function AddReward({ campaign }: { campaign: Campaign }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Dialog
            open={isOpen}
            onOpenChange={setIsOpen}
            title='Create Reward'
            footerButtons={[
                {
                    content: 'Cancel',
                    buttonTheme: 'quaternary',
                    onClick: () => setIsOpen(false),
                },
                {
                    form: 'add-reward',
                    type: 'submit',
                    content: 'Submit',
                },
            ]}
            size='xl'
        >
            <Dialog.Trigger>
                <Button onClick={() => setIsOpen(true)}>Add Reward</Button>
            </Dialog.Trigger>
            <Dialog.Content>
                <Form
                    id='add-reward'
                    method='post'
                    action={route('rewards.store', { campaign: campaign.id })}
                    resetOnSuccess={['title', 'points_required']}
                    className='space-y-6'
                    onSuccess={() => setIsOpen(false)}
                >
                    {({ errors }) => (
                        <>
                            <div>
                                <label
                                    htmlFor='title'
                                    className='block text-sm leading-6 font-medium text-default'
                                >
                                    Title
                                </label>
                                <Input
                                    className='mt-1.5'
                                    id='title'
                                    name='title'
                                    placeholder='Early Bird Bonus'
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor='points-required'
                                    className='block text-sm leading-6 font-medium text-default'
                                >
                                    Points Required
                                </label>
                                <Input
                                    className='mt-1.5'
                                    id='points_required'
                                    name='points_required'
                                    type='number'
                                    required
                                />
                                {Object.keys(errors).length > 0 && (
                                    <InlineMessage variant='critical'>
                                        {Object.values(errors)[0]}
                                    </InlineMessage>
                                )}
                            </div>
                        </>
                    )}
                </Form>
            </Dialog.Content>
        </Dialog>
    );
}
