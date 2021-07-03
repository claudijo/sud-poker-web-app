import {useEffect, useRef, useCallback} from "react";
import {localCoordinatesFromMouseEvent, throttleEventHandler} from "../lib/dom";
import {getRandomColor} from "../lib/color";
import styles from './canvas.module.css'

export default function Canvas({children, width, height, interactive}) {
    const canvasElement = useRef(null);
    const hitCanvas = useRef(null)
    const colorMap = useRef(new Map())

    useEffect(() => {
        if (interactive) {
            const canvas = document.createElement('canvas')
            canvas.width = width
            canvas.height = height
            hitCanvas.current = canvas
        } else {
            hitCanvas.current = null
        }
    }, [interactive, width, height])

    const drawChildren = useCallback((ctx, hitCtx, children, offset = {x: 0, y: 0}) => {
        ctx.save();

        Array.from(children).forEach(child => {
            child.draw(ctx, offset)

            if (child.fillStyle !== null) {
                ctx.fillStyle = child.fillStyle
                ctx.fill()
            }

            if (child.strokeStyle !== null) {
                ctx.strokeStyle = child.strokeStyle
                ctx.lineWidth = child.lineWidth ?? 0
                ctx.stroke()
            }

            if (hitCtx !== null) {
                let uniqueColor = getRandomColor()
                while (colorMap.current.has(uniqueColor)) {
                    uniqueColor = getRandomColor()
                }

                child.draw(hitCtx, offset)

                if (child.fillStyle !== undefined) {
                    hitCtx.fillStyle = uniqueColor;
                    hitCtx.fill();
                }

                if (child.strokeStyle !== undefined) {
                    hitCtx.strokeStyle = uniqueColor;
                    hitCtx.stroke();
                }

                colorMap.current.set(uniqueColor, { element: child })
            }

            ctx.restore();

            if (child.children.length > 0) {
                drawChildren(ctx, hitCtx, child.children, {
                    x: offset.x + child.x,
                    y: offset.y + child.y,
                })
            }
        })
    }, [])

    useEffect(() => {
        const canvas = canvasElement.current
        const ctx = canvas.getContext('2d')
        const hitCtx = hitCanvas.current !== null
            ? hitCanvas.current.getContext('2d')
            : null

        drawChildren(ctx, hitCtx, canvas.children)

        const onUpdate = (event) => {
            ctx.clearRect(0, 0, canvasElement.current.width, canvasElement.current.height);
            drawChildren(ctx, hitCtx, canvasElement.current.children)
        }

        canvas.addEventListener('update', onUpdate)
        return () => {
            canvas.removeEventListener('update', onUpdate)
        }
    }, [drawChildren])

    const onMouseEvent = event => {
        if (event.target !== canvasElement.current) {
            return
        }

        const {x, y} = localCoordinatesFromMouseEvent(event)
        const hitCtx = hitCanvas.current.getContext('2d')
        const pixel = hitCtx.getImageData(x, y, 1, 1).data;
        const color = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;
        const data = colorMap.current.get(color) ?? {}
        if (data.element) {
            data.element.dispatchEvent(
                new MouseEvent(event.type, {
                    view: window,
                    bubbles: true,
                    cancelable: true,
                    buttons: 1
                })
            )
        }

        if (event.type === 'mousemove') {
            if (data.element && !data.isHovered) {
                colorMap.current.set(color, {
                    ...data,
                    isHovered: true
                })

                data.element.dispatchEvent(
                    new MouseEvent('mouseover', {
                        view: window,
                        bubbles: true,
                        cancelable: true,
                        buttons: 1
                    })
                )
            }

            const { element } = data
            colorMap.current.forEach((data, key) => {
                if (data.element !== element && data.isHovered) {
                    colorMap.current.set(key, {
                        ...data,
                        isHovered: false
                    })
                    data.element.dispatchEvent(
                        new MouseEvent('mouseout', {
                            view: window,
                            bubbles: true,
                            cancelable: true,
                            buttons: 1
                        })
                    )
                }
            })
        }
    }

    const onMouseOut = event => {
        colorMap.current.forEach((data, key) => {
            if (data.isHovered) {
                colorMap.current.set(key, {
                    ...data,
                    isHovered: false
                })

                data.element.dispatchEvent(
                    new MouseEvent('mouseout', {
                        view: window,
                        bubbles: true,
                        cancelable: true,
                        buttons: 1
                    })
                )
            }
        })
    }

    return (
        <canvas
            className={styles.canvas}
            onMouseDown={interactive ? onMouseEvent : undefined}
            onMouseUp={interactive ? onMouseEvent : undefined}
            onClick={interactive ? onMouseEvent : undefined}
            onMouseMove={interactive ? throttleEventHandler(onMouseEvent) : undefined}
            onMouseOut={interactive ? throttleEventHandler(onMouseOut) : undefined }
            width={width}
            height={height}
            ref={canvasElement}
        >
            {children}
        </canvas>
    )
}