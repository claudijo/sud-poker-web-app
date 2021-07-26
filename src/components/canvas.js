import { useEffect, useRef, useCallback } from 'react';
import { localCoordinatesFromMouseEvent } from '../lib/dom';
import { throttle, debounce } from '../lib/rate-limit';
import styles from './canvas.module.css';
import { QuadTree } from '../lib/quadtree';

export default function Canvas({ children, width, height, interactive }) {
  const canvasElement = useRef(null);
  const interactiveElements = useRef(null);
  const hoveredElements = useRef(null)

  const drawChildren = useCallback((ctx, children, offset = { x: 0, y: 0 }) => {
    Array.from(children).forEach(child => {
      child.offset = offset
      child.draw(ctx)

      if (interactive) {
        interactiveElements.current.insert(child)
      }

      if (child.children.length > 0) {
        drawChildren(ctx, child.children, {
          x: offset.x + child.x,
          y: offset.y + child.y,
        });
      }
    });
  }, [interactive]);

  useEffect(() => {
    if (interactive) {
      const quadTree = new QuadTree({
        top: 0,
        left: 0,
        bottom: height,
        right: width,
      })

      interactiveElements.current = quadTree
      hoveredElements.current = new Set()
    }

    return () => {
      interactiveElements.current = null
      hoveredElements.current = null
    }
  }, [interactive, width, height]);

  useEffect(() => {
    const canvas = canvasElement.current;
    const ctx = canvas.getContext('2d');

    const onUpdate = debounce(event => {
      ctx.clearRect(0, 0, canvasElement.current.width, canvasElement.current.height);

      if (interactive) {
        interactiveElements.current.clear()
      }

      drawChildren(ctx, canvasElement.current.children);
    });

    // Children might have already been connected at this stage, so
    // force draw, which in best case will not be called more than once
    // per canvas when called on requestAnimation frame.
    requestAnimationFrame(onUpdate);

    canvas.addEventListener('attributeChanged', onUpdate);
    canvas.addEventListener('connected', onUpdate);

    return () => {
      canvas.removeEventListener('attributeChanged', onUpdate);
      canvas.removeEventListener('connected', onUpdate);
    };
  }, [drawChildren, interactive]);

  const onMouseEvent = throttle(event => {
    if (event.target !== canvasElement.current) {
      return;
    }

    const point = localCoordinatesFromMouseEvent(event)

    const [target] = [...interactiveElements.current.queryPoint(point)]
      .filter(target => target.intersects(point))
      .slice(-1)

    if (target !== undefined) {
      target.dispatchEvent(
        new MouseEvent(event.type, {
          view: window,
          bubbles: true,
          cancelable: true,
          buttons: 1,
        }),
      );

      if (event.type === 'mousemove' && !hoveredElements.current.has(target)) {
        hoveredElements.current.add(target)
        target.dispatchEvent(
          new MouseEvent('mouseover', {
            view: window,
            bubbles: true,
            cancelable: true,
            buttons: 1
          })
        )
      }
    }

    hoveredElements.current.forEach(hovered => {
      if (target !== hovered) {
        hoveredElements.current.delete(hovered)
        hovered.dispatchEvent(
          new MouseEvent('mouseout', {
            view: window,
            bubbles: true,
            cancelable: true,
            buttons: 1,
          }),
        )
      }
    })
  });

  // Mouse out event for whole canvas
  const onMouseOut = throttle(event => {
    hoveredElements.current.forEach(hovered => {
      hoveredElements.current.delete(hovered)
      hovered.dispatchEvent(
        new MouseEvent('mouseout', {
          view: window,
          bubbles: true,
          cancelable: true,
          buttons: 1,
        }),
      )
    })
  });

  return (
    <canvas
      className={styles.canvas}
      onMouseDown={interactive ? onMouseEvent : undefined}
      onMouseUp={interactive ? onMouseEvent : undefined}
      onClick={interactive ? onMouseEvent : undefined}
      onMouseMove={interactive ? onMouseEvent : undefined}
      onMouseOut={interactive ? onMouseOut : undefined}
      width={width}
      height={height}
      ref={canvasElement}
    >
      {children}
    </canvas>
  );
}