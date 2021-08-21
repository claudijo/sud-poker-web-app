import AbstractShape from './abstract-shape';
import { boxPoint } from '../lib/intersects';

class Shape extends AbstractShape {
  static get observedAttributes() {
    return [
      ...AbstractShape.observedAttributes,
      'width',
      'height',
    ];
  }

  get height() {
    return parseInt(this.getAttribute('height'));
  }

  set height(value) {
    this.setAttribute('height', value);
  }

  get width() {
    return parseInt(this.getAttribute('width'));
  }

  set width(value) {
    this.setAttribute('width', value);
  }

  getBoundingBox() {
    const x = this.x + this.offset.x + this.originX * this.width;
    const y = this.y + this.offset.y + this.originY * this.height;

    return {
      left: x,
      right: x + this.width,
      top: y,
      bottom: y + this.height,
    };
  }

  intersects(point) {
    const x = this.x + this.offset.x + this.originX * this.width;
    const y = this.y + this.offset.y + this.originY * this.height;

    return boxPoint(
      x,
      y,
      this.width,
      this.height,
      point.x,
      point.y,
    );
  }

  draw(ctx, offset = { x: 0, y: 0 }) {
    const x =  this.x + this.offset.x + this.originX * this.width;
    const y =  this.y + this.offset.y + this.originY * this.height;

    ctx.beginPath();
    ctx.rect(x, y, this.width, this.height);
    this.fillAndStroke(ctx);
  }
}

customElements.get('canvas-rectangle') || customElements.define('canvas-rectangle', Shape);

export default function CanvasRectangle({ children, ...props }) {
  return (
    <canvas-rectangle {...props}>
      {children}
    </canvas-rectangle>
  );
}