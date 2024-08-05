import { useCallback, useEffect, useState } from 'react';
import move from '../sounds/move.mp3';

const useWebSocket = ({ gameId, kind }) => {
  const [error, setError] = useState()
  const [socket, setSocket] = useState(null);
  const [data, setData] = useState(null);

  const handleMessage = useCallback(event => {
    try {
      const json = JSON.parse(event.data);
      if (json.moved) new Audio(move).play();
      setData(json)
    } catch {
      setError(event.data)
    }
  }, [])

  useEffect(() => {
    const ws = new WebSocket(process.env.REACT_APP_BACKEND_PATH + "/" + gameId + "/" + kind)
    ws.onopen = () => {};
    ws.onmessage = handleMessage;
    ws.onerror = event => setError(event.data);
    ws.onclose = () => {};
    setSocket(ws);

    return () => {
      ws.onopen = () => ws.close();
      ws.onmessage = () => { };
      ws.onerror = () => { };
      ws.onclose = () => { };
      if (ws.readyState !== 0) ws.close();
    }
  }, [gameId, kind, handleMessage]);

  const sendMove = (move) => {
    if (socket && socket.readyState === WebSocket.OPEN) socket.send(JSON.stringify(move));
    else setError('WebSocket connection not established');
  };

  return [error, data, sendMove];
};

export default useWebSocket;