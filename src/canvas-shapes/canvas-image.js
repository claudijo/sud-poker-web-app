import AbstractShape from './abstract-shape';
import { useEffect, useState } from 'react';

class Shape extends AbstractShape {
  constructor(args) {
    super();

    this.imageElement = null;
  }

  static get observedAttributes() {
    return [
      ...AbstractShape.observedAttributes,
      'width',
      'height',
      'source',
    ];
  }

  get width() {
    return parseInt(this.getAttribute('width'));
  }

  set width(value) {
    this.setAttribute('width', value);
  }

  get height() {
    return parseInt(this.getAttribute('height'));
  }

  set height(value) {
    this.setAttribute('height', value);
  }

  get source() {
    return this.getAttribute('source');
  }

  set source(value) {
    this.setAttribute('source', value);
  }

  getImageElement() {
    return new Promise(resolve => {
      if (this.imageElement) {
        resolve(this.imageElement);
        return;
      }

      const imageElement = new Image()
      imageElement.src = this.getAttribute('source')
      imageElement.onload = () => {
        this.imageElement = imageElement
        resolve(this.imageElement)
      }
    });
  }

  draw(ctx, offset = { x: 0, y: 0 }, isDrawingHitCanvas) {
    this.getImageElement()
      .then(image => {
        // const buffer = document.createElement('canvas');
        // buffer.width = image.width;
        // buffer.height = image.height;
        // const bx = buffer.getContext('2d');
        //
        // bx.fillStyle = '#FF0000'
        // bx.fillRect(0,0, buffer.width, buffer.height);
        //
        // bx.globalCompositeOperation = "destination-atop";
        // bx.drawImage(image, 0, 0);
        //
        // ctx.drawImage(buffer, this.x + offset.x, this.y + offset.y, this.width, this.height);

        ctx.drawImage(image, this.x + offset.x, this.y + offset.y, this.width, this.height);

      })
  }
}

customElements.get('canvas-image') || customElements.define('canvas-image', Shape);

export default function CanvasImage({ children, src, ...props }) {
  return (
    <canvas-image {...props}>
      {children}
    </canvas-image>
  );
}