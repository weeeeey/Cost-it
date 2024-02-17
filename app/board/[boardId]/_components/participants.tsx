'use client';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';
import { UserAvatar } from './user-avatar';
import { useOthers, useSelf } from '@/liveblocks.config';
import { connectionIdToColor } from '@/lib/utils';

const MAX_SHOWN_OTHER_USERS = 2;

export const Participants = () => {
    const otherUsers = useOthers();
    const currentUser = useSelf();
    const hasMoreUsers = otherUsers.length > MAX_SHOWN_OTHER_USERS;

    return (
        <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md">
            <div className="flex gap-x-2">
                {otherUsers
                    .slice(0, MAX_SHOWN_OTHER_USERS)
                    .map(({ connectionId, info }) => {
                        return (
                            <UserAvatar
                                borderColor={connectionIdToColor(connectionId)}
                                key={connectionId}
                                src={info?.picture}
                                name={info?.name}
                                fallback={info?.name?.[0] || 'T'}
                            />
                        );
                    })}
                {currentUser && (
                    <UserAvatar
                        borderColor={connectionIdToColor(
                            currentUser.connectionId
                        )}
                        src={currentUser.info?.picture}
                        name={`${currentUser.info?.name}(You)`}
                        fallback={currentUser.info?.name?.[0]}
                    />
                )}
                {hasMoreUsers && (
                    <UserAvatar
                        name={`${
                            otherUsers.length - MAX_SHOWN_OTHER_USERS
                        } more`}
                        fallback={`+${
                            otherUsers.length - MAX_SHOWN_OTHER_USERS
                        }`}
                    />
                )}
            </div>
        </div>
    );
};

export function ParticipantSkeleton() {
    return (
        <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md w-[100px]">
            <Skeleton className="h-full w-full bg-muted-400" />
        </div>
    );
}