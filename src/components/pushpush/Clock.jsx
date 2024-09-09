import { useEffect } from "react";

import { useStorage } from "../../storage";
import { timeFromMillis, UPDATE_PERIOD_MS } from "../../utils/Time";

const Clock = (props) => {
  const { onExpire, storage } = props;
  const { paused, millisLeft, lastUpdate } = useStorage(storage);
  const { setLastUpdate, setPaused, reduceMillis } = storage.actions;

  useEffect(() => {
    if (paused) return;
    if (millisLeft <= 0) return;

    const timeout = setTimeout(() => {
      const now = new Date();
      const elapsedMillis = now.getTime() - lastUpdate.getTime();
      setLastUpdate(now);
      reduceMillis(elapsedMillis);
    }, UPDATE_PERIOD_MS);

    return () => clearTimeout(timeout);
  }, [paused, millisLeft, lastUpdate, reduceMillis, setLastUpdate]);

  useEffect(() => {
    if (millisLeft > 0) return;
    if (paused) return;
    setPaused(true);
    onExpire();
  }, [millisLeft, paused, onExpire, setPaused]);

  return timeFromMillis(millisLeft);
};

export default Clock;
