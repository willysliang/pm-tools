/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-23 15:54:33
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-23 16:19:00
 * @ Description: 网播风险分析
 */

import { FC, memo } from 'react';
import { useChart5 } from './useChart5';

/**
 * @description 网播风险分析
 */
export const WebcastsRisk: FC = memo(() => {
  const chartData = [
    {
      value: 535,
      name: '分类1',
      color: '#142AFE',
      data: [100, 90, 80, 70, 60, 50, 40, 30, 20, 15],
    },
    {
      value: 310,
      name: '分类2',
      color: '#1456FE',
      data: [100, 90, 80, 70, 60, 50, 40, 30, 20, 15],
    },
    {
      value: 135,
      name: '分类3',
      color: '#1493FE',
      data: [100, 90, 80, 70, 60, 50, 40, 30, 20, 15],
    },
    {
      value: 254,
      name: '其他',
      color: '#00CCFF',
      data: [100, 90, 80, 70, 60, 50, 40, 30, 20, 15],
    },
  ];
  const { chartRef } = useChart5(chartData);

  return <div ref={chartRef} className='w-full h-full'></div>;
});

export default WebcastsRisk;
