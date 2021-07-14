import {useEffect, useRef, useCallback} from "react";
import { localCoordinatesFromMouseEvent } from '../lib/dom';
import { throttle, debounce } from '../lib/rate-limit';
import { getRandomColor, stringToColor } from '../lib/color';
import styles from './canvas.module.css'



export default function Canvas({children, width, height, interactive}) {
    const canvasElement = useRef(null);
    const hitCanvas = useRef(null)
    const colorMap = useRef(new Map())

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

            // Skip images
            if (hitCtx !== null && child.nodeName !== 'CANVAS-IMAGE') {
                // const attrs = child.attributes;
                // let output = "";
                // for(let i = attrs.length - 1; i >= 0; i--) {
                //     output += attrs[i].name + "=" + attrs[i].value;
                // }
                const output = ['x','y'].reduce((acc, attr) => {
                    acc += child[attr]
                    return acc
                }, '')
                const uniqueColor = stringToColor(output)
                // console.log(uniqueColor)
                // console.log(uniqueColor)
                // let uniqueColor = getRandomColor()
                // while (colorMap.current.has(uniqueColor)) {
                //     uniqueColor = getRandomColor()
                // }

                child.draw(hitCtx, offset)

                if (child.fillStyle !== undefined) {
                    hitCtx.fillStyle = uniqueColor;
                    hitCtx.fill();
                }

                if (child.strokeStyle !== undefined) {
                    hitCtx.strokeStyle = uniqueColor;
                    hitCtx.lineWidth = child.lineWidth ?? 0
                    hitCtx.stroke();
                }

                colorMap.current.set(uniqueColor, { element: child })
                // console.log(colorMap.current)
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
        if (interactive) {
            const canvas = document.createElement('canvas')
            canvas.width = width
            canvas.height = height
            hitCanvas.current = canvas
        } else {
            hitCanvas.current = null
        }
    }, [interactive, width, height])

    useEffect(() => {
        const canvas = canvasElement.current
        const ctx = canvas.getContext('2d')
        const hitCtx = hitCanvas.current?.getContext('2d') ?? null

        if (hitCtx) {
            document.body.appendChild(hitCanvas.current)
        }

        const onUpdate = debounce(event => {
            ctx.clearRect(0, 0, canvasElement.current.width, canvasElement.current.height);
            hitCtx?.clearRect(0, 0, hitCanvas.current.width, hitCanvas.current.height);
            drawChildren(ctx, hitCtx, canvasElement.current.children)
        })

        // Children might have already been connected at this stage, so
        // force draw, which in best case will not be called more than once
        // per canvas when called on requestAnimation frame.
        requestAnimationFrame(onUpdate)

        // setTimeout(onUpdate,100)

        canvas.addEventListener('attributeChanged', onUpdate)
        canvas.addEventListener('connected', onUpdate)
        return () => {
            canvas.removeEventListener('attributeChanged', onUpdate)
            canvas.removeEventListener('connected', onUpdate)
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
        console.log(color)
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
            onMouseMove={interactive ? throttle(onMouseEvent) : undefined}
            onMouseOut={interactive ? throttle(onMouseOut) : undefined }
            width={width}
            height={height}
            ref={canvasElement}
        >
            {children}
        </canvas>
    )
}