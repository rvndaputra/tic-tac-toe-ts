import { useCallback, useEffect, useState } from "react";

import { useAppContext } from "../../../context/app";
import type { SquareType } from "../../../model";

import calculateWinner from "./utils/calculate-winner";

const useClickEvent = () => {
  const { emitter } = useAppContext();

  const INIT_SQUARES = Array(9).fill(null);
  const [squares, setSquares] = useState<SquareType[]>(INIT_SQUARES);
  const [isX, setIsX] = useState(true);

  const _onSquareClick = useCallback(
    (index: number) => {
      if (calculateWinner(squares) || squares[index]) {
        return;
      }

      squares[index] = isX ? "X" : "O";

      setSquares(squares);
      setIsX((prev) => !prev);

      const winner = calculateWinner(squares);

      if (winner) {
        emitter.emit("@game/end", { isEnd: true, winner: winner });
      } else if (squares.every((x) => x)) {
        emitter.emit("@game/end", { isEnd: true, winner: "ties" });
      }
    },
    [emitter, isX, squares]
  );

  const _onPlayAgain = useCallback(() => {
    console.log("INIT_SQUARES", INIT_SQUARES);
    setSquares(INIT_SQUARES);
    setIsX(true);

    emitter.emit("@game/end", { isEnd: false, winner: null });
  }, [INIT_SQUARES, emitter]);

  useEffect(() => {
    emitter.on("@player/click", _onSquareClick);
    emitter.on("@game/restart", _onPlayAgain);

    return () => {
      emitter.off("@player/click", _onSquareClick);
      emitter.off("@game/restart", _onPlayAgain);
    };
  }, [emitter, _onSquareClick, _onPlayAgain]);

  return {
    squares: squares,
    isX: isX,
    winner: calculateWinner(squares),
    handleOnSquareClick: _onSquareClick,
  };
};

export default useClickEvent;
