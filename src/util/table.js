export const centerForPositions = (width, height, offsetX = 0, offsetY = 0) => {
  return [
    {x: width * 0.68, y: -65},
    {x: width + 44, y: height * 0.1},
    {x: width + 44, y: height * 0.73},
    {x: width * 0.85, y: height + 71},
    {x: width * 0.5, y: height + 71},
    {x: width * 0.15, y: height + 71},
    {x: -44, y: height * 0.73},
    {x: -44, y: height * 0.1},
    {x: width * 0.32, y: -65},
  ].map(item => ({
    x: item.x + offsetX,
    y: item.y + offsetY
  }))
}

export const chipPositionOffset = (seatIndex, position) => {
  const { x, y } = position

  const yTop = 90
  const yTopMiddle = 60
  const yBottomMiddle = -50
  const yBottom = -128

  const xMiddleLeft = 20
  const xMiddle = 40
  const xMiddleRight = 144
  const xRight = 120

  switch (seatIndex) {
    case 0:
      return {x: x - xMiddleLeft, y: y + yTop}
    case 1:
      return {x: x - xMiddleRight, y: y + yTopMiddle}
    case 2:
      return {x: x - xRight, y: y + yBottomMiddle}
    case 3:
      return {x: x - xMiddle, y: y + yBottom}
    case 4:
      return {x, y: y + yBottom}
    case 5:
      return {x: x + xMiddle, y: y + yBottom}
    case 6: {
      return {x: x + xRight, y: y + yBottomMiddle}
    }
    case 7:
      return {x: x + xMiddleRight, y: y + yTopMiddle}
    case 8:
      return {x: x + xMiddleLeft, y: y + yTop}
    default:
      return {x, y}
  }
}

export const buttonPositionOffset = (seatIndex, position) => {
  const yOffset = 0 //10
  const xOffset = 48

  const { x, y } = chipPositionOffset(seatIndex, position)

  switch (seatIndex) {
    case 6:
    case 7:
    case 8:
      return { x: x - xOffset, y: y - yOffset}
    default:
      return { x: x + xOffset, y: y - yOffset}
  }
}

export const showCardsRtl = seatIndex => {
  return seatIndex >= 6 && seatIndex <= 7
}