import { EMPTY_FUNCTION } from "./Func";

export const websocketCallbacks = (ws, callbacks) => {
  ws.onopen = callbacks.onopen || EMPTY_FUNCTION;
  ws.onmessage = callbacks.onmessage || EMPTY_FUNCTION;
  ws.onerror = callbacks.onerror || EMPTY_FUNCTION;
  ws.onclose = callbacks.onclose || EMPTY_FUNCTION;
};
