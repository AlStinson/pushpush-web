import { useCallback, useEffect, useState } from "react";
import React from "react";
import { useParams } from "react-router-dom";

import useClock from "../../hooks/useClock";
import useWebSocket from "../../hooks/useWebSocket";
import start from "../../sounds/game-start.mp3";
import move from "../../sounds/move.mp3";
import { BACKEND_GAME_URL } from "../../utils/BackendResources";
import TrySound from "../../utils/TrySound";
import Loading from "../elements/Loading";
import Board from "../pushpush/Board";
import Buttons from "../pushpush/Buttons";
import Invite from "../pushpush/Invite";
import HorizontalWrapper from "../styles/HorizontalWrapper";

const Game = () => {
  const gameProfile = useParams();
  const [data, setData] = useState(null);

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
    whiteClock,
    blackClock,
    sendMove,
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
      <Buttons sendMessage={sendMessage} data={data} />
      <Invite />
    </>
  );
};

export default Game;
