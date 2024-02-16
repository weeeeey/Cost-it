'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

import { CreateOrganization } from '@clerk/clerk-react';
import Image from 'next/image';
import React from 'react';

export const EmptyOrg = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center ">
            <Image height={200} width={200} src="/elements.svg" alt="empty" />
            <h2 className="text-2xl font-semibold mt-6">Welcome to Board</h2>
            <p className="text-muted-foreground text-sm mt-2 mb-6">
                Create an organization to get started
            </p>
            <Dialog>
                <DialogTrigger asChild>
                    <Button size="lg">Create an organization</Button>
                </DialogTrigger>
                <DialogContent className="flex justify-center items-center border-none bg-transparent p-0">
                    <CreateOrganization />
                </DialogContent>
            </Dialog>
        </div>
    );
};
