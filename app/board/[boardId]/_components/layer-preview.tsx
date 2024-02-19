'use client';
import { useStorage } from '@/liveblocks.config';
import { LayerType } from '@/types/type-canvas';
import React, { memo } from 'react';
import { Note } from './layer/note';
import { Path } from './layer/path';
import { Rectangle } from './layer/rectangle';
import { Text } from './layer/text';
import { Ellipse } from './layer/ellipse';

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
            case LayerType.Note:
                return (
                    <Note
                        id={id}
                        layer={layer}
                        onPointerDown={onLayerPointerDown}
                        selectionColor={selectionColor}
                    />
                );

            case LayerType.Path:
                return (
                    <Path
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