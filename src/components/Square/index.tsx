import type { FC } from "react";

import { useAppContext } from "../../context/app";
import { squareStyle } from "./styles";

interface SquareProps {
  index: number;
  value: string;
}

const Square: FC<SquareProps> = (props) => {
  const { index, value } = props;
  const { emitter } = useAppContext();

  const onClick = () => {
    emitter.emit("@player/click", index);
  };

  return (
    <button className={squareStyle} onClick={onClick}>
      {value}
    </button>
  );
};

export default Square;
