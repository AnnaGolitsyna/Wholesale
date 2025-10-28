import { useState, useEffect } from 'react';

/**
 * Custom hook to detect device type and screen size
 * @param {number} mobileBreakpoint - Max width for mobile devices (default: 768px)
 * @param {number} tabletBreakpoint - Max width for tablet devices (default: 1024px)
 * @returns {Object} - Device detection object with boolean flags
 */
const useDeviceType = (mobileBreakpoint = 768, tabletBreakpoint = 1024) => {
  const [deviceType, setDeviceType] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    width: typeof window !== 'undefined' ? window.innerWidth : 1920,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      setDeviceType({
        isMobile: width <= mobileBreakpoint,
        isTablet: width > mobileBreakpoint && width <= tabletBreakpoint,
        isDesktop: width > tabletBreakpoint,
        width,
      });
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileBreakpoint, tabletBreakpoint]);

  return deviceType;
};

export default useDeviceType;
