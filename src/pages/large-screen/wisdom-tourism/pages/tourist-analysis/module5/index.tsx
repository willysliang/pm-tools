/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-18 17:30:47
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-22 10:29:33
 * @ Description: 模块5
 */

import { FC, memo } from 'react';
import { useChart6 } from './useChart6';

/**
 * @description 模块5
 */
export const Module5: FC = memo(() => {
  /**
   * 分类-柱状图
   */
  const { chartRef: chartRef6 } = useChart6({
    labels: ['2017', '4', '7', '10', '2018', '4', '7', '0'],
    data1: [200, 49, 70, 232, 256, 76.7, 135.6],
    data2: [26, 59, 90, 264, 287, 70.7, 175.6],
    data3: [264, 287, 150, 175.6, 182.2, 48.7, 18.8],
  });

  return <div ref={chartRef6} className='w-full h-full'></div>;
});

export default Module5;
