import { func, object } from "prop-types";
import { useParams } from "react-router-dom";

import {
  BlackClockStorage,
  WhiteClockStorage,
} from "../../storage/clockStorage";
import {
  localMoveActions,
  useLocalMoveStorage,
} from "../../storage/localMoveStorage";
import { useRotationStorage } from "../../storage/rotationStorage.";
import { sameVector, subVectors, sumVectors } from "../../utils/Vector2Integer";
import Clock from "./Clock";
import Square from "./Square";

const BOARD_SIZE = 7;

const Board = (props) => {
  const { board, validMoves } = props.data.game;
  const { whiteName, blackName, hasStarted } = props.data;
  const { requestUpdate } = props;

  const { kind } = useParams();
  const { init, dir } = useLocalMoveStorage();
  let rotated = useRotationStorage();
  rotated = kind === "white" ? false : kind === "black" ? true : rotated;

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
      rotated,
      piece: board[`(${x},${y})`],
      selectable,
      selected:
        sameVector(square, init) ||
        (init && dir && sameVector(square, sumVectors(init, dir))),
      onclick: () => {
        if (!selectable) localMoveActions.reset();
        else if (!init) localMoveActions.setInit(square);
        else if (movesAsFinal.length === 1) {
          props.sendMove(movesAsFinal[0]);
          localMoveActions.reset();
        } else {
          localMoveActions.setDir(subVectors(square, init));
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
      className={`mx-auto flex w-100 max-w-[calc(100vw-60px)] flex-col ${rotated ? "rotate-180" : ""}`}
    >
      <div
        className={`flex flex-row justify-center ${rotated ? "rotate-180" : ""}`}
      >
        <div className="flex-1"></div>
        <div className="flex-auto">
          {blackName || <i>(empty)</i>}
          {kind === "black" && <i> (you)</i>}
        </div>
        <div className="flex-1 text-right">
          {hasStarted && (
            <Clock storage={BlackClockStorage} onExpire={requestUpdate} />
          )}
        </div>
      </div>
      <div
        className={`mx-auto my-5 grid h-100 max-h-[calc(100vw-60px)] grid-cols-7 grid-rows-7 flex-wrap `}
      >
        {squares}
      </div>
      <div
        className={`flex flex-row justify-center ${rotated ? "rotate-180" : ""}`}
      >
        <div className="flex-1"></div>
        <div className="flex-auto">
          {whiteName || <i>(empty)</i>}
          {kind === "white" && <i> (you)</i>}
        </div>
        <div className="flex-1 text-right">
          {hasStarted && (
            <Clock storage={WhiteClockStorage} onExpire={requestUpdate} />
          )}
        </div>
      </div>
    </div>
  );
};

Board.propTypes = {
  data: object.isRequired,
  requestUpdate: func.isRequired,
  sendMove: func.isRequired,
};

export default Board;
