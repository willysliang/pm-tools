/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-18 17:30:47
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-22 10:29:39
 * @ Description: 模块4
 */

import { FC, memo } from 'react';
import { ITouristDataProps } from '../types';
import { useChart5 } from './useChart5';

/**
 * @description 模块4
 */
export const Module4: FC<{ touristData: ITouristDataProps[] }> = memo(({ touristData }) => {
  /**
   * 等分横向柱状图
   */
  const { chartRef: chartRef5 } = useChart5({
    labels: touristData.map((item) => item.address),
    data1: [320, 302, 341, 374, 390, 450, 420, 374, 390, 450, 420],
    data2: [320, 302, 341, 374, 390, 450, 420, 374, 390, 450, 420],
  });

  return <div ref={chartRef5} className='w-full h-full'></div>;
});

export default Module4;
