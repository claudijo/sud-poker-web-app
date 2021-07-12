export default class AbstractShape extends HTMLElement {
    static get observedAttributes() {
        return [
            'x',
            'y',
            'fillStyle',
            'strokeStyle',
            'lineWidth',
        ];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        const customEvent = new CustomEvent('attributeChanged', {
            bubbles: true,
            detail: { name, oldValue, newValue }
        });
        this.dispatchEvent(customEvent);
    }

    connectedCallback() {
        console.log('Connected', this)
        const customEvent = new CustomEvent('connected', {
            bubbles: true,
        });
        this.dispatchEvent(customEvent);
    }

    get x() {
        return parseInt(this.getAttribute('x'), 10)
    }

    get y() {
        return parseInt(this.getAttribute('y'), 10)
    }

    set x(value) {
        this.setAttribute('x', value)
    }

    set y(value) {
        this.setAttribute('y', value)
    }

    get fillStyle() {
        return this.getAttribute('fillStyle')
    }

    set fillStyle(value) {
        this.setAttribute('fillStyle', value)
    }

    get strokeStyle() {
        return this.getAttribute('strokeStyle')
    }

    set strokeStyle(value) {
        this.setAttribute('strokeStyle', value)
    }

    get lineWidth() {
        return parseInt(this.getAttribute('lineWidth'), 10)
    }

    set lineWidth(value) {
        this.setAttribute('lineWidth', value)
    }

    draw(ctx, offset) {
        throw new Error('Draw method not implemented')
    }
}