const createRestUrl = (url) =>
  `${import.meta.env.VITE_BACKEND_REST_PROTOCOL}://${import.meta.env.VITE_BACKEND_HOST}${url}`;
const createWsUrl = (url) =>
  `${import.meta.env.VITE_BACKEND_WS_PROTOCOL}://${import.meta.env.VITE_BACKEND_HOST}${url}`;

export const BACKEND_MATCHMAKING_URL = createWsUrl("/v3/ws/matchmaking");
export const BACKEND_GAME_URL = (gameId, view) =>
  createWsUrl(`/v3/ws/game/${gameId}/${view}`);
export const BACKEND_CREATE_GAME_URL = createRestUrl("/v1/games");
export const BACKEND_HEALTH_URL = createRestUrl("/q/health");
