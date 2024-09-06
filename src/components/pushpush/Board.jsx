import { bool, func, object } from "prop-types";
import React from "react";

import { emptyMove, moveProps } from "../../utils/Move";
import { sameVector, subVectors, sumVectors } from "../../utils/Vector2Integer";
import Square from "./Square";

const BOARD_SIZE = 7;

const Board = (props) => {
  const { board, validMoves } = props.data.game;
  const { init, dir } = props.localMove;
  const { whiteName, blackName, hasStarted } = props.data;
  const { kind } = props.gameProfile;
  const { whiteClock, blackClock } = props;

  const renderSquare = (x, y) => {
    const square = { x, y };
    const movesAsInitial = validMoves.filter((move) =>
      sameVector(square, move.init),
    );
    const movesAsFinal = validMoves.filter(
      (move) =>
        sameVector(init, move.init) &&
        sameVector(square, sumVectors(move.init, move.dir)),
    );
    const selectable = !init
      ? movesAsInitial.length > 0
      : !dir && movesAsFinal.length > 0;
    const squareProps = {
      rotated: props.rotated,
      piece: board[`(${x},${y})`],
      selectable,
      selected:
        sameVector(square, init) ||
        (init && dir && sameVector(square, sumVectors(init, dir))),
      onclick: () => {
        if (!selectable) props.setLocalMove(emptyMove);
        else if (!init) props.setLocalMove({ init: square });
        else if (movesAsFinal.length === 1) {
          props.sendMove(movesAsFinal[0]);
          props.setLocalMove(emptyMove);
        } else {
          props.setLocalMove((state) => ({
            ...state,
            dir: subVectors(square, init),
          }));
        }
      },
    };

    return <Square {...squareProps} key={x + (BOARD_SIZE + 1) * y} />;
  };

  const squares = [];
  for (let y = BOARD_SIZE; y >= 1; y--) {
    for (let x = 1; x <= BOARD_SIZE; x++) {
      squares.push(renderSquare(x, y));
    }
  }

  return (
    <div
      className={`mx-auto flex w-100 max-w-[calc(100vw-60px)] flex-col ${props.rotated ? "rotate-180" : ""}`}
    >
      <div
        className={`flex flex-row justify-center ${props.rotated ? "rotate-180" : ""}`}
      >
        <div className="flex-1"></div>
        <div className="flex-auto">
          {blackName || <i>(empty)</i>}
          {kind === "black" && <i> (you)</i>}
        </div>
        <div className="flex-1 text-right">
          {hasStarted && blackClock.clock}
        </div>
      </div>
      <div
        className={`mx-auto my-5 grid h-100 max-h-[calc(100vw-60px)] grid-cols-7 grid-rows-7 flex-wrap `}
      >
        {squares}
      </div>
      <div
        className={`flex flex-row justify-center ${props.rotated ? "rotate-180" : ""}`}
      >
        <div className="flex-1"></div>
        <div className="flex-auto">
          {whiteName || <i>(empty)</i>}
          {kind === "white" && <i> (you)</i>}
        </div>
        <div className="flex-1 text-right">
          {hasStarted && whiteClock.clock}
        </div>
      </div>
    </div>
  );
};

Board.propTypes = {
  blackClock: object.isRequired,
  data: object.isRequired,
  gameProfile: object.isRequired,
  localMove: moveProps.isRequired,
  rotated: bool.isRequired,
  sendMove: func.isRequired,
  setLocalMove: func.isRequired,
  whiteClock: object.isRequired,
};

export default Board;
