import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useConst from "./useConst";

const useWebSocket = (pathParam, onmessageParam) => {
  const [socket, setSocket] = useState(null);
  const navigate = useNavigate();

  const onmessage = useConst(onmessageParam);
  const path = useConst(pathParam);

  const handleError = useCallback(
    (error) => {
      navigate("/error", { state: error });
    },
    [navigate],
  );

  const handleMessage = useCallback(
    (event) => {
      try {
        const json = JSON.parse(event.data);
        if (json.kind === "ERROR") handleError(json.payload);
        else onmessage(json);
      } catch (e) {
        handleError(event.data, e);
      }
    },
    [handleError, onmessage],
  );

  useEffect(() => {
    const ws = new WebSocket(`${import.meta.env.VITE_BACKEND_PATH}/${path}`);
    ws.onopen = () => {};
    ws.onmessage = handleMessage;
    ws.onerror = (event) => handleError(event.data);
    ws.onclose = () => {};
    setSocket(ws);

    return () => {
      ws.onopen = () => ws.close();
      ws.onmessage = () => {};
      ws.onerror = () => {};
      ws.onclose = () => {};
      if (ws.readyState === WebSocket.OPEN) ws.close();
    };
  }, [path, handleMessage, handleError]);

  const sendMessage = useCallback(
    (message) => {
      if (socket && socket.readyState === WebSocket.OPEN)
        socket.send(JSON.stringify(message));
      else handleError("WebSocket connection not established");
    },
    [socket, handleError],
  );

  return sendMessage;
};

export default useWebSocket;
