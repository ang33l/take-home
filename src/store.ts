import { create } from "zustand";
import { ListItem } from "./api/getListData";

type State = {
    cards: ListItem[]
};

type Actions = {
    initCards: (cards: ListItem[]) => void,
    toggleCardVisibility: (cardId: number) => void
};

export const useStore = create<State & Actions>((set) => ({
    cards: [],
    initCards: (cards) => set({ cards }),
    toggleCardVisibility: (cardId) => set((state) => ({
        cards: state.cards.map((card) => {
            if (card.id === cardId) {
                return {
                    ...card,
                    isVisible: !card.isVisible
                };
            }
            return card;
        })

    }))
}));
