/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-09 10:53:10
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-10 16:33:52
 * @ Description: wisdom-tourism - 智慧旅游
 */

import { FC, memo, useEffect, useRef, useState } from 'react';
import WisdomTourismHeader from './components/wisdom-tourism-header';
import WisdomTourismMain from './components/wisdom-tourism-main';
import { debounce } from 'lodash-es';
import { createBEM } from '@/utils';
import s from './index.module.scss';

/**
 * @description 智慧旅游
 */
const WisdomTourism: FC<{ scale: string | number }> = memo(({ scale = `1 1` }) => {
  const NAMESPACE = 'wisdom-tourism';

  return (
    <div className={s[createBEM(NAMESPACE)]} style={{ transform: `scale(${scale})` }}>
      <WisdomTourismHeader />
      <div className={s[createBEM(`${NAMESPACE}-main`)]}>
        <div className={s[createBEM(`${NAMESPACE}-main`, 'left')]}>
          <WisdomTourismMain />
        </div>
      </div>
    </div>
  );
});

/**
 * 暴露出去的模块
 * @description 智慧旅游
 * @returns {FC}
 */
const WisdomTourismExpose: FC = memo(() => {
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
    setScale(getScale(containerRef.current!, [1920, 1080]));
  }, 20);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='w-full h-full bg-[#00063c]' ref={containerRef}>
      <WisdomTourism scale={scale[0]} />
    </div>
  );
});

export default WisdomTourismExpose;
