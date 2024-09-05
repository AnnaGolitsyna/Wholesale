import { useState, useEffect, useCallback } from 'react';

const useResponsiveScroll = (ref, extraSpace = 120, minHeight = 200) => {
  const [scrollY, setScrollY] = useState(400);

  const updateScrollHeight = useCallback(() => {
    if (ref.current) {
      const elementTop = ref.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      const newScrollY = windowHeight - elementTop - extraSpace;
      setScrollY(Math.max(newScrollY, minHeight));
    }
  }, [ref, extraSpace, minHeight]);

  useEffect(() => {
    updateScrollHeight();
    window.addEventListener('resize', updateScrollHeight);

    return () => window.removeEventListener('resize', updateScrollHeight);
  }, [updateScrollHeight]);

  return scrollY;
};

export default useResponsiveScroll;
