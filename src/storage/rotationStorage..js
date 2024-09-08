import { createStorage, useStorage } from ".";

const initialState = false;

const reducers = {
  rotate: (prevState) => !prevState,
};

const RotationStorage = createStorage(reducers, initialState);

export const useRotationStorage = (selector) =>
  useStorage(RotationStorage, selector);

export const rotationActions = RotationStorage.actions;
