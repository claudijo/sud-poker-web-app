import AbstractShape from './abstract-shape';
import { boxPoint, circlePoint } from '../lib/intersects';

class Shape extends AbstractShape {
  static get observedAttributes() {
    return [
      ...AbstractShape.observedAttributes,
      'width',
      'height',
      'radius',
    ];
  }

  get width() {
    return parseInt(this.getAttribute('width') ?? 0, 10);
  }

  set width(value) {
    this.setAttribute('width', value);
  }

  get height() {
    return parseInt(this.getAttribute('height') ?? 0, 10);
  }

  set height(value) {
    this.setAttribute('height', value);
  }

  get radius() {
    return parseInt(this.getAttribute('radius') ?? 0, 10);
  }

  set radius(value) {
    this.setAttribute('radius', value);
  }

  getBoundingBox() {
    const x = this.x + this.offset.x + this.originX * this.width;
    const y = this.y + this.offset.y + this.originY * this.height;

    return {
      left: x - this.lineWidth / 2,
      right: x  + this.width + this.lineWidth / 2,
      top: y - this.lineWidth / 2,
      bottom: y + this.height  + this.lineWidth / 2,
    };
  }

  intersects(point) {
    const x = this.x + this.offset.x + this.originX * this.width;
    const y = this.y + this.offset.y + this.originY * this.height;

    return circlePoint(
      x +  this.radius,
      y + this.radius,
      this.radius + this.lineWidth / 2,
      point.x,
      point.y,
      )
      || circlePoint(
        x + this.width - this.radius,
        y + this.radius,
        this.radius + this.lineWidth / 2,
        point.x,
        point.y,
      )
      || circlePoint(
        x + this.radius,
        y + this.height - this.radius,
        this.radius + this.lineWidth / 2,
        point.x,
        point.y,
      )
      || circlePoint(
        x + this.width - this.radius,
        y + this.height - this.radius,
        this.radius + this.lineWidth / 2,
        point.x,
        point.y,
      )
      || boxPoint(
        x + this.radius,
        y - this.lineWidth / 2,
        this.width - this.radius * 2,
        this.height + this.lineWidth,
        point.x,
        point.y,
      )
      || boxPoint(
        x - this.lineWidth / 2,
        y + this.radius,
        this.width + this.lineWidth,
        this.height - this.radius * 2,
        point.x,
        point.y,
      );
  }

  draw(ctx, offset = { x: 0, y: 0 }) {
    const x =  this.x + this.offset.x + this.originX * this.width;
    const y =  this.y + this.offset.y + this.originY * this.height;

    ctx.beginPath();
    ctx.moveTo(x + this.radius, y);
    ctx.arcTo(x + this.width, y, x + this.width, y + this.height, this.radius);
    ctx.arcTo(x + this.width, y + this.height, x, y + this.height, this.radius);
    ctx.arcTo(x, y + this.height, x, y, this.radius);
    ctx.arcTo(x, y, x + this.width, y, this.radius);
    ctx.closePath();

    this.fillAndStroke(ctx);
  }
}

customElements.get('canvas-rounded-rectangle') || customElements.define('canvas-rounded-rectangle', Shape);

export default function RoundedRectangle({ children, ...props }) {
  return (
    <canvas-rounded-rectangle {...props}>
      {children}
    </canvas-rounded-rectangle>
  );
}
