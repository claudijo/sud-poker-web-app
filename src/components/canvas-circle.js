import AbstractCanvasElement from './abstract-canvas-element';

class CanvasElement extends AbstractCanvasElement {
    static get observedAttributes() {
        return [
            ...AbstractCanvasElement.observedAttributes,
            'radius',
        ]
    }

    get radius() {
        return parseInt(this.getAttribute('radius'))
    }

    set radius(value) {
        this.setAttribute('radius', value)
    }

    draw(ctx, offset = { x: 0, y: 0}) {
        ctx.beginPath();
        ctx.arc(this.x + offset.x, this.y + offset.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.fillStyle
        ctx.fill()
    }
}

customElements.get('canvas-circle') || customElements.define('canvas-circle', CanvasElement);

export default function CanvasCircle({children, ...props}) {
    return (
        <canvas-circle {...props}>
            {children}
        </canvas-circle>
    )
}