// From https://github.com/davidfig/intersects

// Some inspriation if implementing arc collision:
// https://stackoverflow.com/questions/6307114/android-2d-arc-collision-detection

export function circlePoint(x1, y1, r1, x2, y2) {
  const x = x2 - x1;
  const y = y2 - y1;
  return x * x + y * y <= r1 * r1;
}

export function boxPoint(x1, y1, w1, h1, x2, y2) {
  return x2 >= x1 && x2 <= x1 + w1 && y2 >= y1 && y2 <= y1 + h1;
}