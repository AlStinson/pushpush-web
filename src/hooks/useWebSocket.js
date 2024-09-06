import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { websocketCallbacks } from "../utils/Websocket";
import useConst from "./useConst";

const useWebSocket = (urlParam, onmessageParam) => {
  const [socket, setSocket] = useState(null);
  const navigate = useNavigate();

  const onmessage = useConst(onmessageParam);
  const url = useConst(urlParam);

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
    const ws = new WebSocket(url);
    websocketCallbacks(ws, {
      onmessage: handleMessage,
      onerror: (event) => handleError(event.data),
    });
    setSocket(ws);

    return () => {
      websocketCallbacks(ws, { onopen: () => ws.close() });
      if (ws.readyState === WebSocket.OPEN) ws.close();
    };
  }, [url, handleMessage, handleError]);

  const sendMessage = useCallback(
    (message) => {
      if (socket && socket.readyState === WebSocket.OPEN)
        socket.send(JSON.stringify(message));
      else handleError("WebSocket connection not established");;
    },
    [socket, handleError],
  );

  return sendMessage;
};

export default useWebSocket;
