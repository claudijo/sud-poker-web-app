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

  getImageElement() {
    return new Promise(resolve => {
      if (this.imageElement) {
        resolve(this.imageElement);
        return;
      }

      const imageElement = new Image();

      imageElement.onload = () => {
        this.imageElement = imageElement;
        resolve(this.imageElement);
      };

      imageElement.src = this.getAttribute('source');
    });
  }

  draw(ctx) {
    this.getImageElement()
      .then(image => {
        ctx.save()

        const x = this.x + this.offset.x + this.originX * this.width;
        const y = this.y + this.offset.y + this.originY * this.height;

        if (this.rotation !== 0) {
          // Maybe make add something like centerXOffset and centerYOffset
          const { top, left } = this.getBoundingBox()

          ctx.translate(left, top)
          ctx.rotate(this.rotation)
          ctx.translate(-left, -top)
        }

        // This does not work if calling this.fillAndStroke(ctx), since draw
        // image must come after ctx.save() and before ctx.restore(),so put it
        // explicitly here
        if (this.globalAlpha !== 1) {
          ctx.globalAlpha = this.globalAlpha
        }

        if (this.shadowColor !== null) {
          ctx.shadowColor = this.shadowColor
        }

        if (this.shadowBlur !== 0) {
          ctx.shadowBlur = this.shadowBlur
        }

        if (this.shadowOffsetX !== 0) {
          ctx.shadowOffsetX = this.shadowOffsetX
        }

        if (this.shadowOffsetY !== 0) {
          ctx.shadowOffsetY = this.shadowOffsetY;
        }

        ctx.drawImage(image, x, y, this.width, this.height);
        ctx.restore();
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