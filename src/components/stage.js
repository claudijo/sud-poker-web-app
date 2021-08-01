import { useEffect, useRef, useState } from 'react';
import { throttle } from '../lib/rate-limit';
import { StageContext } from '../context/stage';

export const ScaleMode = {
  SCALE_TO_FIT: Math.min,
  SCALE_TO_COVER: Math.max,
};

export default function Stage({ scaleMode, width, height, children }) {
  const stageElement = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (typeof scaleMode !== 'function') {
      return;
    }

    const onWindowResize = throttle(() => {
      const scaleX = window.innerWidth / width;
      const scaleY = window.innerHeight / height;

      setScale(scaleMode(scaleX, scaleY));
    });

    window.addEventListener('resize', onWindowResize);
    onWindowResize();

    return () => {
      window.removeEventListener('resize', onWindowResize);
    };
  }, [scaleMode, width, height]);

  return (
    <StageContext.Provider value={{ width, height, scale }}>
      <div
        style={{
          width: `${width * scale}px`,
          height: `${height * scale}px`,
          backgroundColor: '#eee',
          position: 'relative',
        }}
      >
        <div
          ref={stageElement}
          style={{
            width: `${width}px`,
            height: `${height}px`,
            transformOrigin: '0 0',
            transform: `scale(${scale})`,
            backgroundColor: '#eee',
          }}
        >
          {children}
        </div>

      </div>
    </StageContext.Provider>
  );
}