'use client';
import { useOrganizationList } from '@clerk/clerk-react';
import React from 'react';
import { OrgItem } from './org-item';

const OrgList = () => {
    const { userMemberships } = useOrganizationList({
        userMemberships: {
            infinite: true,
        },
    });

    if (!userMemberships.data?.length) return null;
    return (
        <ul className="space-y-4">
            {userMemberships.data?.map((member) => (
                <OrgItem
                    id={member.organization.id}
                    name={member.organization.name}
                    imageUrl={member.organization.imageUrl}
                    key={member.organization.id}
                />
            ))}
        </ul>
    );
};

export default OrgList;
