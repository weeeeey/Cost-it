import React from 'react';
import { Canvas } from './_components/canvas';
import { Room } from '@/components/room';
import { BoardIdLoading } from './_components/boardId-loading';

interface BoardIdProps {
    params: {
        boardId: string;
    };
}

const BoardIdPage = ({ params }: BoardIdProps) => {
    return (
        <Room roomId={params.boardId} fallback={<BoardIdLoading />}>
            <Canvas boardId={params.boardId} />
        </Room>
    );
};

export default BoardIdPage;
