import { useState, useRef, useEffect, useCallback } from 'react';

export default function useAnimation(from, to, duration, easing = x => x) {
  const [value, setValue] = useState(from);
  const startTime = useRef(Date.now());


  const animate = () => {
    const now = Date.now();
    const elapsed = now - startTime.current;
    const progress = elapsed / duration;
    const diff = to - from;
    setValue(from + diff * easing(progress));

    if (now < startTime.current + duration) {
      requestAnimationFrame(animate)
    }
  };

  // useEffect(() => {
  //   animate()
  // }, [])

  const start = () => {
    startTime.current = Date.now()
    animate()
  }

  return [value, start]
}