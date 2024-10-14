/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-14 16:53:59
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-14 18:11:41
 * @ Description: 高阶函数 - 缩放比例的容器
 */

import { FC, useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash-es';

/**
 * 获取页面的缩放比
 * @param { width?: number, height?: number } props 宽高
 */
export const useScaleContainer = (props: { width?: number; height?: number }) => {
  /** 获取缩放比 */
  const getScale = (container: HTMLDivElement, [width = 1920, height = 1080]) => {
    const ww = container.offsetWidth / width;
    const wh = container.offsetHeight / height;
    return [ww, wh];
  };

  /**
   * 根据浏览器大小推断缩放比例
   */
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState([1, 1]);
  const handleResize = debounce(() => {
    setScale(getScale(containerRef.current!, [props.width, props.height]));
  }, 20);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    containerRef,
    scale,
  };
};

/**
 * @description 创建一个缩放比例的容器
 * @returns {JSX.Element}
 */
export const CreateScaleContainer = (ComposeComponent: FC<{ scale: number }>): JSX.Element => {
  const { containerRef, scale } = useScaleContainer({});

  return (
    <div className='w-full h-full relative bg-[#00063c]' ref={containerRef}>
      <ComposeComponent scale={Math.min(...scale)} />
    </div>
  );
};
