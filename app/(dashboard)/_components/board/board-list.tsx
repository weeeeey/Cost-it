'use client';

import React from 'react';
import { EmptySearch } from '../empty/empty-search';
import { EmptyFavorites } from '../empty/empty-favorites';
import { EmptyBoard } from '../empty/empty-board';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import BoardCard from './board-card';
import { Id } from '@/convex/_generated/dataModel';
import { BoardNewButton } from './board-new-button';
import { BoardSkeleton } from './board-skeleton';

interface BoardListProps {
    orgId: string;
    query: {
        search?: string;
        favorites?: string;
    };
}

export interface BoardType {
    _id: Id<'boards'>;

    _creationTime: number;
    title: string;
    orgId: string;
    authorId: string;
    authorName: string;
    imageUrl: string;
}

export const BoardList = ({ orgId, query }: BoardListProps) => {
    const data: BoardType[] | undefined = useQuery(api.boards.get, { orgId }); //Change to API call
    if (data === undefined) {
        return (
            <div>
                <h2 className="text-3xl">
                    {query.favorites ? 'Favorite boards' : 'Team boards'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
                    <BoardNewButton orgId={orgId} disabled />
                    <BoardSkeleton />
                    <BoardSkeleton />
                    <BoardSkeleton />
                </div>
            </div>
        );
    }

    if (!data?.length && query.search) {
        return <EmptySearch />;
    }
    if (!data?.length && query.favorites) {
        return <EmptyFavorites />;
    }
    if (!data?.length) {
        return <EmptyBoard />;
    }

    return (
        <div>
            <h2 className="text-3xl">
                {query.favorites ? 'Favorite boards' : 'Team boards'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
                <BoardNewButton orgId={orgId} />
                {data.map((board) => (
                    <BoardCard
                        key={board.orgId}
                        authorId={board.authorId}
                        orgId={board.orgId}
                        authorName={board.authorName}
                        imageUrl={board.imageUrl}
                        title={board.title}
                        id={board._id}
                        createdAt={board._creationTime}
                        isFavorite={false}
                    />
                ))}
            </div>
        </div>
    );
};
