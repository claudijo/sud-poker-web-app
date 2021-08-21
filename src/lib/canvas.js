function save(ctx){
  const props = ['strokeStyle', 'fillStyle', 'globalAlpha', 'lineWidth',
    'lineCap', 'lineJoin', 'miterLimit', 'lineDashOffset', 'shadowOffsetX',
    'shadowOffsetY', 'shadowBlur', 'shadowColor', 'globalCompositeOperation',
    'font', 'textAlign', 'textBaseline', 'direction', 'imageSmoothingEnabled'];
  const state = {}
  for(let prop of props){
    state[prop] = ctx[prop];
  }
  return state;
}

function restore(ctx, state){
  for(let prop in state){
    ctx[prop] = state[prop];
  }
}

export function resizeAndRestore(ctx, width, height){
  const state = save(ctx);
  ctx.canvas.width = Math.ceil(width ?? ctx.canvas.width);
  ctx.canvas.height = Math.ceil(height ?? ctx.canvas.height);
  restore(ctx, state);
}

export function measureText(ctx, text) {
  const { width } = ctx.measureText(text)
  const fontHeightMatch = ctx.font.match(/(\d+\.?\d*)\s*px/)
  const fontHeight = parseFloat(fontHeightMatch?.[1] ?? '10')

  return {
    width,
    fontHeight,
  }

  // const width = Math.abs(textMetrics.actualBoundingBoxLeft) +
  //   Math.abs(textMetrics.actualBoundingBoxRight)
  // const height = textMetrics.actualBoundingBoxAscent +
  //   textMetrics.actualBoundingBoxDescent
  // const fontHeight = textMetrics.fontBoundingBoxAscent +
  //   textMetrics.fontBoundingBoxDescent;
  // const top = textMetrics.actualBoundingBoxAscent
  // const left = textMetrics.actualBoundingBoxLeft
  // const bottom = textMetrics.fontBoundingBoxDescent;
  // return { width, height, top, left, bottom }
}