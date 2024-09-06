import { useEffect, useState } from "react";

import { timeFromMillis, UPDATE_PERIOD_MS } from "../utils/Time";
import useConst from "./useConst";

const useStopWatch = () => {
  const initialTime = useConst(new Date());
  const [elapsedMillis, setElapsedMillis] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setElapsedMillis(new Date().getTime() - initialTime.getTime());
    }, UPDATE_PERIOD_MS);

    return () => clearInterval(intervalId);
  }, [initialTime]);

  return timeFromMillis(elapsedMillis);
};

export default useStopWatch;
