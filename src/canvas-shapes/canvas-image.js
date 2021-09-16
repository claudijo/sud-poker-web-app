import AbstractShape from './abstract-shape';
import { boxPoint } from '../lib/intersects';
import { Lru } from '../lib/cache';

class Shape extends AbstractShape {
  constructor(args) {
    super();

    this.imageElement = null;
    this.images = new Map();
    this.imageCache = new Lru()
  }

  static get observedAttributes() {
    return [
      ...AbstractShape.observedAttributes,
      'width',
      'height',
      'source',
      'src',
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

  get src() {
    return this.getAttribute('src');
  }

  set src(value) {
    this.setAttribute('src', value);
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

  draw(ctx) {
    if (!this.src) {
      return;
    }

    const image = this.imageCache.read(this.src);

    if (!image) {
      const newImage = new Image();
      newImage.onload = () => {
        const customEvent = new CustomEvent('load', {
          bubbles: true,
        });
        this.dispatchEvent(customEvent);
      }
      newImage.src = this.src;
      this.imageCache.write(this.src, newImage);
      return;
    }

    if (!image.complete) {
      return;
    }

    ctx.save();

    const x = this.x + this.offset.x + this.originX * this.width;
    const y = this.y + this.offset.y + this.originY * this.height;

    if (this.rotation !== 0) {
      const { top, left } = this.getBoundingBox();

      const translateX = left + this.width * this.originX
      const translateY = top + this.height * this.originY

      ctx.translate(translateX, translateY);
      ctx.rotate(this.rotation);
      ctx.translate(-translateX, -translateY);
    }

    // This does not work if calling this.fillAndStroke(ctx), since draw
    // image must come after ctx.save() and before ctx.restore(),so put it
    // explicitly here
    if (this.globalAlpha !== 1) {
      ctx.globalAlpha = this.globalAlpha;
    }

    if (this.shadowColor !== null) {
      ctx.shadowColor = this.shadowColor;
    }

    if (this.shadowBlur !== 0) {
      ctx.shadowBlur = this.shadowBlur;
    }

    if (this.shadowOffsetX !== 0) {
      ctx.shadowOffsetX = this.shadowOffsetX;
    }

    if (this.shadowOffsetY !== 0) {
      ctx.shadowOffsetY = this.shadowOffsetY;
    }

    if (this.scaleX !== 1 || this.scaleY !== 1) {
      const { top, left } = this.getBoundingBox();

      const translateX = left + this.width * this.originX
      const translateY = top + this.height * this.originY
      ctx.translate(translateX, translateY);
      ctx.scale(this.scaleX, this.scaleY);
      ctx.translate(-translateX, -translateY);
    }

    ctx.drawImage(image, x, y, this.width, this.height);

    // Reset current transformation matrix to the identity matrix when scaling
    // ctx.setTransform(1, 0, 0, 1, 0, 0);

    ctx.restore();
  }
}

customElements.get('canvas-image') || customElements.define('canvas-image', Shape);

export default function CanvasImage({ children, ...props }) {
  return (
    <canvas-image {...props}>
      {children}
    </canvas-image>
  );
}