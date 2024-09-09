import { useContext } from "react";
import { useParams } from "react-router-dom";

import NotificationContext from "../../context/NotificationContext";
import CopyIcon from "../elements/CopyIcon";

const Invite = () => {
  const gameProfile = useParams();
  const addNotification = useContext(NotificationContext);

  return (
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
  );
};

export default Invite;
