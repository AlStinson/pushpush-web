import { useEffect, useMemo, useState } from "react";

import { timeFromMillis, UPDATE_PERIOD_MS } from "../utils/Time";

export const useClock = (onExpire) => {
  const [paused, setPaused] = useState(true);
  const [millisLeft, setMillisLeft] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    if (paused) return;
    if (millisLeft <= 0) return;

    const timeout = setTimeout(() => {
      const now = new Date();
      const elapsedMillis = now.getTime() - lastUpdate.getTime();
      setLastUpdate(now);
      setMillisLeft((previous) => previous - elapsedMillis);
    }, UPDATE_PERIOD_MS);

    return () => clearTimeout(timeout);
  }, [paused, millisLeft, lastUpdate]);

  useEffect(() => {
    if (millisLeft > 0) return;
    if (paused) return;
    setPaused(true);
    onExpire();
  }, [millisLeft, paused, onExpire]);

  return {
    clock: timeFromMillis(millisLeft),
    actions: useMemo(
      () => ({
        setRemainingTime: setMillisLeft,
        pause: () => setPaused(true),
        resume: () => {
          if (paused) setLastUpdate(new Date());
          setPaused(false);
        },
      }),
      [paused],
    ),
  };
};

export default useClock;
