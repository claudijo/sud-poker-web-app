import AbstractCanvasElement from './abstract-canvas-element';

class CanvasElement extends AbstractCanvasElement {
    static get observedAttributes() {
        return [
            ...AbstractCanvasElement.observedAttributes,
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
        ctx.fillStyle = this.fillStyle
        ctx.fill()
    }
}

customElements.get('canvas-rectangle') || customElements.define('canvas-rectangle', CanvasElement);

export default function CanvasRectangle({x, y, width, height, fillStyle, children}) {
    return (
        <canvas-rectangle x={x} y={y} width={width} height={height} fillStyle={fillStyle}>
            {children}
        </canvas-rectangle>
    )
}