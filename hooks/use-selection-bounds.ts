import { useSelf, useStorage } from '@/liveblocks.config';
import { Layer, XYWH } from '@/types/type-canvas';
import { shallow } from '@liveblocks/client';

const boundingBox = (layers: Layer[]): XYWH | null => {
    const first = layers[0];
    if (!first) return null;

    let left = first.x;
    let top = first.y;
    let right = first.x + first.width;
    let bottm = first.y + first.height;

    for (let i = 0; i < layers.length; i++) {
        const { x, y, width, height } = layers[i];

        if (left > x) {
            left = x;
        }
        if (right < x + width) {
            right = x + width;
        }
        if (top > y) {
            top = y;
        }
        if (bottm < y + height) {
            bottm = y + height;
        }
    }
    return {
        x: left,
        y: top,
        width: right - left,
        height: bottm - top,
    };
};

export const useSelectionBounds = () => {
    const selection = useSelf((me) => me.presence.selection);

    return useStorage((root) => {
        const selectedLayers = selection
            .map((id) => root.layers.get(id)!)
            .filter(Boolean);

        return boundingBox(selectedLayers);
    }, shallow);
};
