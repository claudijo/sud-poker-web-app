import AbstractShape from "./abstract-shape";

class Shape extends AbstractShape {
    static get observedAttributes() {
        return [
            ...AbstractShape.observedAttributes,
            'width',
            'height',
            'radius',
        ]
    }

    get width() {
        return parseInt(this.getAttribute('width'))
    }

    set width(value) {
        this.setAttribute('width', value)
    }

    get height() {
        return parseInt(this.getAttribute('height'), 10)
    }

    set height(value) {
        this.setAttribute('height', value)
    }

    get radius() {
        return parseInt(this.getAttribute('radius'), 10)
    }

    set radius(value) {
        this.setAttribute('radius', value)
    }

    draw(ctx, offset = {x: 0, y: 0}) {
        const x = this.x + offset.x
        const y = this.y + offset.y

        ctx.beginPath();
        ctx.moveTo(x + this.radius, y);
        ctx.arcTo(x + this.width, y, x + this.width, y + this.height, this.radius);
        ctx.arcTo(x + this.width, y + this.height, x, y + this.height, this.radius);
        ctx.arcTo(x, y + this.height, x, y, this.radius);
        ctx.arcTo(x, y, x + this.width, y, this.radius);
        ctx.closePath();
    }
}

customElements.get('canvas-rounded-rectangle') || customElements.define('canvas-rounded-rectangle', Shape);

export default function RoundedRectangle({ children, ...props}) {
    return (
        <canvas-rounded-rectangle {...props}>
            {children}
        </canvas-rounded-rectangle>
    )
}
