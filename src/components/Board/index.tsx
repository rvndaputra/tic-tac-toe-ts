import type { FC } from "react";
import { useCallback, useEffect, useState } from "react";

import { useAppContext } from "../../context/app";
import { GameEndEventType, INIT_SCORES } from "../../model";

import Player from "../Player";
import Square from "../Square";

import useClickEvent from "./usecase/board-click-event";

import { boardStyle, playerStyle } from "./style";

const Board: FC = () => {
  const { emitter } = useAppContext();

  const [score, setScore] = useState(INIT_SCORES);
  const [gameEnd, setGameEnd] = useState(false);

  const onGameEnd = useCallback((params: GameEndEventType) => {
    const { isEnd, winner: _winner } = params;

    if (isEnd) {
      if (_winner === "ties") {
        setScore((prev) => ({ ...prev, ties: prev.ties + 1 }));
      } else if (_winner !== null) {
        setScore((prev) => ({ ...prev, [_winner]: prev[_winner] + 1 }));
      }
    }

    setGameEnd(isEnd);
  }, []);

  const onGameRestart = () => {
    emitter.emit("@game/restart");
  };

  const { squares, isX, winner, handleOnSquareClick } = useClickEvent();

  let status = "";

  if (gameEnd) {
    status = winner ? `Winner: ${winner}` : "Draw";
  } else {
    status = `Next player: ${isX ? "X" : "O"}`;
  }

  useEffect(() => {
    emitter.on("@player/click", handleOnSquareClick);
    emitter.on("@game/end", onGameEnd);

    return () => {
      emitter.off("@player/click", handleOnSquareClick);
      emitter.off("@game/end", onGameEnd);
    };
  }, [emitter, handleOnSquareClick, onGameEnd]);

  useEffect(() => {
    try {
      const parsed = JSON.parse(localStorage.getItem("score") || "");

      setScore(parsed);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    try {
      setTimeout(() => {
        localStorage.setItem("score", JSON.stringify(score));
      }, 0);
    } catch (e) {
      console.error(e);
    }
  }, [score]);

  return (
    <div>
      <div className={boardStyle}>
        {squares.map((square, index) => {
          return <Square index={index} value={square} />;
        })}
      </div>
      <div style={{ margin: 5 }}>{status}</div>
      <div className={playerStyle}>
        <Player className="blue" player="X" score={score.X} />
        <Player player="Draw" score={score.ties} />
        <Player className="yellow" player="O" score={score.O} />
      </div>
      <button
        style={{ visibility: gameEnd ? "visible" : "hidden", width: "100%" }}
        onClick={onGameRestart}
      >
        Play Again
      </button>
    </div>
  );
};

export default Board;
