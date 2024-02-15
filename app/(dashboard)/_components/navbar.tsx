'use client';
import { UserButton } from '@clerk/clerk-react';
import React from 'react';

export const Navbar = () => {
    return (
        <div className="flex items-center bg-green-300 gap-x-4 p-5">
            <div className="hidden lg:flex lg:flex-1 bg-yellow-300">
                SearchBar
            </div>

            <UserButton />
        </div>
    );
};
