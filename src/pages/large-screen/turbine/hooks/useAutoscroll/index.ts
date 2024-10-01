/**
 * @ Author: willysliang
 * @ CreateTime: 2024-09-30 17:10:04
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-01 11:45:29
 * @ Description: 自动滚动
 */

import { useEffect, useRef } from 'react';

export class AutoScroll {
  element: HTMLElement;
  timer: null | NodeJS.Timeout;
  scrolling: boolean;
  step: number;

  constructor(element: HTMLElement, step: number) {
    this.element = element;
    this.step = step;
    this.timer = null;
    this.scrolling = true;
  }

  startScroll() {
    const { element, step } = this;
    this.timer = setInterval(() => {
      if (element.scrollHeight - element.scrollTop - element.clientHeight < 1) {
        element.scrollTop = 0;
      } else if (this.scrolling) element.scrollTop += 1;
    }, step);
  }

  openScroll() {
    this.scrolling = true;
  }

  closeScroll() {
    this.scrolling = false;
  }

  clearScroll() {
    this.timer && clearInterval(this.timer);
  }
}

/** 自动滚动 */
export const useAutoscroll = (value: number) => {
  const step = 1000 / value;

  const elementRef = useRef<HTMLElement>();

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const autoScroll = new AutoScroll(element, step);
    autoScroll.startScroll();

    const mouseenter = autoScroll.closeScroll.bind(autoScroll);
    const mouseleave = autoScroll.openScroll.bind(autoScroll);
    const clearScroll = autoScroll.clearScroll.bind(autoScroll);

    element.addEventListener('mouseenter', mouseenter);
    element.addEventListener('mouseleave', mouseleave);

    return () => {
      element.removeEventListener('mouseenter', mouseenter);
      element.removeEventListener('mouseleave', mouseleave);
      clearScroll();
    };
  }, [elementRef, value]);

  return {
    elementRef,
  };
};
