import React from 'react';

interface BoardIdProps {
    params: {
        boardId: string;
    };
}

const BoardIdPage = ({ params }: BoardIdProps) => {
    return <div>{params.boardId}</div>;
};

export default BoardIdPage;
