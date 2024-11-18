import { FC } from "react";
import { ListItem } from "../api/getListData";
import { DeleteButton, ToggleButton } from "./Buttons";
import { useStore } from "../store";

type CardProps = {
  card: ListItem
};

export const Card: FC<CardProps> = ({ card }) => {
  const { id, title, description, isVisible } = card;

  const { toggleCardVisibility, deleteCard, deletedCards } = useStore();

  const isDeleted = deletedCards.some((deletedCard) => deletedCard.id === id);

  const toggleVisibility = () => {
    toggleCardVisibility(id);
  }

  const deleteCardHandler = () => {
    deleteCard(id);
  }

  return (
    <div className="border border-black px-2 py-1.5">
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
