import { useEffect, useState } from 'react';

const useWebSocket = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(process.env.REACT_APP_BACKEND_PATH)
    ws.onopen = () => console.log('Connected to WebSocket server');
    ws.onmessage = (event) =>  setMessage(JSON.parse(event.data));
    ws.onerror = (event) => console.error(event);
    ws.onclose = () => console.log('Disconnected from WebSocket server');
    setSocket(ws);

    return () => {
      ws.onopen = () => () => {};
      ws.onmessage = () => {};
      ws.onerror = () => {};
      ws.onclose = () => {};
      if (ws.readyState === 0) {
        ws.onopen = () => ws.close();
      } else {
        ws.close();
      }
    }
  }, []);

  const sendMessage = (data) => {
    if (socket && socket.readyState === WebSocket.OPEN) socket.send(JSON.stringify(data));
    else console.error('WebSocket connection not established');
  };

  return [ message, sendMessage ];
};

export default useWebSocket;