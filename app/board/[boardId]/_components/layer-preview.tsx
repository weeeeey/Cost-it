'use client';
import { useStorage } from '@/liveblocks.config';
import { LayerType } from '@/types/type-canvas';
import React, { memo } from 'react';
import { Note } from './layer/note';
import { Rectangle } from './layer/rectangle';
import { Text } from './layer/text';
import { Ellipse } from './layer/ellipse';
import { Path } from './layer/path';
import { colorToCss } from '@/lib/utils';

interface LayerPreviewProps {
    id: string;
    onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
    selectionColor?: string;
}

export const LayerPreview = memo(
    ({ id, onLayerPointerDown, selectionColor }: LayerPreviewProps) => {
        const layer = useStorage((root) => root.layers.get(id));

        if (!layer) {
            return null;
        }

        switch (layer.type) {
            case LayerType.Path:
                return (
                    <Path
                        key={id}
                        fill={layer.fill ? colorToCss(layer.fill) : '#000'}
                        points={layer.points}
                        x={layer.x}
                        y={layer.y}
                    />
                );
            case LayerType.Note:
                return (
                    <Note
                        id={id}
                        layer={layer}
                        onPointerDown={onLayerPointerDown}
                        selectionColor={selectionColor}
                    />
                );

            case LayerType.Rectangle:
                return (
                    <Rectangle
                        id={id}
                        layer={layer}
                        onPointerDown={onLayerPointerDown}
                        selectionColor={selectionColor}
                    />
                );

            case LayerType.Text:
                return (
                    <Text
                        id={id}
                        layer={layer}
                        onPointerDown={onLayerPointerDown}
                        selectionColor={selectionColor}
                    />
                );

            case LayerType.Ellipse:
                return (
                    <Ellipse
                        id={id}
                        layer={layer}
                        onPointerDown={onLayerPointerDown}
                        selectionColor={selectionColor}
                    />
                );

            default:
                return null;
        }
    }
);

LayerPreview.displayName = 'LayerPreview';
