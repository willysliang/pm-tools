/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-23 16:20:07
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-23 17:26:04
 * @ Description: 设备安全性风险
 */

import { FC, memo } from 'react';
import { useChart6 } from './useChart6';

/**
 * @description 设备安全性风险
 */
export const DeviceSafeRisk: FC = memo(() => {
  const chartData = [
    {
      name: '分类1',
      color: '#5304EC',
      people: 2,
      profit: 1,
      frequency: [100, 90, 80, 70, 60, 50, 40, 30, 20, 15],
    },
    {
      name: '分类2',
      color: '#6829EE',
      people: 4,
      profit: 2,
      frequency: [100, 90, 80, 70, 60, 50, 40, 30, 20, 15],
    },
    {
      name: '分类3',
      color: '#8040ED',
      people: 6,
      profit: 3,
      frequency: [100, 90, 80, 70, 60, 50, 40, 30, 20, 15],
    },
    {
      name: '分类4',
      color: '#9D50EC',
      people: 1,
      profit: 4,
      frequency: [100, 90, 80, 70, 60, 50, 40, 30, 20, 15],
    },
    {
      name: '其他',
      color: '#A77BDE',
      people: 3,
      profit: 5,
      frequency: [100, 90, 80, 70, 60, 50, 40, 30, 20, 15],
    },
  ];
  const { chartRef } = useChart6(chartData);

  return <div ref={chartRef} className='w-full h-full'></div>;
});

export default DeviceSafeRisk;
