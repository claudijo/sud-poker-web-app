import AbstractShape from './abstract-shape';

class Shape extends AbstractShape {
    static get observedAttributes() {
        return [
            ...AbstractShape.observedAttributes,
            'width',
            'height',
        ]
    }

    get height() {
        return parseInt(this.getAttribute('height'))
    }

    set height(value) {
        this.setAttribute('height', value)
    }

    get width() {
        return parseInt(this.getAttribute('width'))
    }

    set width(value) {
        this.setAttribute('width', value)
    }

    draw(ctx, offset = { x: 0, y: 0}) {
        ctx.beginPath();
        ctx.rect(this.x + offset.x, this.y + offset.y, this.width, this.height);
    }
}

customElements.get('canvas-rectangle') || customElements.define('canvas-rectangle', Shape);

export default function CanvasRectangle({children, ...props}) {
    return (
        <canvas-rectangle {...props}>
            {children}
        </canvas-rectangle>
    )
}