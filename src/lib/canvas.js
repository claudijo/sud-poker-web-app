import { memoize } from './memoize';
import { Lru } from './cache';

function save(ctx) {
  const props = ['strokeStyle', 'fillStyle', 'globalAlpha', 'lineWidth',
    'lineCap', 'lineJoin', 'miterLimit', 'lineDashOffset', 'shadowOffsetX',
    'shadowOffsetY', 'shadowBlur', 'shadowColor', 'globalCompositeOperation',
    'font', 'textAlign', 'textBaseline', 'direction', 'imageSmoothingEnabled'];
  const state = {};
  for (let prop of props) {
    state[prop] = ctx[prop];
  }
  return state;
}

function restore(ctx, state) {
  for (let prop in state) {
    ctx[prop] = state[prop];
  }
}

export function resizeAndRestore(ctx, width, height) {
  const state = save(ctx);
  ctx.canvas.width = Math.ceil(width ?? ctx.canvas.width);
  ctx.canvas.height = Math.ceil(height ?? ctx.canvas.height);
  restore(ctx, state);
}

export function measureText(ctx, text) {
  const textMetrics = ctx.measureText(text);
  const { fontSize } = parseFont(ctx.font);

  const height = textMetrics.actualBoundingBoxAscent +
    textMetrics.actualBoundingBoxDescent;

  const width = Math.abs(textMetrics.actualBoundingBoxLeft) +
    Math.abs(textMetrics.actualBoundingBoxRight);

  return {
    width,
    height,
    fontPixelSize: parseFloat(fontSize),
    fontBoundingBoxAscent: textMetrics.fontBoundingBoxAscent,
    fontBoundingBoxDescent: textMetrics.fontBoundingBoxDescent,
    actualBoundingBoxAscent: textMetrics.actualBoundingBoxAscent,
    actualBoundingBoxDescent: textMetrics.actualBoundingBoxDescent,
  };
}

export const parseFont = memoize(font => {
  const el = document.createElement('span');
  el.setAttribute('style', `font: ${font}`);

  return {
    fontFamily: el.style.fontFamily,
    font: el.style.font,
    fontSize: el.style.fontSize,
  };
}, new Lru());