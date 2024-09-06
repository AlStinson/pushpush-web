import { useStorage } from ".";
import createStorage from "./createStorage";

const initialState = { init: null, dir: null, normal: null };

const reducers = {
  setInit: (prevState, init) => ({ ...prevState, init }),
  setDir: (prevState, dir) => ({ ...prevState, dir }),
  setNormal: (prevState, normal) => ({ ...prevState, normal }),
  reset: () => initialState,
};

const LocalMoveStorage = createStorage(reducers, initialState);

export const useLocalMoveStorage = (selector) =>
  useStorage(LocalMoveStorage, selector);

export const localMoveActions = LocalMoveStorage.actions;