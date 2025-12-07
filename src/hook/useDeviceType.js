import { useState, useEffect } from 'react';

/**
 * Custom hook to detect device type and screen size
 * @param {number} mobileBreakpoint - Max width for mobile devices (default: 768px)
 * @param {number} tabletBreakpoint - Max width for tablet devices (default: 1024px)
 * @returns {Object} - Device detection object with boolean flags
 */
const useDeviceType = (breakpoint = 480) => {
  const [deviceType, setDeviceType] = useState({
    isMobile: false,
    isDesktop: true,
    width: typeof window !== 'undefined' ? window.innerWidth : 1920,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      setDeviceType({
        isMobile: width <= breakpoint,
        isDesktop: width > breakpoint,
        width,
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return deviceType;
};

export default useDeviceType;
