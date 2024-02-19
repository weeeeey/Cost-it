import { getSvgPathFromStroke } from '@/lib/utils';
import getStroke from 'perfect-freehand';

interface PathProps {
    points: [x: number, y: number, pressure: number][];
    fill: string;
    x: number;
    y: number;
    onPointerDown?: (e: React.PointerEvent) => void;
    stroke?: string;
}

export const Path = ({
    fill,
    points,
    x,
    y,
    onPointerDown,
    stroke,
}: PathProps) => {
    return (
        <path
            className="drop-shadow-md"
            onPointerDown={onPointerDown}
            style={{ transform: `translate(${x}px, ${y}px)` }}
            stroke={stroke}
            fill={fill}
            x={0}
            y={0}
            strokeWidth={1}
            d={getSvgPathFromStroke(
                getStroke(points, {
                    size: 10,
                    thinning: 0.5,
                    smoothing: 0.5,
                    streamline: 0.5,
                })
            )}
        />
    );
};
