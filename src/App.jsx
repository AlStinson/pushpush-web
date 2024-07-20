import { useCallback, useState } from 'react';
import Board from './components/Board';
import useWebSocket from './hooks/useWebSocket';
import Container from './styles/Container';
import Button from './styles/Button';
import { emptyMove } from './utils/Move';
import Login from './components/Login';
import useHealth from './hooks/useHealth';
import HorizontalWrapper from './styles/HorizontalWrapper';
import CopyIcon from './components/CopyIcon';
import Notification from './styles/Notification';

function App() {

  useHealth();

  const [gameProfile, setGameProfile] = useState({})
  const [state, data, sendMessage] = useWebSocket(gameProfile);
  const [localMove, setLocalMove] = useState(emptyMove);
  const [rotated, setRotate] = useState(false);
  const [notification, setNotification] = useState(null);

  const addNotification = useCallback((message) => {
    const id = Date.now();
    const notification = { id, message };
    setNotification(notification);
    setTimeout(() => setNotification((prev) => {
      if (prev === notification) setNotification(null);
    }), 5000)
  }, []);

  if (state === "CLOSED") return <Login gameProfile={gameProfile} setGameProfile={setGameProfile}></Login>
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
      <div>GameId: {gameProfile.gameId} <CopyIcon value={gameProfile.gameId} action={() => addNotification("GameId copied to the clipboard")} /></div>
      <div>POV: {gameProfile.kind}</div>
    </HorizontalWrapper>
    <Board {...boardProps} />
    <HorizontalWrapper>
      {gameProfile.kind !== "viewer" && <Button onClick={() => setLocalMove(emptyMove)} disabled={!localMove.init}>Cancel</Button>}
      {gameProfile.kind === "viewer" && <Button onClick={() => setRotate(rot => !rot)}>Rotate board</Button>}
      {localMove.dir && <Button onClick={sendMove(true)}>Normal</Button>}
      {localMove.dir && <Button disabled={!localMove.dir} onClick={sendMove(false)}>Deflected</Button>}
      <Button onClick={() => setGameProfile({})}>Exit</Button>
    </HorizontalWrapper>
    {data.winner && <h2>Winner: {data.winner}</h2>}
    {notification && <Notification>{notification.message}</Notification>}
  </Container>)
}

export default App;
