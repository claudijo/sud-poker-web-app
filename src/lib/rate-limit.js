
export const throttle = fn => {
  let tick = false;
  return (...args) => {
    if (!tick) {
      requestAnimationFrame(() => {
        fn(...args);
        tick = false;
      });
    }
    tick = true;
  };
};

export const debounce = fn => {
  let timeout;
  return (...args) => {
    if (timeout) {
      cancelAnimationFrame(timeout);
    }
    timeout = requestAnimationFrame(() => {
      fn(...args);
    });
  };
}