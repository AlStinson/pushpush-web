import { useEffect, useState } from "react";

const useHealth = () => {
  // Temporal solution so the server does not shut down while playing a game

  const [health, setHealth] = useState("LOADING");

  const chechHealth = () => {
    setHealth("LOADING");
    fetch(import.meta.env.VITE_BACKEND_HEALTH)
      .then((res) => setHealth(res.ok ? "OK" : "ERROR"))
      .catch(() => setHealth("ERROR"));
  };

  useEffect(() => {
    chechHealth();
    const timer = setInterval(chechHealth, 60000);
    return () => clearTimeout(timer);
  }, []);

  return health;
};

export default useHealth;
