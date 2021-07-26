import AbstractShape from './abstract-shape';

class Shape extends AbstractShape {
  static get observedAttributes() {
    return [
      ...AbstractShape.observedAttributes,
      'radius',
    ];
  }

  get radius() {
    return parseInt(this.getAttribute('radius'));
  }

  set radius(value) {
    this.setAttribute('radius', value);
  }

  getBoundingBox() {
    return {
      left: this.x + this.offset.x - this.radius - this.lineWidth / 2,
      right: this.x + this.offset.x + this.radius + this.lineWidth / 2,
      top: this.y + this.offset.y - this.radius - this.lineWidth / 2,
      bottom: this.y + this.offset.y + this.radius + this.lineWidth / 2,
    }
  }

  intersects(point) {
    const x = point.x - this.x + this.offset.x
    const y = point.y - this.y + this.offset.y
    const radius = this.radius + this.lineWidth / 2
    return x * x + y * y <= radius * radius
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x + this.offset.x, this.y + this.offset.y, this.radius, 0, 2 * Math.PI);

    this.fillAndStroke(ctx)
  }
}

customElements.get('canvas-circle') || customElements.define('canvas-circle', Shape);

export default function CanvasCircle({ children, ...props }) {
  return (
    <canvas-circle {...props}>
      {children}
    </canvas-circle>
  );
}