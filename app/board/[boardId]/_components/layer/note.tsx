'use client';
import { cn, colorToCss, getContrastingTextColor } from '@/lib/utils';
import { useHistory, useMutation } from '@/liveblocks.config';
import { NoteLayer } from '@/types/type-canvas';
import { Kalam } from 'next/font/google';
import { useEffect, useRef, useState } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';

const font = Kalam({
    subsets: ['latin'],
    weight: ['400'],
});

interface NoteProps {
    id: string;
    layer: NoteLayer;
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

    const noteRef = useRef<HTMLDivElement>(null);

    const [contentValue, setContentValue] = useState<string>(value || 'Text');

    const updateValue = useMutation(({ storage }, newValue: string) => {
        const liveLayers = storage.get('layers');

        liveLayers.get(id)?.set('value', newValue);
    }, []);

    const handleContentChange = (e: ContentEditableEvent) => {
        setContentValue(e.target.value);
        updateValue(e.target.value);
    };

    useEffect(() => {
        const keyHandler = (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                if (e.shiftKey) {
                    return;
                }
                e.preventDefault();
                noteRef.current?.blur();
            }
        };
        document.addEventListener('keydown', keyHandler);
        return () => {
            document.removeEventListener('keydown', keyHandler);
        };
    }, []);

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
                    innerRef={noteRef}
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
