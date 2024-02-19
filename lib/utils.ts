import { Camera, Color } from '@/types/type-canvas';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const COLORS = ['#DC2626', '#D97706', '#059669', '#7C3AED', '#DB2777'];

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function connectionIdToColor(connectionId: number): string {
    return COLORS[connectionId % COLORS.length];
}

// const client = createClient({
//     throttle: 16,
// }); @liveblocks.config
export const pointerEventToCanvasPoint = (
    e: React.PointerEvent,
    camera: Camera
) => {
    return {
        x: Math.round(e.clientX - camera.x),
        y: Math.round(e.clientY - camera.y),
    };
};

export const colorToCss = (color: Color) => {
    return `${color.r.toString(16).padStart(2, '0')}${color.g
        .toString(16)
        .padStart(2, '0')}${color.b.toString(16).padStart(2, '0')}`;
};
