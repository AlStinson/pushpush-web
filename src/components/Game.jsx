import { useCallback, useState } from 'react';
import Board from './Board';
import useWebSocket from '../hooks/useWebSocket';
import Container from '../styles/Container';
import Button from '../styles/Button';
import { emptyMove } from '../utils/Move';
import HorizontalWrapper from '../styles/HorizontalWrapper';
import CopyIcon from './CopyIcon';
import Notification from '../styles/Notification';
import { useNavigate, useParams } from 'react-router-dom';

const Game = () => {
  const gameProfile = useParams();
  const navigate = useNavigate();

  const [error, data, sendMessage] = useWebSocket(gameProfile);
  const [localMove, setLocalMove] = useState(emptyMove);
  const [rotated, setRotate] = useState(false);
  const [notification, setNotification] = useState(null);

  if (error) navigate("/error", { state: error });

  const addNotification = useCallback((message) => {
    const id = Date.now();
    const notification = { id, message };
    setNotification(notification);
    setTimeout(() => setNotification((prev) => {
      if (prev === notification) setNotification(null);
    }), 5000)
  }, []);

  if (data === null) return <p>Fetching data</p>;

  const boardProps = {
    data, sendMessage, localMove, setLocalMove, addNotification,
    rotated: gameProfile.kind === "white" ? false :
      gameProfile.kind === "black" ? true : rotated,
  }

  const sendMove = normal => () => {
    sendMessage({ ...localMove, normal });
    setLocalMove(emptyMove);
  }

  return (<Container>
    <HorizontalWrapper>
      {gameProfile.kind !== "viewer" && <div>Playing as: <b>{gameProfile.kind}</b></div>}
      {data.winner && <b><div>Winner: {data.winner.toLowerCase()}</div></b>}
      {data.nextPlayer && <div>Next turn: <b>{data.nextPlayer.toLowerCase()}</b></div>}
    </HorizontalWrapper>
    <Board {...boardProps} />
    <HorizontalWrapper>
      {gameProfile.kind !== "viewer" && <Button onClick={() => setLocalMove(emptyMove)} disabled={!localMove.init}>Cancel</Button>}
      {gameProfile.kind === "viewer" && <Button onClick={() => setRotate(rot => !rot)}>Rotate board</Button>}
      {localMove.dir && <Button onClick={sendMove(true)}>Normal</Button>}
      {localMove.dir && <Button disabled={!localMove.dir} onClick={sendMove(false)}>Deflected</Button>}
      <Button onClick={() => navigate("/")}>Exit</Button>
    </HorizontalWrapper>
    <Container>
      {gameProfile.kind !== "white" && <p>Invite someone to play as white <CopyIcon value={`${window.location.origin}/${gameProfile.gameId}/white`} action={() => addNotification("Link copied to clipboard")} /></p>}
      {gameProfile.kind !== "black" && <p>Invite someone to play as black <CopyIcon value={`${window.location.origin}/${gameProfile.gameId}/black`} action={() => addNotification("Link copied to clipboard")} /></p>}
      <p>Invite someone to view the game <CopyIcon value={`${window.location.origin}/${gameProfile.gameId}/viewer`} action={() => addNotification("Link copied to clipboard")} /></p>
    </Container>
    {notification && <Notification>{notification.message}</Notification>}
  </Container>)
}

export default Game;
