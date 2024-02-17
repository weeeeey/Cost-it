import { Loader } from 'lucide-react';
import React from 'react';
import { InfoSkeleton } from './info';
import { ParticipantSkeleton } from './participants';
import { ToolbarSkeleton } from './toolbar';

export const BoardIdLoading = () => {
    return (
        <div className="h-full w-full relative bg-neutral-100 touch-none flex justify-center items-center">
            <Loader className="w-6 h-6 text-muted-foreground animate-spin " />
            <InfoSkeleton />
            <ParticipantSkeleton />
            <ToolbarSkeleton />
        </div>
    );
};
