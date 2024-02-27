import React from 'react';

interface RoomProps {
    children: React.ReactNode;
    videoId: string;
}

export const Room = ({ children, videoId }: RoomProps) => {
    return (
        <div className="h-full bg-red-400  grid  md:grid-flow-col  ">
            {children}
        </div>
    );
};
