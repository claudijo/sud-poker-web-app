// Adjusted from From https://github.com/imbhargav5/rooks/blob/master/packages/shared/useFullscreen.ts
import { useState, useEffect } from 'react';

const getBrowserFunctions = () => {
  const fnMap = [
    [
      "requestFullscreen",
      "exitFullscreen",
      "fullscreenElement",
      "fullscreenEnabled",
      "fullscreenchange",
      "fullscreenerror"
    ],
    // New WebKit
    [
      "webkitRequestFullscreen",
      "webkitExitFullscreen",
      "webkitFullscreenElement",
      "webkitFullscreenEnabled",
      "webkitfullscreenchange",
      "webkitfullscreenerror"
    ],
    // Old WebKit
    [
      "webkitRequestFullScreen",
      "webkitCancelFullScreen",
      "webkitCurrentFullScreenElement",
      "webkitCancelFullScreen",
      "webkitfullscreenchange",
      "webkitfullscreenerror"
    ],
    [
      "mozRequestFullScreen",
      "mozCancelFullScreen",
      "mozFullScreenElement",
      "mozFullScreenEnabled",
      "mozfullscreenchange",
      "mozfullscreenerror"
    ],
    [
      "msRequestFullscreen",
      "msExitFullscreen",
      "msFullscreenElement",
      "msFullscreenEnabled",
      "MSFullscreenChange",
      "MSFullscreenError"
    ]
  ];

  const ret = {};

  if (typeof window !== 'undefined') {
    fnMap.forEach(fnSet => {
      if (fnSet && fnSet[1] in document) {
        fnSet.forEach((_fn, i) => {
          ret[fnMap[0][i]] = fnSet[i];
        });
      }
    });
  }

  return ret;
};

/**
 * useFullscreen
 * A hook that helps make the document fullscreen
 */
export default function useFullscreen() {
  const fn = getBrowserFunctions();
  const [isFullscreen, setIsFullscreen] = useState(
    typeof window !== 'undefined' && Boolean(document[fn.fullscreenElement])
  );
  const [element, setElement] = useState(
    typeof window !== 'undefined' ? document[fn.fullscreenElement] : null
  );

  // Patch to handle if user exits full screen without explicitly calling `exit`
  useEffect(() => {
    const handleChange = event => {
      if (element && isFullscreen) {
        setIsFullscreen(false);
        setElement(null);
      }
    }

    on('change', handleChange)
    return () => off('change', handleChange);
  }, [element, isFullscreen])

  const eventNameMap = {
    change: fn.fullscreenchange,
    error: fn.fullscreenerror
  };

  const request = (element) =>
    new Promise((resolve, reject) => {
      const onFullScreenEntered = () => {
        setIsFullscreen(true);
        off("change", onFullScreenEntered);
        resolve();
      };

      on("change", onFullScreenEntered);

      element = element || document.documentElement;
      setElement(element);

      Promise.resolve(element[fn.requestFullscreen]()).catch(reject);
    });

  const on = (event, callback) => {
    const eventName = eventNameMap[event];
    if (eventName) {
      document.addEventListener(eventName, callback, false);
    }
  };

  const off = (event, callback) => {
    const eventName = eventNameMap[event];
    if (eventName) {
      document.removeEventListener(eventName, callback, false);
    }
  };

  const exit = () =>
    new Promise((resolve, reject) => {
      if (!Boolean(document[fn.fullscreenElement])) {
        resolve();
        return;
      }

      const onFullScreenExit = () => {
        setIsFullscreen(false);
        off("change", onFullScreenExit);
        resolve();
      };

      on("change", onFullScreenExit);
      setElement(null);

      Promise.resolve(document[fn.exitFullscreen]()).catch(reject);
    });

  const toggle = (element) =>
    Boolean(document[fn.fullscreenElement]) ? exit() : request(element);

  return {
    // Set enabled on server side to avoid warnings in development
    isEnabled: Boolean(typeof window === 'undefined' || document[fn.fullscreenEnabled]),
    toggle,
    onChange: (callback) => {
      on("change", callback);
    },
    onError: (callback) => {
      on("error", callback);
    },
    request,
    exit,
    isFullscreen,
    element
  }
}
