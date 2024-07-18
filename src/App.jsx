import { useState } from 'react';
import Board from './components/Board';
import useWebSocket from './hooks/useWebSocket';
import Container from './styles/Container';
import Header from './styles/Header';
import Button from './styles/Button';
import { emptyMove } from './utils/Move';

function App() {

  const [data, sendMessage] = useWebSocket();
  const [localMove, setLocalMove] = useState(emptyMove);
  const [rotated, setRotate] = useState(false);


  if (data === null) return <p>Fetching data</p>;

  const boardProps = {
    data, sendMessage, localMove, setLocalMove, rotated
  }

  const sendMove = normal => () => {
    sendMessage({ kind: "move", payload: localMove });
    setLocalMove(emptyMove);
  }

  const sendReset = () => {
    sendMessage({ kind: "reset" })
  }


  return (<Container>
    <Header>Pushpush</Header>
    <Container>
      <Button onClick={() => setRotate(rot => !rot)}>Rotate board</Button>
      <Button onClick={sendReset}>Reset game</Button>
    </Container>
    <Board {...boardProps} />
    <Container>
      <Button onClick={() => setLocalMove(emptyMove)} disabled={!localMove.init}>Cancel</Button>
      <Button disabled={!localMove.dir} onClick={sendMove(true)}>Normal</Button>
      <Button disabled={!localMove.dir} onClick={sendMove(false)}>Deflected</Button>
    </Container>
  </Container>);
}

export default App;
