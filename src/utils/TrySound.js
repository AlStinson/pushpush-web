const TrySound = (sound) => {
  new Audio(sound).play().catch(() => {});
};

export default TrySound;
