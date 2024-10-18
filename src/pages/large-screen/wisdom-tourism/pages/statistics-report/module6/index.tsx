/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-17 09:13:46
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-17 10:14:53
 * @ Description: 模块6 - 驻足时长分布分析
 */

import { FC, memo } from 'react';
import { useChart9 } from './useChart9';

/**
 * @description 模块6 - 驻足时长分布分析
 */
export const Module6: FC = memo(() => {
  const seriesData = [
    {
      name: '分类1',
      value: 380,
      data: [3600, 7200, 4800, 9000, 5200, 1800, 2400, 600],
    },
    {
      name: '分类2',
      value: 300,
      data: [2800, 5800, 3600, 7000, 6400, 3600, 5400, 4600],
    },
    {
      name: '分类3',
      value: 240,
      data: [2600, 3200, 5800, 2000, 3200, 5800, 7400, 2600],
    },
    {
      name: '分类4',
      value: 200,
      data: [1600, 4200, 2800, 1000, 7200, 5800, 3400, 5600],
    },
    {
      name: '分类5',
      value: 150,
      data: [5600, 6200, 6800, 3000, 1200, 5800, 4400, 2500],
    },
    {
      name: '分类6',
      value: 100,
      data: [6600, 8200, 5800, 4000, 2200, 3800, 7400, 3600],
    },
    {
      name: '分类7',
      value: 100,
      data: [7600, 1200, 3800, 7000, 1200, 3800, 5400, 2600],
    },
    {
      name: '分类8',
      value: 50,
      data: [6600, 1200, 2800, 3000, 6200, 5800, 4400, 1600],
    },
  ];

  const { chartRef } = useChart9(seriesData);

  return <div ref={chartRef} className='w-full h-full'></div>;
});

export default Module6;
