'use client';
import { cn, colorToCss, getContrastingTextColor } from '@/lib/utils';
import { useHistory, useMutation } from '@/liveblocks.config';
import { TextLayer } from '@/types/type-canvas';
import { Kalam } from 'next/font/google';
import { useEffect, useRef, useState } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';

const font = Kalam({
    subsets: ['latin'],
    weight: ['400'],
});

interface NoteProps {
    id: string;
    layer: TextLayer;
    onPointerDown: (e: React.PointerEvent, layerId: string) => void;
    selectionColor?: string;
}
export const Note = ({
    id,
    layer,
    onPointerDown,
    selectionColor,
}: NoteProps) => {
    const { fill, height, width, x, y, value } = layer;

    const [contentValue, setContentValue] = useState<string>(value || 'Text');

    const history = useHistory();

    const updateValue = useMutation(({ storage }, newValue: string) => {
        const liveLayers = storage.get('layers');
        if (newValue === '') {
            liveLayers.delete(id);
        } else {
            liveLayers.get(id)?.set('value', newValue);
        }
    }, []);

    const handleContentChange = (e: ContentEditableEvent) => {
        setContentValue(e.target.value);
    };

    const onLayerBlur = useMutation(
        ({ setMyPresence }) => {
            history.pause();

            setMyPresence({ selection: [] }, { addToHistory: false });
        },
        [history]
    );

    useEffect(() => {
        const enterKeyHandler = (e: KeyboardEvent) => {
            if (e.key === 'Enter' && contentValue !== undefined) {
                if (e.shiftKey) {
                    return;
                }
                e.preventDefault();
                updateValue(contentValue);
                onLayerBlur();
            }
        };
        document.addEventListener('keydown', enterKeyHandler);
        return () => {
            document.removeEventListener('keydown', enterKeyHandler);
        };
    }, [contentValue, updateValue, onLayerBlur]);

    return (
        <>
            <foreignObject
                x={x}
                y={y}
                width={width}
                height={height}
                onPointerDown={(e) => onPointerDown(e, id)}
                style={{
                    backgroundColor: fill ? colorToCss(fill) : '#fff',
                    outline: selectionColor
                        ? `1px solid ${selectionColor}`
                        : 'none',
                }}
            >
                <ContentEditable
                    html={contentValue}
                    onChange={handleContentChange}
                    style={{
                        fontSize: 32,
                        color: fill ? getContrastingTextColor(fill) : '#000',
                    }}
                    className={cn(
                        'h-full w-full outline-none drop-shadow-md flex items-center justify-center text-center',
                        font.className
                    )}
                />
            </foreignObject>
        </>
    );
};
