import {create} from "zustand";

interface userProModalState {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}

export const useProModal = create<userProModalState>((set)=>({
    isOpen: false,
    openModal: () => {},
    closeModal: () => {},
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}));