'use client';
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
    Trash2,
    Type,
    Undo2,
} from 'lucide-react';
import { CanvasMode, CanvasState, LayerType } from '@/types/type-canvas';
import { useDleteAllLayers } from '@/hooks/use-delete-all-layers';
import { toast } from 'sonner';

interface ToolbarProps {
    canvasState: CanvasState;
    setCanvasState: (newState: CanvasState) => void;
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;
}

export const Toolbar = ({
    canRedo,
    canUndo,
    canvasState,
    redo,
    setCanvasState,
    undo,
}: ToolbarProps) => {
    const allDelete = useDleteAllLayers();

    const handleAllDelete = () => {
        try {
            setCanvasState({
                mode: CanvasMode.Delete,
            });
            if (window.confirm('Are you sure you want to delete all layers?')) {
                allDelete();
                toast.success('All layers have been deleted', {
                    duration: 2000,
                });
            } else {
                throw new Error('User canceled the operation');
            }
        } catch (error: any) {
            toast.error('Cancle delete', {
                duration: 2000,
            });
            console.log(error.message);
        } finally {
            setCanvasState({
                mode: CanvasMode.None,
            });
        }
    };

    return (
        <div className="absolute top-48 left-2 flex flex-col gap-y-4">
            <div className=" bg-white rounded-md p-1.5 gap-y-1 flex-col flex items-center shadow-md">
                <ToolButton
                    label="Select"
                    icon={MousePointer2}
                    isActive={
                        canvasState.mode === CanvasMode.None ||
                        canvasState.mode === CanvasMode.Translating ||
                        canvasState.mode === CanvasMode.SelectionNet ||
                        canvasState.mode === CanvasMode.Pressing ||
                        canvasState.mode === CanvasMode.Resizing
                    }
                    isDisabled={false}
                    onClick={() =>
                        setCanvasState({
                            mode: CanvasMode.None,
                        })
                    }
                />
                <ToolButton
                    label="Text ( press a Enter key to Store )"
                    icon={Type}
                    isActive={
                        canvasState.mode === CanvasMode.Inserting &&
                        canvasState.layerType === LayerType.Text
                    }
                    isDisabled={false}
                    onClick={() =>
                        setCanvasState({
                            mode: CanvasMode.Inserting,
                            layerType: LayerType.Text,
                        })
                    }
                />
                <ToolButton
                    label="Sticky note  ( press a Enter key to Store )"
                    icon={StickyNote}
                    isActive={
                        canvasState.mode === CanvasMode.Inserting &&
                        canvasState.layerType === LayerType.Note
                    }
                    isDisabled={false}
                    onClick={() =>
                        setCanvasState({
                            mode: CanvasMode.Inserting,
                            layerType: LayerType.Note,
                        })
                    }
                />
                <ToolButton
                    label="Rectangle"
                    icon={Square}
                    isActive={
                        canvasState.mode === CanvasMode.Inserting &&
                        canvasState.layerType === LayerType.Rectangle
                    }
                    isDisabled={false}
                    onClick={() =>
                        setCanvasState({
                            mode: CanvasMode.Inserting,
                            layerType: LayerType.Rectangle,
                        })
                    }
                />
                <ToolButton
                    label="Ellipse"
                    icon={Circle}
                    isActive={
                        canvasState.mode === CanvasMode.Inserting &&
                        canvasState.layerType === LayerType.Ellipse
                    }
                    isDisabled={false}
                    onClick={() =>
                        setCanvasState({
                            mode: CanvasMode.Inserting,
                            layerType: LayerType.Ellipse,
                        })
                    }
                />
                <ToolButton
                    label="Pen"
                    icon={Pencil}
                    isActive={canvasState.mode === CanvasMode.Pencil}
                    isDisabled={false}
                    onClick={() =>
                        setCanvasState({
                            mode: CanvasMode.Pencil,
                        })
                    }
                />
                <ToolButton
                    label="Delete"
                    icon={Trash2}
                    isActive={canvasState.mode === CanvasMode.Delete}
                    isDisabled={false}
                    onClick={handleAllDelete}
                />
            </div>
            <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md">
                <ToolButton
                    label="Undo"
                    icon={Undo2}
                    isDisabled={!canUndo}
                    onClick={undo}
                />
                <ToolButton
                    label="Redo"
                    icon={Redo2}
                    isDisabled={!canRedo}
                    onClick={redo}
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
