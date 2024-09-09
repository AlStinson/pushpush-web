import { createStorage } from ".";

const initialState = { paused: null, millisLeft: null, lastUpdate: null };

const reducers = {
  setLastUpdate: (prevState, lastUpdate) => ({ ...prevState, lastUpdate }),
  setPaused: (prevState, paused) => ({ ...prevState, paused }),
  reduceMillis: (prevState, time) => ({
    ...prevState,
    millisLeft: Math.max(0, prevState.millisLeft - time),
  }),
  setRemainingTime: (prevState, millisLeft) => ({ ...prevState, millisLeft }),
  pause: (prevState) => ({ ...prevState, paused: true }),
  resume: (prevState) => ({
    ...prevState,
    lastUpdate: prevState.paused ? new Date() : prevState.lastUpdate,
    paused: false,
  }),
};

export const WhiteClockStorage = createStorage(reducers, initialState);
export const BlackClockStorage = createStorage(reducers, initialState);
