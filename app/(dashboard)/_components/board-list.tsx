import React from 'react';
import { EmptySearch } from './empty/empty-search';
import { EmptyFavorites } from './empty/empty-favorites';
import { EmptyBoard } from './empty/empty-board';

interface BoardListProps {
    orgId: string;
    query: {
        search?: string;
        favorites?: string;
    };
}

export const BoardList = ({ orgId, query }: BoardListProps) => {
    const data = []; //Change to API call

    if (!data?.length && query.search) {
        return <EmptySearch />;
    }
    if (!data?.length && query.favorites) {
        return <EmptyFavorites />;
    }
    if (!data?.length) {
        return <EmptyBoard />;
    }

    return <div>BoardList</div>;
};
