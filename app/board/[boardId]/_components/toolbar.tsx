import React from 'react';

export const Toolbar = () => {
    return (
        <div className="absolute top-72 left-2 flex flex-col gap-y-4">
            <div className=" bg-white rounded-md p-1.5 gap-y-1 flex-col flex items-center shadow-md">
                <div>pencil</div>
                <div>pencil</div>
                <div>pencil</div>
                <div>pencil</div>
            </div>
            <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md">
                <div>Undo</div>
                <div>Redo</div>
            </div>
        </div>
    );
};
