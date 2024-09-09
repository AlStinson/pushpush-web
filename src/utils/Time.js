export const UPDATE_PERIOD_MS = 100;

const MILLIS_IN_A_SECOND = 1000;
const SECONDS_IN_A_MINUTE = 60;

const SINGLE_DIGIT_NUMBER_LIMIT = 10;

const preattyPrint = (value) => {
  return value <= 0
    ? "00"
    : value < SINGLE_DIGIT_NUMBER_LIMIT
      ? `0${value}`
      : value;
};

export const timeFromMillis = (timeInMillis) => {
  const timeInSeconds = Math.ceil(timeInMillis / MILLIS_IN_A_SECOND);
  const seconds = timeInSeconds % SECONDS_IN_A_MINUTE;
  const minutes = Math.floor(timeInSeconds / SECONDS_IN_A_MINUTE);
  return `${preattyPrint(minutes)}:${preattyPrint(seconds)}`;
};
