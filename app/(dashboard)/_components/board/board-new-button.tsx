'use client';
import { api } from '@/convex/_generated/api';
import useApiMutation from '@/hooks/use-api-mutation';
import { cn } from '@/lib/utils';
import { useNewModal } from '@/store/use-new-modal';
import { useRenameModal } from '@/store/use-rename-modal';
import { useMutation } from 'convex/react';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

interface BoardNewButtonProps {
    orgId: string;
    disabled?: boolean;
}

export const BoardNewButton = ({ disabled, orgId }: BoardNewButtonProps) => {
    const { onOpen } = useNewModal();

    return (
        <button
            onClick={() => onOpen(orgId)}
            className={cn(
                'col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center py-6'
            )}
        >
            <div />
            <Plus className="h-12 w-12 text-white stroke-1" />
            <p className="text-sm text-white font-light">New board</p>
        </button>
    );
};
