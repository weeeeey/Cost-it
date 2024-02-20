import Image from 'next/image';
import React from 'react';

export const Loading = () => {
    return (
        <div className="bg-stone-200 h-full w-full flex flex-col justify-center items-center">
            <Image
                src="/logo.png"
                alt="logo"
                width={120}
                height={120}
                className="animate-pulse duration-700 rounded-full"
            />
        </div>
    );
};
