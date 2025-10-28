import React from 'react';
import useDeviceType from '../../hook/useDeviceType';
import LayoutWrapper from './LayoutWrapper';
import MobileLayout from './MobileLayout';

/**
 * Adaptive Layout Wrapper
 * Automatically switches between mobile and desktop layouts based on screen size
 */
const AdaptiveLayoutWrapper = () => {
  const { isMobile } = useDeviceType();

  return isMobile ? <MobileLayout /> : <LayoutWrapper />;
};

export default AdaptiveLayoutWrapper;
