'use client';
import { useOrganization } from '@clerk/clerk-react';
import { EmptyOrg } from './_components/empty/empty-org';
import { BoardList } from './_components/board/board-list';
import { useSearchParams } from 'next/navigation';

interface DashboardProps {
    searchParams: {
        search?: string;
        favorites?: string;
    };
}

const DashboardPage = () => {
    const { organization } = useOrganization();

    const search = useSearchParams();
    const searchParams = {
        search: search.get('search') || undefined,
        favorites: search.get('favorites') || undefined,
    };
    return (
        <div className=" flex-1 h-[calc(100%-80px)]">
            {!organization ? (
                <EmptyOrg />
            ) : (
                <BoardList orgId={organization.id} query={searchParams} />
            )}
        </div>
    );
};

export default DashboardPage;
