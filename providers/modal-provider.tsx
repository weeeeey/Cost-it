'use client';

import { NewModal } from '@/components/modal/new-modal';
import { RenameModal } from '@/components/modal/rename-modal';
import React, { useEffect, useState } from 'react';

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);
    if (!isMounted) {
        return null;
    }

    return (
        <>
            {' '}
            <RenameModal />
            <NewModal />
        </>
    );
};
