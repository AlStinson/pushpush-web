import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CopyIcon from "../elements/CopyIcon";
import Board from "../pushpush/Board";
import Button from "../styles/Button";
import HorizontalWrapper from "../styles/HorizontalWrapper";
import NotificationContext from "../../context/NotificationContext";
import useWebSocket from "../../hooks/useWebSocket";
import { emptyMove } from "../../utils/Move";
import move from "../../sounds/move.mp3";
import start from "../../sounds/game-start.mp3";
import TrySound from "../../utils/TrySound";
import Loading from "../elements/Loading";

import React from "react";
const Game = () => {
  const gameProfile = useParams();
  const navigate = useNavigate();
  const addNotification = useContext(NotificationContext);
  const [data, setData] = useState(null);

  const [localMove, setLocalMove] = useState(emptyMove);
  const [rotated, setRotate] = useState(false);

  const isDataNull = data === null;

  useEffect(() => {
    if (!isDataNull) TrySound(start);
  }, [isDataNull]);

  const handleMessage = (json) => {
    setData(json.game);
    if (json.game.moved) TrySound(move);
  };

  const sendMessage = useWebSocket(
    `game/${gameProfile.gameId}/${gameProfile.kind}`,
    handleMessage,
  );

  const surrender = () => {
    sendMessage({ kind: "SURRENDER" });
    setLocalMove(emptyMove);
  };

  const restart = () => {
    sendMessage({ kind: "RESTART" });
    setLocalMove(emptyMove);
  };

  const sendMove = useCallback(
    (move) => {
      sendMessage({ kind: "GAME_UPDATE", move });
    },
    [sendMessage],
  );

  if (data === null) return <Loading />;

  const boardProps = {
    data,
    sendMove,
    localMove,
    setLocalMove,
    addNotification,
    rotated:
      gameProfile.kind === "white"
        ? false
        : gameProfile.kind === "black"
          ? true
          : rotated,
  };

  const clickMoveType = (normal) => () => {
    sendMove({ ...localMove, normal });
    setLocalMove(emptyMove);
  };

  return (
    <>
      <HorizontalWrapper>
        {gameProfile.kind !== "viewer" && (
          <div>
            Playing as: <b>{gameProfile.kind}</b>
          </div>
        )}
        {data.winner && (
          <b>
            <div>Winner: {data.winner.toLowerCase()}</div>
          </b>
        )}
        {data.nextPlayer && (
          <div>
            Next turn: <b>{data.nextPlayer.toLowerCase()}</b>
          </div>
        )}
      </HorizontalWrapper>
      <Board {...boardProps} />
      <HorizontalWrapper>
        {gameProfile.kind !== "viewer" && (
          <Button
            onClick={() => setLocalMove(emptyMove)}
            disabled={!localMove.init}
          >
            Cancel
          </Button>
        )}
        {gameProfile.kind !== "viewer" && !data.winner && (
          <Button onClick={surrender}>Surrender</Button>
        )}
        {gameProfile.kind !== "viewer" && data.winner && (
          <Button onClick={restart}>Restart</Button>
        )}
        {gameProfile.kind === "viewer" && (
          <Button onClick={() => setRotate((rot) => !rot)}>Rotate board</Button>
        )}
        {localMove.dir && <Button onClick={clickMoveType(true)}>Normal</Button>}
        {localMove.dir && (
          <Button disabled={!localMove.dir} onClick={clickMoveType(false)}>
            Deflected
          </Button>
        )}
        <Button onClick={() => navigate("/")}>Exit</Button>
      </HorizontalWrapper>
      <div className="mt-4">
        {gameProfile.kind !== "white" && (
          <p className="flex justify-center">
            Invite someone to play as white
            <CopyIcon
              value={`${window.location.origin}/game/${gameProfile.gameId}/white`}
              action={() => addNotification("Link copied to clipboard")}
            />
          </p>
        )}
        {gameProfile.kind !== "black" && (
          <p className="flex justify-center">
            Invite someone to play as black
            <CopyIcon
              value={`${window.location.origin}/game/${gameProfile.gameId}/black`}
              action={() => addNotification("Link copied to clipboard")}
            />
          </p>
        )}
        <p className="flex justify-center">
          Invite someone to view the game
          <CopyIcon
            value={`${window.location.origin}/game/${gameProfile.gameId}/viewer`}
            action={() => addNotification("Link copied to clipboard")}
          />
        </p>
      </div>
    </>
  );
};

export default Game;
