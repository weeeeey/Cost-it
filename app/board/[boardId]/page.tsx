import React from 'react';
import { Canvas } from './_components/canvas';

interface BoardIdProps {
    params: {
        boardId: string;
    };
}

const BoardIdPage = ({ params }: BoardIdProps) => {
    return (
        <div>
            <Canvas boardId={params.boardId} />
        </div>
    );
};

export default BoardIdPage;
