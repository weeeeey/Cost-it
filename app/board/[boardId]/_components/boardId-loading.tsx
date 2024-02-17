import { Loader } from 'lucide-react';
import React from 'react';
import { Info } from './info';
import { Participants } from './participants';
import { Toolbar } from './toolbar';

export const BoardIdLoading = () => {
    return (
        <div className="h-full w-full relative bg-neutral-100 touch-none flex justify-center items-center">
            <Loader className="w-6 h-6 text-muted-foreground animate-spin " />
            <Info.Skeleton />
            <Participants.Skeleton />
            <Toolbar.Skeleton />
        </div>
    );
};
