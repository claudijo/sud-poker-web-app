import AbstractShape from './abstract-shape';
import { circlePoint } from '../lib/intersects';

class Shape extends AbstractShape {
  static get observedAttributes() {
    return [
      ...AbstractShape.observedAttributes,
      'radius',
      'startangle',
      'endangle',
      'anticlockwise'
    ];
  }

  get radius() {
    return parseFloat(this.getAttribute('radius')) ?? 0;
  }

  set radius(value) {
    this.setAttribute('radius', value);
  }

  get startAngle() {
    return parseFloat(this.getAttribute('startAngle')) ?? 0;
  }

  set startAngle(value) {
    this.setAttribute('startAngle', value);
  }

  get endAngle() {
    return parseFloat(this.getAttribute('endAngle')) ?? 0;
  }

  set endAngle(value) {
    this.setAttribute('endAngle', value);
  }

  get anticlockwise() {
    return this.hasAttribute('anticlockwise');
  }

  set anticlockwise(value) {
    if (value) {
      this.setAttribute('anticlockwise', '');
    } else {
      this.removeAttribute('anticlockwise')
    }
  }

  getBoundingBox() {
    return {
      left: this.x + this.offset.x - this.radius - this.lineWidth / 2,
      right: this.x + this.offset.x + this.radius + this.lineWidth / 2,
      top: this.y + this.offset.y - this.radius - this.lineWidth / 2,
      bottom: this.y + this.offset.y + this.radius + this.lineWidth / 2,
    };
  }

  intersects(point) {
    return circlePoint(
      this.x + this.offset.x,
      this.y + this.offset.y,
      this.radius + this.lineWidth / 2,
      point.x,
      point.y,
    );
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x + this.offset.x, this.y + this.offset.y, this.radius, this.startAngle, this.endAngle, this.anticlockwise);

    this.fillAndStroke(ctx);
  }
}

customElements.get('canvas-arc') || customElements.define('canvas-arc', Shape);

export default function CanvasArc({ children, ...props }) {
  return (
    <canvas-arc {...props}>
      {children}
    </canvas-arc>
  );
}