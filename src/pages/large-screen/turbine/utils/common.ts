/**
 * @ Author: willysliang
 * @ CreateTime: 2024-09-29 15:00:45
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-01 08:46:57
 * @ Description: 通用工具类
 */

import TWEEN from '@tweenjs/tween.js';
import { isFunction } from 'lodash-es';

/** 动画类 */
export const animation = (options: {
  from: Record<string, any>;
  to: Record<string, any>;
  duration: number;
  easing?: any;
  onUpdate: (params: Record<string, any>) => void;
  onComplete?: (params: Record<string, any>) => void;
}) => {
  const { from, to, duration, easing = TWEEN.Easing.Quadratic.Out, onUpdate, onComplete } = options;

  const tween = new TWEEN.Tween(from)
    .to(to, duration)
    .easing(easing)
    .onUpdate((object) => isFunction(onUpdate) && onUpdate(object))
    .onComplete((object) => isFunction(onComplete) && onComplete(object))
    .start();

  const animate = () => {
    requestAnimationFrame(animate);
    tween.update();
  };

  animate();
};
