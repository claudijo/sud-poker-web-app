import AbstractShape from './abstract-shape';
import { boxPoint } from '../lib/intersects';
import { measureText, resizeAndRestore } from '../lib/canvas';
import { memoize } from '../lib/memoize';
import { Lru } from '../lib/cache';
import { useEffect, useRef } from 'react';

class Shape extends AbstractShape {
  static get observedAttributes() {
    return [
      ...AbstractShape.observedAttributes,
      'font',
      'textalign',
      'textbaseline',
      'direction',
    ];
  }

  constructor() {
    super();

    this._width = 0;
    this._height = 0;
    this.getCanvas = memoize(this.getCanvas.bind(this), new Lru());
  }

  get font() {
    return this.getAttribute('font') ?? '10px sans-serif';
  }

  set font(value) {
    this.setAttribute('font', value);
  }

  get textAlign() {
    return this.getAttribute('textAlign') ?? 'start';
  }

  set textAlign(value) {
    this.setAttribute('textAlign', value);
  }

  get direction() {
    return this.getAttribute('direction') ?? 'inherit';
  }

  set direction(value) {
    this.setAttribute('direction', value);
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height
  }

  get getBoundingBox() {
    return {
      left: this.x + this.offset.x,
      right: this.x + this.width + this.offset.x,
      top: this.y + this.offset.y,
      bottom: this.y + this.height + this.offset.y,
    };
  }

  intersects(point) {
    return boxPoint(
      this.x + this.offset.x,
      this.y + this.offset.y,
      this.width,
      this.height,
      point.x,
      point.y,
    );
  }

  // Will be memoized
  getCanvas(text, font, textAlign, direction, fillStyle, strokeStyle, lineWidth) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.font = font;
    ctx.textAlign = textAlign;
    ctx.direction = direction;

    if (fillStyle !== null) {
      ctx.fillStyle = fillStyle;
    }

    if (strokeStyle !== null) {
      ctx.strokeStyle = strokeStyle;
      ctx.lineWidth = lineWidth;
    }

    const { width, height, top, left } = measureText(ctx, text);

    this._width = width;
    this._height = height;

    resizeAndRestore(ctx, width + lineWidth, height + lineWidth);

    if (fillStyle !== null) {
      ctx.fillText(text, left + lineWidth / 2, top + lineWidth / 2);
    }

    if (strokeStyle !== null) {
      ctx.lineWidth = lineWidth;
      ctx.strokeText(text, left + lineWidth / 2, top + lineWidth / 2);
    }

    return canvas;
  }

  draw(ctx) {
    const canvas = this.getCanvas(
      this.textContent,
      this.font,
      this.textAlign,
      this.direction,
      this.fillStyle,
      this.strokeStyle,
      this.lineWidth,
    );

    ctx.drawImage(canvas, this.x + this.offset.x, this.y + this.offset.y);
  }
}

customElements.get('canvas-text') || customElements.define('canvas-text', Shape);

export default function CanvasText({ children, ...props }) {

  const elemRef = useRef(null)

  useEffect(() => {
    console.log(elemRef.current)
  })


  return (
    <canvas-text ref={elemRef} {...props} >
      {children}
    </canvas-text>
  );
}