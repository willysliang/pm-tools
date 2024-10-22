/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-18 17:30:47
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-22 10:12:24
 * @ Description: 模块3
 */

import { FC, memo } from 'react';
import { ITouristDataProps } from '../types';
import { useChart4 } from './useChart4';

/**
 * @description 模块3
 */
export const Module3: FC<{ touristData: ITouristDataProps[] }> = memo(({ touristData }) => {
  /**
   * 折线图
   */
  const { chartRef: chartRef4 } = useChart4({
    data1: touristData.map((item) => item.frequency),
    data2: touristData.map((item) => item.people),
  });

  return <div ref={chartRef4} className='w-full h-full'></div>;
});

export default Module3;
