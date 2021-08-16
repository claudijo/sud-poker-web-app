import { useEffect, useRef, useCallback, useContext } from 'react';
import { localCoordinatesFromMouseEvent } from '../lib/dom';
import { throttle, debounce } from '../lib/rate-limit';
import { QuadTree } from '../lib/quadtree';
import { StageContext } from '../context/stage';

export default function Canvas({ children, interactive }) {
  const canvasElement = useRef(null);
  const interactiveElements = useRef(null);
  const hoveredElement = useRef(null);
  const { scale, width, height } = useContext(StageContext);

  const drawChildren = useCallback((ctx, children, offset = { x: 0, y: 0 }) => {
    Array.from(children).forEach(child => {
      child.offset = offset;

      child.draw(ctx);

      if (interactive) {
        interactiveElements.current.insert(child);
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
      });

      interactiveElements.current = quadTree;
    }

    return () => {
      interactiveElements.current = null;
    };
  }, [interactive, width, height]);

  useEffect(() => {
    const canvas = canvasElement.current;
    const ctx = canvas.getContext('2d');

    const onUpdate = debounce(event => {
      ctx.clearRect(0, 0, canvasElement.current.width, canvasElement.current.height);

      if (interactive) {
        interactiveElements.current.clear();
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

  const onMouseEvent = event => {
    if (event.target !== canvasElement.current || interactiveElements.current === null) {
      return;
    }

    const point = localCoordinatesFromMouseEvent(event, scale);

    const [target] = [...interactiveElements.current.queryPoint(point)]
      .filter(target => target.intersects(point))
      .slice(-1);

    if (target !== undefined) {
      target.dispatchEvent(
        new MouseEvent(event.type, {
          view: window,
          bubbles: true,
          cancelable: true,
          buttons: 1,
        }),
      );

      if (event.type === 'mousemove') {
        if (hoveredElement.current !== null && hoveredElement.current !== target) {
          hoveredElement.current.dispatchEvent(
            new MouseEvent('mouseout', {
              view: window,
              bubbles: true,
              cancelable: true,
              buttons: 1,
            }),
          );
        }

        if (hoveredElement.current !== target) {
          hoveredElement.current = target;
          hoveredElement.current.dispatchEvent(
            new MouseEvent('mouseover', {
              view: window,
              bubbles: true,
              cancelable: true,
              buttons: 1,
            }),
          );
        }
      }
    } else if (hoveredElement.current !== null) {
      hoveredElement.current.dispatchEvent(
        new MouseEvent('mouseout', {
          view: window,
          bubbles: true,
          cancelable: true,
          buttons: 1,
        }),
      );
      hoveredElement.current = null;
    }
  };

  // Mouse out event for whole canvas
  const onMouseOut = event => {
    if (event.target !== canvasElement.current) {
      return;
    }

    // Need to delay this, since the mouse events controlling hover state
    // are throttled and might fire after this event when mousing the edge
    // of the canvas
    requestAnimationFrame(() => {
      if (hoveredElement.current !== null) {
        hoveredElement.current.dispatchEvent(
          new MouseEvent('mouseout', {
            view: window,
            bubbles: true,
            cancelable: true,
            buttons: 1,
          }),
        );
        hoveredElement.current = null;
      }
    });
  };

  return (
    <canvas
      style={{ position: 'absolute' }}
      onMouseDown={interactive ? onMouseEvent : undefined}
      onMouseUp={interactive ? onMouseEvent : undefined}
      onClick={interactive ? onMouseEvent : undefined}
      onMouseMove={interactive ? throttle(onMouseEvent) : undefined}
      onMouseOut={interactive ? onMouseOut : undefined}
      width={width}
      height={height}
      ref={canvasElement}
    >
      {children}
    </canvas>
  );
}