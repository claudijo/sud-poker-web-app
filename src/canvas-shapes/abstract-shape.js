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
    return parseInt(this.getAttribute('x'), 10) ?? 0;
  }

  set x(value) {
    this.setAttribute('x', value);
  }

  get y() {
    return parseInt(this.getAttribute('y'), 10) ?? 0;
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
    return parseInt(this.getAttribute('lineWidth'), 10) ?? 0;
  }

  set lineWidth(value) {
    this.setAttribute('lineWidth', value);
  }

  getPath(ctx) {
    throw new Error('`getPath` method not implemented');
  }
}