import { useEffect, useState } from "react";

import { BACKEND_HEALTH_URL } from "../utils/BackendResources";

const HEALTH_INTERVAL_MS = 60000;

const useHealth = () => {
  // Temporal solution so the server does not shut down while playing a game

  const [health, setHealth] = useState("LOADING");

  const chechHealth = () => {
    setHealth("LOADING");
    fetch(BACKEND_HEALTH_URL)
      .then((res) => setHealth(res.ok ? "OK" : "ERROR"))
      .catch(() => setHealth("ERROR"));
  };

  useEffect(() => {
    chechHealth();
    const timer = setInterval(chechHealth, HEALTH_INTERVAL_MS);
    return () => clearTimeout(timer);
  }, []);

  return health;
};

export default useHealth;
