'use client';
import { useOrganization } from '@clerk/clerk-react';
import { EmptyOrg } from './_components/empty/empty-org';
import { BoardList } from './_components/board-list';

interface DashboardProps {
    searchParams: {
        search?: string;
        favorites?: string;
    };
}

const DashboardPage = ({ searchParams }: DashboardProps) => {
    const { organization } = useOrganization();
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
