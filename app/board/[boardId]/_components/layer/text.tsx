'use client';
import { cn, colorToCss } from '@/lib/utils';
import { useHistory, useMutation } from '@/liveblocks.config';
import { TextLayer } from '@/types/type-canvas';
import { Kalam } from 'next/font/google';
import { useEffect, useRef, useState } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';

const font = Kalam({
    subsets: ['latin'],
    weight: ['400'],
});

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
    const { fill, height, width, x, y, value } = layer;

    const contentRef = useRef<HTMLDivElement>(null);

    const [contentValue, setContentValue] = useState<string>(value || 'Text');

    const history = useHistory();

    const updateValue = useMutation(({ storage }, newValue: string) => {
        const liveLayers = storage.get('layers');

        liveLayers.get(id)?.set('value', newValue);
    }, []);

    const handleContentChange = (e: ContentEditableEvent) => {
        setContentValue(e.target.value);
        updateValue(e.target.value);
    };

    const onLayerBlur = useMutation(
        ({ storage, setMyPresence }) => {
            // history.redo();

            const liveLayers = storage.get('layers');
            const liveValue = liveLayers.get(id)?.get('value');
            if (liveValue === '') {
                const liveLayerIds = storage.get('layerIds');
                liveLayers.delete(id);
                const index = liveLayerIds.indexOf(id);
                if (index !== -1) {
                    liveLayerIds.delete(index);
                }
            }

            setMyPresence({ selection: [] }, { addToHistory: true });
        },
        [history, value, contentValue]
    );

    useEffect(() => {
        const keyHandler = (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                if (e.shiftKey) {
                    return;
                }
                e.preventDefault();
                contentRef.current?.blur();
                onLayerBlur();
            }
        };
        document.addEventListener('keydown', keyHandler);
        return () => {
            document.removeEventListener('keydown', keyHandler);
        };
    }, [onLayerBlur]);

    return (
        <foreignObject
            x={x}
            y={y}
            width={width}
            height={height}
            onPointerDown={(e) => onPointerDown(e, id)}
            style={{
                outline: selectionColor
                    ? `1px solid ${selectionColor}`
                    : 'none',
            }}
        >
            <ContentEditable
                innerRef={contentRef}
                html={contentValue}
                onChange={handleContentChange}
                // onBlur={onLayerBlur}
                style={{
                    fontSize: 32,
                    color: fill ? colorToCss(fill) : '#000',
                }}
                className={cn(
                    'h-full w-full outline-none drop-shadow-md flex items-center justify-center text-center',
                    font.className
                )}
            />
        </foreignObject>
    );
};
