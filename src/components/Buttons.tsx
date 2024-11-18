import { FC } from "react";
import { ChevronUpIcon, XMarkIcon } from "./icons";

type ButtonProps = React.ComponentProps<"button">;

type ToggleButtonProps = React.ComponentProps<"button"> & {
  isExpanded: boolean;
}

export const ExpandButton: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button className="hover:text-gray-700 transition-colors flex items-center justify-center" {...props}>
      {children}
    </button>
  );
};

export const DeleteButton: FC<Omit<ButtonProps, "children">> = (props) => {
  return (
    <button className="hover:text-gray-700 transition-colors flex items-center justify-center" {...props}>
      <XMarkIcon />
    </button>
  );
};


export const ToggleButton: FC<ToggleButtonProps> = ({ isExpanded, ...props }) => {
  return (
    <button className={`hover:text-gray-700 transition-all flex items-center justify-center ${isExpanded ? "" : "rotate-180"}`} {...props}>
      <ChevronUpIcon />
    </button>
  );
}