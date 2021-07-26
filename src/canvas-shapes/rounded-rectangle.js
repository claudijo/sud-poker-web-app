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
    return parseInt(this.getAttribute('width'));
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
    return {
      left: this.x + this.offset.x - this.lineWidth / 2,
      right: this.x + this.width + this.offset.x + this.lineWidth / 2,
      top: this.y + this.offset.y - this.lineWidth / 2,
      bottom: this.y + this.height + this.offset.y + this.lineWidth / 2,
    };
  }

  intersects(point) {
    return circlePoint(
      this.x + this.offset.x + this.radius,
      this.y + this.offset.y + this.radius,
      this.radius + this.lineWidth / 2,
      point.x,
      point.y,
      )
      || circlePoint(
        this.x + this.offset.x + this.width - this.radius,
        this.y + this.offset.y + this.radius,
        this.radius + this.lineWidth / 2,
        point.x,
        point.y,
      )
      || circlePoint(
        this.x + this.offset.x + this.radius,
        this.y + this.offset.y + this.height - this.radius,
        this.radius + this.lineWidth / 2,
        point.x,
        point.y,
      )
      || circlePoint(
        this.x + this.offset.x + this.width - this.radius,
        this.y + this.offset.y + this.height - this.radius,
        this.radius + this.lineWidth / 2,
        point.x,
        point.y,
      )
      || boxPoint(
        this.x + this.offset.x + this.radius,
        this.y + this.offset.y - this.lineWidth / 2,
        this.width - this.radius * 2,
        this.height + this.lineWidth,
        point.x,
        point.y,
      )
      || boxPoint(
        this.x + this.offset.x - this.lineWidth / 2,
        this.y + this.offset.y + this.radius,
        this.width + this.lineWidth,
        this.height - this.radius * 2,
        point.x,
        point.y,
      );
  }

  draw(ctx, offset = { x: 0, y: 0 }) {
    const x = this.x + offset.x;
    const y = this.y + offset.y;

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
