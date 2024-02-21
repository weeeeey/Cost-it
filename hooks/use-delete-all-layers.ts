import { useMutation } from '@/liveblocks.config';

export const useDleteAllLayers = () => {
    return useMutation(({ storage, setMyPresence }) => {
        const liveLayers = storage.get('layers');
        const liveLayerIds = storage.get('layerIds');

        const ids = liveLayerIds.map((id) => id);

        for (const id of ids) {
            liveLayers.delete(id);
            const index = liveLayerIds.indexOf(id);
            if (index !== -1) {
                liveLayerIds.delete(index);
            }
        }
        setMyPresence({ selection: [] }, { addToHistory: true });
    }, []);
};
