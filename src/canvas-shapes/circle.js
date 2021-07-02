import AbstractShape from './abstract-shape';

class Shape extends AbstractShape {
    static get observedAttributes() {
        return [
            ...AbstractShape.observedAttributes,
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
    }
}

customElements.get('canvas-circle') || customElements.define('canvas-circle', Shape);

export default function Circle({children, ...props}) {
    return (
        <canvas-circle {...props}>
            {children}
        </canvas-circle>
    )
}