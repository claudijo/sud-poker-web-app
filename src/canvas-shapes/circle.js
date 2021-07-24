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

  setBoundingBox(offset = { x: 0, y: 0 }) {
    this.left = this.x - offset.x - this.radius - this.lineWidth / 2;
    this.right = this.x + offset.x + this.radius + this.lineWidth / 2;
    this.top = this.y - offset.y - this.radius - this.lineWidth / 2;
    this.bottom = this.y + offset.y + this.radius + this.lineWidth / 2;
  }


  get path() {

  }

  getPath(offset = { x: 0, y: 0 }) {
    const path = new Path2D()
    path.arc(this.x + offset.x, this.y + offset.y, this.radius, 0, 2 * Math.PI);
    return path
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