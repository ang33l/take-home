import { useEffect, useState } from "react";
import { useGetListData } from "../api/getListData";
import { Card } from "./List";
import { Spinner } from "./Spinner";
import { useStore } from "../store";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export const Entrypoint = () => {
  const [deletedCardsRevealed, setDeletedCardsRevealed] = useState(false);
  const { cards, deletedCards, initCards } = useStore();
  const listQuery = useGetListData();

  const [deletedCardParent] = useAutoAnimate();
  const [cardParent] = useAutoAnimate();

  const refresh = () => {
    listQuery.refetch();
  };

  useEffect(() => {
    if (listQuery.isLoading) {
      return;
    }

    initCards(listQuery.data ?? []);
  }, [listQuery.data, listQuery.isLoading]);

  if (listQuery.isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex gap-x-16">
      <div className="w-full max-w-xl">
        <div className="flex items-center justify-between">
          <h1 className="mb-1 font-medium text-lg">My Awesome List ({cards.length})</h1>
          <button
            disabled={listQuery.isRefetching}
            className="text-white text-sm transition-colors hover:bg-gray-800 bg-black rounded px-3 py-1 disabled:bg-black/75"
            onClick={refresh}
          >
            {listQuery.isRefetching ? "Refreshing..." : "Refresh"}
          </button>
        </div>
        <div className="flex flex-col gap-y-3" ref={cardParent}>
          {cards.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </div>
      </div>
      <div className="w-full max-w-xl">
        <div className="flex items-center justify-between">
          <h1 className="mb-1 font-medium text-lg">Deleted Cards ({deletedCards.length})</h1>
          <button
            className="text-white text-sm transition-colors hover:bg-gray-800 disabled:bg-black/75 bg-black rounded px-3 py-1"
            disabled={deletedCards.length === 0}
            onClick={() => setDeletedCardsRevealed(!deletedCardsRevealed)}
          >
            {deletedCardsRevealed ? "Hide" : "Reveal"}
          </button>
        </div>
        <div className="flex flex-col gap-y-3" ref={deletedCardParent}>
          {deletedCardsRevealed && deletedCards.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
};
