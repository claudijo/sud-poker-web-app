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
  ctx.canvas.width = width ?? ctx.canvas.width;
  ctx.canvas.height = height ?? ctx.canvas.height;
  restore(ctx, state);
}

export function measureText(ctx, text) {
  const textMetrics = ctx.measureText(text)
  const width = Math.abs(textMetrics.actualBoundingBoxLeft) +
    Math.abs(textMetrics.actualBoundingBoxRight)
  const height = textMetrics.actualBoundingBoxAscent +
    textMetrics.actualBoundingBoxDescent
  const top = textMetrics.actualBoundingBoxAscent
  const left = textMetrics.actualBoundingBoxLeft
  return { width, height, top, left }
}