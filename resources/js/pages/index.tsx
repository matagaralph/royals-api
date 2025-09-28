import NavBar from '@/components/navbar';
import { Button } from '@/components/ui/button';
import Dropdown from '@/components/ui/dropdown';
import { BiAnalyse } from 'react-icons/bi';
import { FiLogOut } from 'react-icons/fi';

export default function IndexPage() {
    return (
        <>
            <NavBar />
            <div className='mx-auto max-w-7xl px-4 pt-8'>
                <Dropdown
                    trigger={
                        <Button className='hocus:outline-none'>Open</Button>
                    }
                >
                    <Dropdown.Item
                        label='Test'
                        Icon={BiAnalyse}
                        destructive
                        onSelect={() => console.log('Profile clicked')}
                    />
                    <Dropdown.Separator />
                    <Dropdown.Item
                        label='Sign Out'
                        Icon={FiLogOut}
                        destructive
                        onSelect={() => console.log('Profile clicked')}
                    />
                </Dropdown>
            </div>
        </>
    );
}
