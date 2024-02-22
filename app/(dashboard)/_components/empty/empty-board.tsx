'use client';
import { Button } from '@/components/ui/button';
import { useNewModal } from '@/store/use-new-modal';
import { useOrganization } from '@clerk/clerk-react';

import Image from 'next/image';
import React from 'react';

export const EmptyBoard = () => {
    const { organization } = useOrganization();
    const { onOpen } = useNewModal();

    return (
        <div className="h-full flex flex-col items-center justify-center">
            <Image height={140} width={140} src="/note.svg" alt="empty" />
            <h2 className="text-2xl font-semibold mt-6">
                Create your first board!
            </h2>
            <p className="text-muted-foreground textg-sm mt-2">
                Start by creating a board for your organization
            </p>
            <div className="mt-6">
                <Button onClick={() => onOpen(organization!.id)} size="lg">
                    Create board
                </Button>
            </div>
        </div>
    );
};
