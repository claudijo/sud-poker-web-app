export default class AbstractShape extends HTMLElement {
  static get observedAttributes() {
    return [
      'x',
      'y',
      'fillstyle',
      'strokestyle',
      'linewidth',
      'shadowcolor',
      'shadowblur',
      'shadowoffsetx',
      'shadowoffsety',
      'globalalpha',
      'originx',
      'originy',
      'rotation',
    ];
  }

  constructor() {
    super();
    this.offset = { x: 0, y: 0 }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const customEvent = new CustomEvent('attributeChanged', {
      bubbles: true,
      detail: { name, oldValue, newValue },
    });
    this.dispatchEvent(customEvent);
  }

  connectedCallback() {
    const customEvent = new CustomEvent('connected', {
      bubbles: true,
    });
    this.dispatchEvent(customEvent);
  }

  get x() {
    return parseFloat(this.getAttribute('x') ?? 0);
  }

  set x(value) {
    this.setAttribute('x', value);
  }

  get y() {
    return parseFloat(this.getAttribute('y') ?? 0);
  }

  set y(value) {
    this.setAttribute('y', value);
  }

  get fillStyle() {
    return this.getAttribute('fillStyle');
  }

  set fillStyle(value) {
    this.setAttribute('fillStyle', value);
  }

  get strokeStyle() {
    return this.getAttribute('strokeStyle');
  }

  set strokeStyle(value) {
    this.setAttribute('strokeStyle', value);
  }

  get lineWidth() {
    return parseInt(this.getAttribute('lineWidth') ?? 0, 10);
  }

  set lineWidth(value) {
    this.setAttribute('lineWidth', value);
  }

  get shadowColor() {
    return this.getAttribute('shadowColor');
  }

  set shadowColor(value) {
    this.setAttribute('shadowColor', value);
  }

  get shadowBlur() {
    return parseInt(this.getAttribute('shadowBlur') ?? 0, 10);
  }

  set shadowBlur(value) {
    this.setAttribute('shadowBlur', value);
  }

  get shadowOffsetX() {
    return parseInt(this.getAttribute('shadowOffsetX') ?? 0, 10);
  }

  set shadowOffsetX(value) {
    this.setAttribute('shadowOffsetX', value);
  }

  get shadowOffsetY() {
    return parseInt(this.getAttribute('shadowOffsetY') ?? 0, 10);
  }

  set shadowOffsetY(value) {
    this.setAttribute('shadowOffsetY', value);
  }

  get globalAlpha() {
    return parseFloat(this.getAttribute('globalAlpha') ?? '1');
  }

  set globalAlpha(value) {
    this.setAttribute('globalAlpha', value);
  }

  get originX() {
    return parseFloat(this.getAttribute('originX') ?? 0);
  }

  set originX(value) {
    this.setAttribute('originX', value);
  }

  get originY() {
    return parseFloat(this.getAttribute('originY') ?? 0);
  }

  set originY(value) {
    this.setAttribute('originY', value);
  }

  get rotation() {
    return parseFloat(this.getAttribute('rotation') ?? 0);
  }

  set rotation(value) {
    this.setAttribute('rotation', value);
  }

  fillAndStroke(ctx) {
    ctx.save()

    if (this.globalAlpha !== null) {
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

    if (this.fillStyle !== null) {
      ctx.fillStyle = this.fillStyle;
      ctx.fill()
    }

    if (this.strokeStyle !== null) {
      ctx.strokeStyle = this.strokeStyle;
      ctx.lineWidth = this.lineWidth;
      ctx.stroke()
    }

    ctx.restore()
  }
}