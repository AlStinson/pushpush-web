import React from "react";
import "./Board.css";
import Square from "./Square";
import { emptyMove, moveProps } from "../../utils/Move";
import { sameVector, subVectors, sumVectors } from "../../utils/Vector2Integer";
import { arrayOf, bool, func, object, shape } from "prop-types";

const Board = (props) => {
  const { board, validMoves } = props.data;
  const { init, dir } = props.localMove;

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
      key: x + 8 * y,
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

    return <Square {...squareProps} />;
  };

  const squares = [];
  for (let y = 7; y > 0; y--) {
    for (let x = 1; x < 8; x++) {
      squares.push(renderSquare(x, y));
    }
  }

  return (
    <div
      className="board"
      style={{ transform: `rotate(${props.rotated ? 180 : 0}deg)` }}
    >
      {squares}
    </div>
  );
};

Board.propTypes = {
  data: shape({
    board: object,
    validMoves: arrayOf(moveProps),
  }),
  localMove: moveProps,
  rotated: bool,
  setLocalMove: func,
  sendMove: func,
};

export default Board;
