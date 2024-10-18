/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-16 10:49:18
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-16 15:07:24
 * @ Description: 智慧旅游-统计报告-模块2
 */

import { FC, memo } from 'react';
import { useChart3 } from './useChart3';
import { useChart4 } from './useChart4';

/**
 * @description 模块2
 */
export const Module2: FC = memo(() => {
  /**
   * 图表3
   */
  const chartData3 = [45, 33, 13, 25, 30, 35, 45];
  const { chartRef: chartRef3 } = useChart3(chartData3);

  /**
   * 图表4
   */
  const chartConfig4 = {
    title: '环形图数据',
    data: [
      {
        value: 335,
        name: '模拟1',
        itemStyle: {
          color: '#2871ea',
        },
      },
      {
        value: 310,
        name: '模拟2',
        itemStyle: {
          color: '#2ca8fe',
        },
      },
      {
        value: 234,
        name: '模拟3',
        itemStyle: {
          color: '#feed2c',
        },
      },
      {
        value: 200,
        name: '模拟4',
        itemStyle: {
          color: '#fe672c',
        },
      },
      {
        value: 135,
        name: '其他',
        itemStyle: {
          color: '#252448',
        },
      },
      {
        value: 335,
        name: '模拟5',
        itemStyle: {
          color: '#69f262',
        },
      },
      {
        value: 310,
        name: '模拟6',
        itemStyle: {
          color: '#c0232a',
        },
      },
      {
        value: 234,
        name: '模拟7',
        itemStyle: {
          color: '#2cfcfe',
        },
      },
      {
        value: 200,
        name: '模拟8',
        itemStyle: {
          color: '#a262f2',
        },
      },
    ],
  };
  const { chartRef: chartRef4 } = useChart4(chartConfig4);

  return (
    <div className='flex w-full h-full'>
      <div className='w-[50%] h-full' ref={chartRef3}></div>
      <div className='w-[50%] h-full' ref={chartRef4}></div>
    </div>
  );
});

export default Module2;
