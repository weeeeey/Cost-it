import { colorToCss } from '@/lib/utils';
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
    const { fill, height, type, width, x, y, value } = layer;

    return (
        <text
            x={0}
            y={0}
            fill={fill ? colorToCss(fill) : '#000'}
            font-size="100"
            font-family="'Leckerli One', cursive"
            width={width}
            height={height}
            style={{
                transform: `translate(${x}px, ${y}px)`,
            }}
        >
            {value}asdsdsds
        </text>
    );
};
