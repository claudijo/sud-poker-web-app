import AbstractShape from './abstract-shape';
import { boxPoint } from '../lib/intersects';
import { measureText, parseFont, resizeAndRestore, textOffset } from '../lib/canvas';
import { memoize } from '../lib/memoize';
import { Lru } from '../lib/cache';
import React, { useState } from 'react';
import { cropEnd } from '../lib/text';

class Shape extends AbstractShape {
  static get observedAttributes() {
    return [
      ...AbstractShape.observedAttributes,
      'font',
      'textalign',
      'direction',
      'maxwidth',
    ];
  }

  constructor() {
    super();

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

  get maxWidth() {
    return parseFloat(this.getAttribute('maxWidth')) ?? Number.POSITIVE_INFINITY
  }

  set maxWidth(value) {
    this.setAttribute('maxWidth', value);
  }

  get width() {
    const canvas = this.getCanvas(
      this.textContent,
      this.font,
      this.textAlign,
      this.direction,
      this.fillStyle,
      this.strokeStyle,
      this.lineWidth,
      this.maxWidth,
    );
    return canvas.width;
  }

  get height() {
    const canvas = this.getCanvas(
      this.textContent,
      this.font,
      this.textAlign,
      this.direction,
      this.fillStyle,
      this.strokeStyle,
      this.lineWidth,
    );

    return canvas.height;
  }

  get getBoundingBox() {
    const x =  this.x + this.offset.x + this.originX * this.width;
    const y =  this.y + this.offset.y + this.originY * this.height;

    return {
      left: x,
      right: x + this.width ,
      top: y,
      bottom: y + this.height ,
    };
  }

  intersects(point) {
    const x =  this.x + this.offset.x + this.originX * this.width;
    const y =  this.y + this.offset.y + this.originY * this.height;

    return boxPoint(
      x,
      y,
      this.width,
      this.height,
      point.x,
      point.y,
    );
  }

  // Memoized in constructor
  getCanvas(text, font, textAlign, direction, fillStyle, strokeStyle, lineWidth, maxWidth) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.font = font;
    ctx.textAlign = textAlign;
    ctx.direction = direction;

    ctx.textBaseline = 'middle'

    if (fillStyle !== null) {
      ctx.fillStyle = fillStyle;
    }

    if (strokeStyle !== null) {
      ctx.strokeStyle = strokeStyle;
      ctx.lineWidth = lineWidth;
    }

    let { width, height, fontPixelSize, actualBoundingBoxAscent } = measureText(ctx, text);
    while (text !== '' && width > maxWidth) {
      text = cropEnd(text)
      const { width: newWidth } = measureText(ctx, text);
      width = newWidth;
    }

    resizeAndRestore(ctx, width + lineWidth, fontPixelSize + lineWidth);

    // Tricky as hell to get right cross browser, but this is good enough
    const centerY = actualBoundingBoxAscent / height * ctx.canvas.height

    if (fillStyle !== null) {
      ctx.fillText(text, 0,  centerY);
    }

    if (strokeStyle !== null) {
      ctx.lineWidth = lineWidth;
      ctx.strokeText(text, 0, centerY);
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
      this.maxWidth,
    );

    const x =  this.x + this.offset.x + this.originX * this.width;
    const y =  this.y + this.offset.y + this.originY * this.height;

    ctx.save()
    ctx.globalAlpha = this.globalAlpha

    ctx.drawImage(canvas, x, y);
    ctx.restore()
  }
}

customElements.get('canvas-text') || customElements.define('canvas-text', Shape);

const CanvasText = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <canvas-text
      {...props}
      ref={ref}
    >
      {children}
    </canvas-text>
  );
})

export default CanvasText

