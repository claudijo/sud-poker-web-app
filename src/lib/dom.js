export const localCoordinatesFromMouseEvent = (event, scale = 1) => {
  const rect = event.target.getBoundingClientRect();
  const { clientX, clientY } = event;
  const x = (clientX - rect.x) / scale;
  const y = (clientY - rect.y) / scale;
  return { x, y };
};
