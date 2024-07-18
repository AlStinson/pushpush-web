import { useState } from 'react';
import Board from './components/Board';
import useWebSocket from './hooks/useWebSocket';
import Container from './components/styled/Container';
import Header from './components/styled/Header';
import Button from './components/styled/Button';

function App() {

  const [data, sendMessage] = useWebSocket();
  const [state, setState] = useState({});
  const [rotated, setRotate] = useState(false);


  if (data === null) return <p>Fetching data</p>;

  const boardProps = {
    data, sendMessage, state, setState, rotated
  }

  const sendMove = normal => () => {
    sendMessage({ kind: "move", payload: { init: state.firstSquare, dir: state.direction, normal } });
    setState({});
  }

  const sendReset = () => {
    sendMessage({ kind: "reset" })
  }


  return (<Container>
    <Header>Pushpush Game</Header>
    <Container>
      <Button onClick={() => setRotate(rot => !rot)}>Rotate board</Button>
      <Button onClick={sendReset}>Reset game</Button>
    </Container>
    <Board {...boardProps} />
    <Container>
      <Button onClick={() => setState({})} disabled={!state.firstSquare}>Cancel</Button>
      <Button disabled={!state.direction} onClick={sendMove(true)}>Normal</Button>
      <Button disabled={!state.direction} onClick={sendMove(false)}>Deflected</Button>
    </Container>
  </Container>);
}

export default App;
