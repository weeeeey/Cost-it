import { create } from 'zustand';

interface UseNewModalProps {
    isOpen: boolean;
    orgId: string;
    onOpen: (id: string) => void;
    onClose: () => void;
}

export const useNewModal = create<UseNewModalProps>((set) => ({
    isOpen: false,
    orgId: '',
    onOpen: (orgId) => set({ isOpen: true, orgId }),
    onClose: () => set({ isOpen: false }),
}));
