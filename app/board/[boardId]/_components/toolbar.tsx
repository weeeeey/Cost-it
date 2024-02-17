import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';
import { ToolButton } from './tool-button';
import {
    Circle,
    MousePointer2,
    Pencil,
    Redo2,
    Square,
    StickyNote,
    Type,
    Undo2,
} from 'lucide-react';

export const Toolbar = () => {
    return (
        <div className="absolute top-48 left-2 flex flex-col gap-y-4">
            <div className=" bg-white rounded-md p-1.5 gap-y-1 flex-col flex items-center shadow-md">
                <div></div>
                <ToolButton
                    label="Select"
                    icon={MousePointer2}
                    isActive={false}
                    isDisabled={false}
                    onClick={() => {}}
                />
                <ToolButton
                    label="Text"
                    icon={Type}
                    isActive={false}
                    isDisabled={false}
                    onClick={() => {}}
                />
                <ToolButton
                    label="Sticky note"
                    icon={StickyNote}
                    isActive={false}
                    isDisabled={false}
                    onClick={() => {}}
                />
                <ToolButton
                    label="Rectangle"
                    icon={Square}
                    isActive={false}
                    isDisabled={false}
                    onClick={() => {}}
                />
                <ToolButton
                    label="Ellipse"
                    icon={Circle}
                    isActive={false}
                    isDisabled={false}
                    onClick={() => {}}
                />
                <ToolButton
                    label="Pen"
                    icon={Pencil}
                    isActive={false}
                    isDisabled={false}
                    onClick={() => {}}
                />
            </div>
            <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md">
                <ToolButton
                    label="Undo"
                    icon={Undo2}
                    isActive={false}
                    isDisabled={false}
                    onClick={() => {}}
                />
                <ToolButton
                    label="Redo"
                    icon={Redo2}
                    isActive={false}
                    isDisabled={false}
                    onClick={() => {}}
                />
            </div>
        </div>
    );
};

export function ToolbarSkeleton() {
    return (
        <div className="absolute top-72 left-2 flex flex-col shadow-md rounded-md gap-y-4 bg-white h-[360px] w-[52px]">
            <Skeleton className="h-full w-full bg-muted-400" />
        </div>
    );
}
