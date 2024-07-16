import { useState } from 'react';
import Board from './components/Board';
import useWebSocket from './hooks/useWebSocket';

function App() {

  const [data, sendMessage] = useWebSocket();
  const [state, setState] = useState({});
  const [rotated, setRotate] = useState(false);


  if (data === null) return <p>Fetching data</p>;

  const boardProps = {
    data, sendMessage, state, setState, rotated
  }

  const sendMove = normal => () => {
    sendMessage({kind: "move", payload: {init: state.firstSquare, dir: state.direction, normal}});
    setState({});
  }

  const sendReset = () => {
    sendMessage({kind: "reset"})
  }


  return (<>
    <Board {...boardProps} />
    <div>
      <button onClick={() => setRotate(rot => !rot)}>Rotate</button>
      <button onClick={() => setState({})} disabled={!state.firstSquare}>Cancel</button>
      <button disabled={!state.direction} onClick={sendMove(true)}>Normal</button>
      <button disabled={!state.direction} onClick={sendMove(false)}>Deflected</button>
      <button onClick={sendReset}>Reset</button>
    </div>
  </>
  );
}

export default App;
