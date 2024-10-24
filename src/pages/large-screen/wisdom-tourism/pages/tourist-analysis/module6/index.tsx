/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-18 17:30:47
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-22 10:39:31
 * @ Description: 模块3
 */

import { FC, memo } from 'react';
import { ITouristDataProps } from '../types';
import { useChart7 } from './useChart7';

/**
 * @description 模块6
 */
export const Module6: FC<{ touristData: ITouristDataProps[] }> = memo(({ touristData }) => {
  /**
   * 分类-柱状图
   */
  const { chartRef: chartRef6 } = useChart7({
    labels: touristData.map((item) => item.address),
    data1: touristData.map((item) => ({
      value: item.profit,
      name: item.address,
    })),
    data2: touristData.map((item) => ({
      value: item.people,
      name: item.address,
    })),
    data3: touristData.map((item) => ({
      value: item.frequency,
      name: item.address,
    })),
  });

  return <div ref={chartRef6} className='w-full h-full'></div>;
});

export default Module6;
