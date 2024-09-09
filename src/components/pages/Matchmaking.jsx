import { useNavigate } from "react-router-dom";

import useStopWatch from "../../hooks/useStopwatch";
import useWebSocket from "../../hooks/useWebSocket";
import { BACKEND_MATCHMAKING_URL } from "../../utils/BackendResources";
import Button from "../styles/Button";

const Matchmaking = () => {
  const navigate = useNavigate();
  const clock = useStopWatch();

  const onmessage = (json) => {
    navigate(`/game/${json.gameId}/${json.view}`);
  };

  useWebSocket(BACKEND_MATCHMAKING_URL, onmessage);
  return (
    <>
      <h2>Matchmaking</h2>
      <h3>{clock}</h3>
      <Button onClick={() => navigate("/")}>Cancel</Button>
    </>
  );
};

export default Matchmaking;
