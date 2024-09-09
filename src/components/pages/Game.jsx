import { useCallback, useEffect, useState } from "react";
import React from "react";
import { useParams } from "react-router-dom";

import useWebSocket from "../../hooks/useWebSocket";
import start from "../../sounds/game-start.mp3";
import move from "../../sounds/move.mp3";
import {
  BlackClockStorage,
  WhiteClockStorage,
} from "../../storage/clockStorage";
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
    WhiteClockStorage.actions.setRemainingTime(json.whiteTimeLeftMillis);
    BlackClockStorage.actions.setRemainingTime(json.blackTimeLeftMillis);
    if (json.game.nextPlayer === "WHITE" && json.hasStarted) {
      WhiteClockStorage.actions.resume();
      BlackClockStorage.actions.pause();
    } else if (json.game.nextPlayer === "BLACK" && json.hasStarted) {
      WhiteClockStorage.actions.pause();
      BlackClockStorage.actions.resume();
    } else {
      WhiteClockStorage.actions.pause();
      BlackClockStorage.actions.pause();
    }
    if (json.game.moved) TrySound(move);
  };

  const sendMessage = useWebSocket(
    BACKEND_GAME_URL(gameProfile.gameId, gameProfile.kind),
    handleMessage,
  );

  const requestUpdate = useCallback(() => {
    sendMessage({ kind: "GAME_UPDATE" });
  }, [sendMessage]);

  const sendMove = useCallback(
    (move) => {
      sendMessage({ kind: "MOVE", move });
    },
    [sendMessage],
  );

  if (data === null) return <Loading />;

  const boardProps = {
    data,
    sendMove,
    requestUpdate,
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
