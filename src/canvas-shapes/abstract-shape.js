export default class AbstractShape extends HTMLElement {
  static get observedAttributes() {
    return [
      'x',
      'y',
      'fillstyle',
      'strokestyle',
      'linewidth',
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
    return parseInt(this.getAttribute('x') ?? 0, 10);
  }

  set x(value) {
    this.setAttribute('x', value);
  }

  get y() {
    return parseInt(this.getAttribute('y') ?? 0, 10);
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

  fillAndStroke(ctx) {
    if (this.fillStyle !== null) {
      ctx.fillStyle = this.fillStyle;
      ctx.fill()
    }

    if (this.strokeStyle !== null) {
      ctx.strokeStyle = this.strokeStyle;
      ctx.lineWidth = this.lineWidth;
      ctx.stroke()
    }
  }
}