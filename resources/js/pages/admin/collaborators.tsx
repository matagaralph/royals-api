import { Button } from '@/components/ui/button';
import Dialog from '@/components/ui/dialog';
import { InlineMessage } from '@/components/ui/inline-message';
import { Input } from '@/components/ui/input';
import Table from '@/components/ui/table';
import AppLayout from '@/layouts/app';
import { Form, usePage } from '@inertiajs/react';

export default function Collaborators() {
    const { collaborators } = usePage<{
        collaborators: User[];
    }>().props;

    return (
        <AppLayout>
            <div className='pt-6'>
                <AddCollaborator />
                <Table>
                    <Table.Head>
                        <Table.Row>
                            <Table.HeaderCell>Collaborator</Table.HeaderCell>
                            <Table.HeaderCell>Email</Table.HeaderCell>
                            <Table.HeaderCell>Role</Table.HeaderCell>
                        </Table.Row>
                    </Table.Head>
                    <tbody>
                        {collaborators.map((c) => (
                            <Table.Row key={c.id}>
                                <Table.Cell>{c.name}</Table.Cell>
                                <Table.Cell>{c.email}</Table.Cell>
                                <Table.Cell>{c.role}</Table.Cell>
                            </Table.Row>
                        ))}
                    </tbody>
                </Table>
            </div>
        </AppLayout>
    );
}

function AddCollaborator() {
    return (
        <>
            <Dialog
                footerButtons={[
                    {
                        type: 'submit',
                        content: 'Submit',
                        form: 'new-collaborator',
                    },
                ]}
                title='New Collaborator'
            >
                <Dialog.Trigger asChild>
                    <Button theme='secondary' className='mb-6'>
                        Add Collaborator
                    </Button>
                </Dialog.Trigger>
                <Dialog.Content>
                    <Form
                        id='new-collaborator'
                        className='space-y-6'
                        method='post'
                        action={route('collaborator.store')}
                    >
                        {({ errors }) => (
                            <>
                                <div>
                                    <label
                                        htmlFor='email'
                                        className='block text-sm leading-6 font-medium text-default'
                                    >
                                        Email address
                                    </label>
                                    <Input
                                        type='email'
                                        id='email'
                                        name='email'
                                        required
                                        className='mt-1.5'
                                        placeholder='email@company.com'
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor='role'
                                        className='block text-sm leading-6 font-medium text-default'
                                    >
                                        Role
                                    </label>
                                    <Input
                                        id='role'
                                        name='role'
                                        className='mt-1.5 text-secondary'
                                        value='Issuer'
                                        disabled
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
        </>
    );
}
