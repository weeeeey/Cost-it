import { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu';
import React, { ReactNode } from 'react';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from './ui/dropdown-menu';
import { Link2, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import useApiMutation from '@/hooks/use-api-mutation';
import { api } from '@/convex/_generated/api';
import { ConfirmModal } from './confirm-modal';
import { Button } from './ui/button';
import { useRenameModal } from '@/store/use-rename-modal';
import { useRouter } from 'next/navigation';

interface ActionsProps {
    children: ReactNode;
    side?: DropdownMenuContentProps['side'];
    sideOffset?: DropdownMenuContentProps['sideOffset'];
    id: string;
    title: string;
}

export const Actions = ({
    children,
    id,
    title,
    side,
    sideOffset,
}: ActionsProps) => {
    const { onOpen } = useRenameModal();
    const { mutate, pending } = useApiMutation(api.board.remove);
    const router = useRouter();

    const onCopyLink = () => {
        navigator.clipboard
            .writeText(`${window.location.origin}/board/${id}`)
            .then(() => toast.success('Copied link'))
            .catch(() => toast.error('failed copy link'));
    };
    const onDelete = () => {
        mutate({ id })
            .then(() => {
                toast.success('Board deleted');
                router.push('/');
            })
            .catch(() => toast.error('failed to delete board'));
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-60 "
                side={side}
                onClick={(e) => {
                    e.preventDefault();
                }}
                sideOffset={sideOffset}
            >
                <DropdownMenuItem
                    onClick={onCopyLink}
                    className="p-3 cursor-pointer"
                >
                    <Link2 className="h-4 w-4 mr-2" />
                    Copy board link
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => onOpen(id, title)}
                    className="p-3 cursor-pointer"
                >
                    <Pencil className="h-4 w-4 mr-2" />
                    Rename a title
                </DropdownMenuItem>
                <ConfirmModal
                    header="Delete board?"
                    onConfirm={onDelete}
                    description="This will delete the board and all of its contents"
                    disabled={pending}
                >
                    <Button
                        variant="ghost"
                        className="p-3 text-sm w-full  justify-start font-normal "
                    >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete board
                    </Button>
                </ConfirmModal>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
