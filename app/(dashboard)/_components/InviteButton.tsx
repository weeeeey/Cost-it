import { Button } from '@/components/ui/button';
import { OrganizationProfile } from '@clerk/clerk-react';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';

const InviteButton = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Invite members
                </Button>
            </DialogTrigger>
            <DialogContent className="p-0 bg-transparent border-none flex justify-center items-center">
                <OrganizationProfile />
            </DialogContent>
        </Dialog>
    );
};

export default InviteButton;
