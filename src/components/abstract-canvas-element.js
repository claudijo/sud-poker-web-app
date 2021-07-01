export default class AbstractCanvasElement extends HTMLElement {

    static get observedAttributes() {
        return ['x', 'y', 'fillStyle'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        const updateEvent = new CustomEvent('update', {
            bubbles: true,
            detail: { name, oldValue, newValue }
        });
        this.dispatchEvent(updateEvent);
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

    draw(ctx, offset) {
        throw new Error('Draw method not implemented')
    }

    intersects(x, y) {
        throw new Error('Intersects method not implemented')
    }
}