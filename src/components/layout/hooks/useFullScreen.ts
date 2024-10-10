/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-09 16:47:34
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-09 17:08:44
 * @ Description: 全屏功能
 */

import { debounce } from 'lodash-es';
import { useEffect, useRef, useState } from 'react';

declare global {
  interface Document {
    fullscreenElement?: Element | null;
    mozFullScreenElement?: Element | null;
    webkitFullscreenElement?: Element | null;
    msFullscreenElement?: Element | null;

    mozCancelFullScreen?: () => Promise<void>;
    webkitExitFullscreen?: () => Promise<void>;
    msExitFullscreen?: () => Promise<void>;
  }

  interface HTMLElement {
    requestFullscreen?: () => Promise<void>;
    mozRequestFullScreen?: () => Promise<void>;
    webkitRequestFullscreen?: () => Promise<void>;
    msRequestFullscreen?: () => Promise<void>;
  }
}

/** 全屏功能 */
export const useFullScreen = () => {
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const element = useRef<HTMLElement>(document.body);

  const notIsFullScreen = (ele: HTMLElement | null) =>
    document.fullscreenElement !== ele &&
    document.mozFullScreenElement !== ele &&
    document.webkitFullscreenElement !== ele &&
    document.msFullscreenElement !== ele;

  const fullscreenChangeHandler = debounce(() => {
    if (element.current) {
      setIsFullScreen(!notIsFullScreen(element.current));
    }
  }, 20);

  useEffect(() => {
    document.addEventListener('fullscreenchange', fullscreenChangeHandler);
    setIsFullScreen(!notIsFullScreen(element.current));

    return () => {
      document.removeEventListener('fullscreenchange', fullscreenChangeHandler);
    };
  }, []);

  /** 全屏展示/关闭 */
  const toggleFullScreen = (ele: HTMLElement = element.current) => {
    const launchFullScreen = () => {
      if (ele.requestFullscreen) {
        ele.requestFullscreen();
      } else if (ele.mozRequestFullScreen) {
        // Firefox
        ele.mozRequestFullScreen();
      } else if (ele.webkitRequestFullscreen) {
        // Chrome, Safari and Opera
        ele.webkitRequestFullscreen();
      } else if (ele.msRequestFullscreen) {
        // IE/Edge
        ele.msRequestFullscreen();
      } else {
        console.error('Fullscreen API is not supported.');
      }
    };

    const exitFullScreen = () => {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        // Firefox
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        // Chrome, Safari and Opera
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        // IE/Edge
        document.msExitFullscreen();
      } else {
        console.error('Fullscreen API is not supported.');
      }
    };

    if (notIsFullScreen(ele)) {
      launchFullScreen();
    } else {
      exitFullScreen();
    }
  };

  return {
    isFullScreen,
    element,
    toggleFullScreen,
  };
};
