import { FC } from "react";
import { DeletedListItem, ListItem } from "../api/getListData";
import { DeleteButton, ToggleButton } from "./Buttons";
import { useStore } from "../store";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type CardProps = {
  card: ListItem | DeletedListItem
};

export const Card: FC<CardProps> = ({ card }) => {
  const { id, title, isVisible } = card;
  const { description } = card as ListItem;
  const { toggleCardVisibility, deleteCard, deletedCards } = useStore();

  const [cardParent] = useAutoAnimate();

  const isDeleted = deletedCards.some((deletedCard) => deletedCard.id === id);

  const toggleVisibility = () => {
    toggleCardVisibility(id);
  }

  const deleteCardHandler = () => {
    deleteCard(id);
  }

  return (
    <div className="border border-black px-2 py-1.5" ref={cardParent}>
      <div className="flex justify-between mb-0.5">
        <h1 className="font-medium">{title}</h1>
        {!isDeleted &&
          <div className="flex">
            <ToggleButton isExpanded={isVisible} onClick={toggleVisibility} />
            <DeleteButton onClick={deleteCardHandler} />
          </div>
        }
      </div>
      {!isDeleted && isVisible && <p className="text-sm">{description}</p>}
    </div>
  );
};
