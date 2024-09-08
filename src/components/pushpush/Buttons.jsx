import { func, object } from "prop-types";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  localMoveActions,
  useLocalMoveStorage,
} from "../../storage/localMoveStorage";
import { rotationActions } from "../../storage/rotationStorage.";
import Button from "../styles/Button";
import HorizontalWrapper from "../styles/HorizontalWrapper";

const Buttons = (props) => {
  const gameProfile = useParams();
  const navigate = useNavigate();
  const localMove = useLocalMoveStorage((state) => state);

  const { sendMessage, data } = props;

  const surrender = () => {
    sendMessage({ kind: "SURRENDER" });
    localMoveActions.reset();
  };

  const restart = () => {
    sendMessage({ kind: "RESTART" });
    localMoveActions.reset();
  };

  const sendMove = (move) => {
    sendMessage({ kind: "MOVE", move });
  };

  const clickMoveType = (normal) => () => {
    sendMove({ ...localMove, normal });
    localMoveActions.reset();
  };

  return (
    <HorizontalWrapper>
      {gameProfile.kind !== "viewer" && (
        <Button
          onClick={() => localMoveActions.reset()}
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
        <Button onClick={() => rotationActions.rotate()}>Rotate board</Button>
      )}
      {localMove.dir && <Button onClick={clickMoveType(true)}>Normal</Button>}
      {localMove.dir && (
        <Button disabled={!localMove.dir} onClick={clickMoveType(false)}>
          Deflected
        </Button>
      )}
      <Button onClick={() => navigate("/")}>Exit</Button>
    </HorizontalWrapper>
  );
};

Buttons.propTypes = {
  data: object,
  sendMessage: func,
};

export default Buttons;
