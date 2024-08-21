import { bool, number, shape } from "prop-types";

export const emptyMove = { init: null, dir: null, normal: null };
export const vectorProps = shape({ x: number, y: number });
export const moveProps = shape({
  init: vectorProps,
  dir: vectorProps,
  normal: bool,
});
