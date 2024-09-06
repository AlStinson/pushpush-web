import { useCallback, useSyncExternalStore } from "react";

import useConst from "../hooks/useConst";

export const createStorage = (reducers, initialState = {}) => {
  let state = initialState;
  const listeners = new Set();

  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  const getSnapshot = () => state;

  const dispath = (reducer, payload) => {
    state = reducer(state, payload);
    listeners.forEach((listener) => listener());
  };

  const actions = {};
  for (const actionName in reducers) {
    actions[actionName] = (payload) => dispath(reducers[actionName], payload);
  }

  return { subscribe, getSnapshot, actions };
};

export const useStorage = (storage, selectorProp) => {
  const selector = useConst(selectorProp);

  const getLocalSnapshot = useCallback(
    () => selector(storage.getSnapshot()),
    [storage, selector],
  );

  return useSyncExternalStore(storage.subscribe, getLocalSnapshot);
};
