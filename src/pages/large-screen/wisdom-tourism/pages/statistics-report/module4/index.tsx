/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-17 09:13:46
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-17 11:22:00
 * @ Description: 模块4
 */

import { FC, memo } from 'react';
import { useChart7 } from './useChart7';
import { useAreaChart } from './useAreaChart';

/**
 * @description 模块4
 */
export const Module4: FC<{ selectRangeDate: string[] }> = memo(({ selectRangeDate }) => {
  /**
   * 面积图
   */
  const areaChartConfigData = {
    title: '【标题】',
    color: '#75deef',
    name: ['（人）', '（人）'],
    data: [
      {
        name: '数据1',
        color: ['#feed2c', '#353103'],
        data: [240, 132, 101, 134, 90, 170, 110],
      },
      {
        name: '数据2',
        color: ['#2871ea', '#0a1b41'],
        data: [20, 102, 101, 134, 190, 150, 120],
      },
      {
        name: '数据3',
        color: ['#935adf', '#230f3e'],
        data: [100, 32, 101, 134, 150, 110, 180],
      },
      {
        name: '数据4',
        color: ['#e65f2d', '#551f0b'],
        data: [120, 122, 141, 144, 60, 220, 120],
      },
    ],
  };
  const { chartRef: areaChartRef } = useAreaChart(selectRangeDate, areaChartConfigData);

  /**
   * 图表7
   */
  const labelData = [
    {
      itemStyle: {
        color: '#2c7bfe',
      },
      name: '数据1',
      value: 255,
    },
    {
      itemStyle: {
        color: '#c2232a',
      },
      name: '数据2',
      value: 212,
    },
    {
      itemStyle: {
        color: '#feed2c',
      },
      name: '数据3',
      value: 155,
    },
    {
      itemStyle: {
        color: '#a262f2',
      },
      name: '数据4',
      value: 55,
    },
    {
      itemStyle: {
        color: '#62d5f2',
      },
      name: '数据5',
      value: 80,
    },
    {
      itemStyle: {
        color: '#fe672c',
      },
      name: '数据6',
      value: 160,
    },
    {
      itemStyle: {
        color: '#69f262',
      },
      name: '数据7',
      value: 114,
    },
    {
      itemStyle: {
        color: '#2ca8fe',
      },
      name: '数据8',
      value: 20,
    },
  ];
  const { chartRef: chartRef7 } = useChart7(labelData);

  return (
    <div className='w-full h-full'>
      <div ref={areaChartRef} className='w-full h-[55%]'></div>
      <div ref={chartRef7} className='w-full h-[45%]'></div>
    </div>
  );
});

export default Module4;
