import { useEffect, useState } from 'react';

export default function useFonts(fonts) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    (async () => {
      const loadedFonts = await Promise.all(fonts.map( async({ family, source, descriptor}) => {
        const font = new FontFace(family, source, descriptor);
        await font.load()
        return font;
      }))

      loadedFonts.forEach(document.fonts.add.bind(document.fonts))
      setIsLoaded(true);
    })()
  }, [])

  return [isLoaded]
}