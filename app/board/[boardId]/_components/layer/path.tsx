import { LayerType, PathLayer } from '@/types/type-canvas';
import React from 'react';

interface PathProps {
    id: string;
    layer: PathLayer;
    onPointerDown: (e: React.PointerEvent, layerId: string) => void;
    selectionColor?: string;
}

export const Path = ({
    id,
    layer,
    onPointerDown,
    selectionColor,
}: PathProps) => {
    return <div>Path</div>;
};
