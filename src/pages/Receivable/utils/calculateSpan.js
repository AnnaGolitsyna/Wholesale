const calculateSpan = (length) => {
  if (length <= 1) return 24;
  const span = Math.floor(24 / length) - 1;
  return Math.max(span, 4);
};

export { calculateSpan };
