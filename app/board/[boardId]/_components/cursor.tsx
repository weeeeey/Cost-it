import { connectionIdToColor } from '@/lib/utils';
import { useOther } from '@/liveblocks.config';
import { MousePointer2 } from 'lucide-react';
import React, { memo } from 'react';

interface CursorProps {
    connectionId: number;
}

export const Cursor = memo(({ connectionId }: CursorProps) => {
    const info = useOther(connectionId, (user) => user?.info);
    const cursor = useOther(connectionId, (user) => user?.presence.cursor); //liveblock config에서 수정해서 값 얻어오기
    const name = info?.name || 'Teammate';

    if (!cursor) {
        return null;
    }
    const { x, y } = cursor;

    return (
        <foreignObject
            style={{
                transform: `translateX(${x}px) translateY(${y}px)`,
            }}
            height={50}
            width={name.length * 10 * 24}
            className="relative drop-shadow-md"
        >
            <MousePointer2
                className="w-5 h-5"
                style={{
                    fill: connectionIdToColor(connectionId),
                    color: connectionIdToColor(connectionId),
                }}
            />
            <div
                style={{ backgroundColor: connectionIdToColor(connectionId) }}
                className="absolute top-3 left-5 text-white px-1.5 py-0.5 rounded-md text-sm font-semibold"
            >
                {name}
            </div>
        </foreignObject>
    );
});

Cursor.displayName = 'Cursor';
