export const centerForPositions = (width, height, offsetX = 0, offsetY = 0) => {
  return [
    {x: width * 0.68, y: -68},
    {x: width + 44, y: height * 0.1},
    {x: width + 44, y: height * 0.73},
    {x: width * 0.85, y: height + 76},
    {x: width * 0.5, y: height + 76},
    {x: width * 0.15, y: height + 76},
    {x: -44, y: height * 0.73},
    {x: -44, y: height * 0.1},
    {x: width * 0.32, y: -68},
  ].map(item => ({
    x: item.x + offsetX,
    y: item.y + offsetY
  }))
}