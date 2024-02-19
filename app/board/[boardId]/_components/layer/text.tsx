import { LayerType, TextLayer } from '@/types/type-canvas';
import React from 'react';

interface TextProps {
    id: string;
    layer: TextLayer;
    onPointerDown: (e: React.PointerEvent, layerId: string) => void;
    selectionColor?: string;
}
export const Text = ({
    id,
    layer,
    onPointerDown,
    selectionColor,
}: TextProps) => {
    return <div>Text</div>;
};
