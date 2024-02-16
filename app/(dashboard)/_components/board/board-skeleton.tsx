import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export const BoardSkeleton = () => {
    return (
        <div className="aspect-[100/127] rounded-lg overflow-hidden">
            <Skeleton className="h-full w-full" />
        </div>
    );
};
