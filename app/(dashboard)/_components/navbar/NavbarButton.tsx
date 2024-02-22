import { Button } from '@/components/ui/button';
import { OrganizationProfile } from '@clerk/clerk-react';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Trash2, UserPlus } from 'lucide-react';
import { ConfirmModal } from '@/components/confirm-modal';
import { api } from '@/convex/_generated/api';

import useApiMutation from '@/hooks/use-api-mutation';
import { Hint } from '@/components/hint';

interface InviteButtonProps {
    orgId: string;
}

const NavbarButton = ({ orgId }: InviteButtonProps) => {
    const { mutate, pending } = useApiMutation(api.boards.allDelete);
    const handleDeleteAll = () => {
        try {
            mutate({ orgId });
        } catch (error) {}
    };
    return (
        <>
            {/* delete all */}
            <ConfirmModal
                header="Delete all boards"
                description="Are you sure you want to delete all boards?"
                onConfirm={handleDeleteAll}
                disabled={pending}
            >
                <Hint label="Delete boards" side="bottom" sideOffset={10}>
                    <Button variant="outline">
                        <Trash2 className="h-5 w-5 " />
                    </Button>
                </Hint>
            </ConfirmModal>
            {/* invite */}
            <Dialog>
                <DialogTrigger>
                    <Hint label="Invite member" side="bottom" sideOffset={10}>
                        <Button variant="outline">
                            <UserPlus className="h-5 w-5 " />
                        </Button>
                    </Hint>
                </DialogTrigger>
                <DialogContent className="p-0 bg-transparent border-none flex justify-center items-center">
                    <OrganizationProfile />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default NavbarButton;