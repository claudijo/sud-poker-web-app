import AbstractShape from './abstract-shape';
import { boxPoint } from '../lib/intersects';

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
    return parseInt(this.getAttribute('width'), 10);
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

  getBoundingBox() {
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
      point.y
    )
  }

  getImageElement() {
    return new Promise(resolve => {
      if (this.imageElement) {
        resolve(this.imageElement);
        return;
      }

      const imageElement = new Image();
      imageElement.src = this.getAttribute('source');
      imageElement.onload = () => {
        this.imageElement = imageElement;
        resolve(this.imageElement);
      };
    });
  }

  draw(ctx) {
    this.getImageElement()
      .then(image => {
        ctx.drawImage(image, this.x + this.offset.x, this.y + this.offset.y, this.width, this.height);
        this.fillAndStroke(ctx)
      });
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