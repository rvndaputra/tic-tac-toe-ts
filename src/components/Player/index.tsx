import type { FC } from "react";
import { cx } from "@emotion/css";

import { playerCss } from "./style";

interface PlayerProps {
  className?: string;
  player: string;
  score: number;
}

const Player: FC<PlayerProps> = (props) => {
  const { className, player, score } = props;

  const classNames = cx(className, playerCss);

  return (
    <div className={classNames}>
      <p>
        {player}&nbsp;(<strong>{score}</strong>)
      </p>
    </div>
  );
};

export default Player;
