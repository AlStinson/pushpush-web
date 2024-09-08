import { createStorage, useStorage } from ".";

const initialState = null;

const reducers = {
  set: (prevState, value) => value,
};

const RotationStorage = createStorage(reducers, initialState);

export const useRotationStorage = (selector) =>
  useStorage(RotationStorage, selector);

export const rotationActions = RotationStorage.actions;
