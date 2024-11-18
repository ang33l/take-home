import { create } from "zustand";
import { DeletedListItem, ListItem } from "./api/getListData";

type State = {
    cards: ListItem[],
    deletedCards: DeletedListItem[]
};

type Actions = {
    initCards: (cards: ListItem[]) => void,
    toggleCardVisibility: (cardId: number) => void,
    deleteCard: (cardId: number) => void,
};

export const useStore = create<State & Actions>((set) => ({
    cards: [],
    deletedCards: [],

    initCards: (cards) => {
        const localStorageCards = localStorage.getItem("cards");
        const JSONCards: ListItem[] = localStorageCards ? JSON.parse(localStorageCards) : [];

        const localStorageDeletedCards = localStorage.getItem("deletedCards");
        const JSONDeletedCards: ListItem[] = localStorageDeletedCards ? JSON.parse(localStorageDeletedCards) : [];

        const _cards = cards.map((card) => {
            const storedCard = JSONCards.find((c) => c.id === card.id);
            if (JSONDeletedCards.find((c) => c.id === card.id)) {
                return null;
            }
            return { ...card, isVisible: storedCard ? storedCard.isVisible : card.isVisible };
        }).filter((card) => card !== null) as ListItem[];

        const _deletedCards = cards.map((card) => {
            const storedCard = JSONDeletedCards.find((c) => c.id === card.id);
            return storedCard ? storedCard : null;
        }).filter((card) => card !== null) as ListItem[];

        set({
            cards: _cards,
            deletedCards: _deletedCards
        });
    },
    toggleCardVisibility: (cardId) => set((state) => {
        const updatedCards = state.cards.map((card) => {
            if (card.id === cardId) {
                return {
                    ...card,
                    isVisible: !card.isVisible
                };
            }
            return card;
        });

        localStorage.setItem("cards", JSON.stringify(updatedCards));

        return { cards: updatedCards };
    }),
    deleteCard: (cardId) => set((state) => {
        const updatedCards = state.cards.filter((card) => card.id !== cardId);
        const updatedDeletedCards = [...state.deletedCards, ...state.cards.filter((card) => card.id === cardId)];

        localStorage.setItem("cards", JSON.stringify(updatedCards));
        localStorage.setItem("deletedCards", JSON.stringify(updatedDeletedCards));

        return {
            cards: updatedCards,
            deletedCards: updatedDeletedCards
        };
    })

}));
