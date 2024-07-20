import { useEffect, useState } from 'react';

const useWebSocket = ({ gameId, kind }) => {
  const [state, setState] = useState("CLOSED")
  const [socket, setSocket] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!gameId || !kind) return;

    console.log(process.env.REACT_APP_BACKEND_PATH + "/" + gameId + "/" + kind)
    const ws = new WebSocket(process.env.REACT_APP_BACKEND_PATH + "/" + gameId + "/" + kind)
    ws.onopen = () => setState("OPEN");
    ws.onmessage = (event) => setData(JSON.parse(event.data));
    ws.onerror = (event) => console.error(event);
    ws.onclose = () => setState("CLOSED");
    setSocket(ws);
    setState("LOADING");

    return () => {
      ws.onopen = () => ws.close();
      ws.onmessage = () => { };
      ws.onerror = () => { };
      ws.onclose = () => { };
      if (ws.readyState !== 0) ws.close();
      setState("CLOSED")
    }
  }, [gameId, kind]);

  const sendMove = (move) => {
    if (socket && socket.readyState === WebSocket.OPEN) socket.send(JSON.stringify(move));
    else console.error('WebSocket connection not established');
  };

  return [state, data, sendMove];
};

export default useWebSocket;