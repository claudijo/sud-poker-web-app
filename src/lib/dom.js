export const localCoordinatesFromMouseEvent = (event, scale = 1) => {
  const rect = event.target.getBoundingClientRect();
  const { clientX, clientY } = event;
  const x = (clientX - rect.x) / scale;
  const y = (clientY - rect.y) / scale;
  return { x, y };
};

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