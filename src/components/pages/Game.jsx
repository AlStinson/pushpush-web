import { useCallback, useContext, useEffect, useState } from "react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import NotificationContext from "../../context/NotificationContext";
import useClock from "../../hooks/useClock";
import useWebSocket from "../../hooks/useWebSocket";
import start from "../../sounds/game-start.mp3";
import move from "../../sounds/move.mp3";
import { BACKEND_GAME_URL } from "../../utils/BackendResources";
import { emptyMove } from "../../utils/Move";
import TrySound from "../../utils/TrySound";
import CopyIcon from "../elements/CopyIcon";
import Loading from "../elements/Loading";
import Board from "../pushpush/Board";
import Button from "../styles/Button";
import HorizontalWrapper from "../styles/HorizontalWrapper";

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
    setData(json);
    if (json.game.moved) TrySound(move);
  };

  const sendMessage = useWebSocket(
    BACKEND_GAME_URL(gameProfile.gameId, gameProfile.kind),
    handleMessage,
  );

  const requestUpdate = () => {
    sendMessage({ kind: "GAME_UPDATE" });
  };

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
      sendMessage({ kind: "MOVE", move });
    },
    [sendMessage],
  );

  const whiteClock = useClock(requestUpdate);
  const blackClock = useClock(requestUpdate);

  const whiteClockActions = whiteClock.actions;
  const blackClockActions = blackClock.actions;

  useEffect(() => {
    if (!data) return;
    whiteClockActions.setRemainingTime(data.whiteTimeLeftMillis);
    blackClockActions.setRemainingTime(data.blackTimeLeftMillis);
    if (data.game.nextPlayer === "WHITE" && data.hasStarted) {
      whiteClockActions.resume();
      blackClockActions.pause();
    } else if (data.game.nextPlayer === "BLACK" && data.hasStarted) {
      whiteClockActions.pause();
      blackClockActions.resume();
    } else {
      whiteClockActions.pause();
      blackClockActions.pause();
    }
  }, [data, whiteClockActions, blackClockActions]);

  if (data === null) return <Loading />;

  const boardProps = {
    data,
    gameProfile,
    whiteClock,
    blackClock,
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
        {data.game.winner && (
          <b>
            <div>
              Winner: {data.game.winner.toLowerCase()} (
              {data.game.winner === "WHITE" && data.whiteName}
              {data.game.winner === "BLACK" && data.blackName})
            </div>
          </b>
        )}
        {data.game.nextPlayer && (
          <div>
            Next turn: <b>{data.game.nextPlayer.toLowerCase()}</b>
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
        {gameProfile.kind !== "viewer" && !data.game.winner && (
          <Button onClick={surrender}>Surrender</Button>
        )}
        {gameProfile.kind !== "viewer" && data.game.winner && (
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
