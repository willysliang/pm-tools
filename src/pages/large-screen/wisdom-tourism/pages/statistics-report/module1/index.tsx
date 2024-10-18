/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-15 11:01:01
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-16 14:52:42
 * @ Description: 智慧旅游-统计报告-模块1
 */

import { FC, memo } from 'react';
import { useChart1 } from './useChart1';
import { useChart2 } from './useChart2';
import { usePieChart } from './usePieChart';

export const Module1: FC<{ selectRangeDate: string[] }> = memo(({ selectRangeDate }) => {
  /** 图表1 */
  const { chartRef } = useChart1(selectRangeDate);

  /** 图表2 */
  const { chartRef: chart2Ref } = useChart2({
    // 柱图数据1
    name: '柱图数据1',
    number: '100次',
    labels: ['排行1', '排行2', '排行3', '排行4', '排行5'],
    color: '192,35,42',
    value: [60, 50, 40, 30, 20],
  });

  /** 图表2-2 */
  const { chartRef: chart3Ref } = useChart2({
    name: '柱图数据2',
    number: '100次',
    labels: ['排行1', '排行2', '排行3', '排行4', '排行5'],
    color: '40,112,232',
    value: [6, 5, 4, 3, 2],
  });

  /** 饼图1 */
  const pieData1 = [
    {
      value: 60,
      name: '分类1',
      itemStyle: {
        color: '#a262f2',
      },
    },
    {
      value: 20,
      name: '分类2',
      itemStyle: {
        color: '#2ca8fe',
      },
    },
    {
      value: 80,
      name: '分类3',
      itemStyle: {
        color: '#feac2c',
      },
    },
    {
      value: 40,
      name: '分类4',
      itemStyle: {
        color: '#c0232a',
      },
    },
    {
      value: 40,
      name: '分类5',
      itemStyle: {
        color: '#2cd9fe',
      },
    },
    {
      value: 40,
      name: '分类6',
      itemStyle: {
        color: '#ff787e',
      },
    },
    {
      value: 30,
      name: '其他',
      itemStyle: {
        color: '#252448',
      },
    },
  ];
  const { chartRef: pieChartRef1 } = usePieChart(pieData1);

  /** 饼图2 */
  const pieData2 = [
    {
      value: 20,
      name: '分类1',
      itemStyle: {
        color: '#feed2c',
      },
    },
    {
      value: 20,
      name: '分类2',
      itemStyle: {
        color: '#2ca8fe',
      },
    },
    {
      value: 40,
      name: '分类3',
      itemStyle: {
        color: '#feac2c',
      },
    },
    {
      value: 40,
      name: '分类4',
      itemStyle: {
        color: '#2c7bfe',
      },
    },
    {
      value: 100,
      name: '其他',
      itemStyle: {
        color: '#252448',
      },
    },
  ];
  const { chartRef: pieChartRef2 } = usePieChart(pieData2);

  return (
    <div className='flex flex-wrap w-full h-full'>
      <div className='w-full h-2/5' ref={chartRef}></div>
      <div className='w-full h-[30%] py-[10px] flex'>
        <div className='h-full w-3/5' ref={chart2Ref}></div>
        <div className='h-full w-2/5'>
          <div className='h-1/5 w-full text-center text-[12px] text-[#68c6d6]'>
            <span className='inline-block select-none relative after:content-[""] after:absolute after:right-[-10px] after:top-[6px] after:w-[6px] after:h-[6px] after:rounded-full after:bg-[#BE232A] before:content-[""] before:absolute before:left-[-10px] before:top-[6px] before:w-[6px] before:h-[6px] before:rounded-full before:bg-[#BE232A]'>
              饼图数据1分类占比
            </span>
          </div>
          <div className='h-4/5 w-full' ref={pieChartRef1}></div>
        </div>
      </div>
      <div className='w-full h-[30%] py-[10px] flex'>
        <div className='h-full w-3/5' ref={chart3Ref}></div>
        <div className='h-full w-2/5'>
          <div className='h-1/5 w-full text-center text-[12px] text-[#68c6d6]'>
            <span className='inline-block select-none relative after:content-[""] after:absolute after:right-[-10px] after:top-[6px] after:w-[6px] after:h-[6px] after:rounded-full after:bg-[#BE232A] before:content-[""] before:absolute before:left-[-10px] before:top-[6px] before:w-[6px] before:h-[6px] before:rounded-full before:bg-[#BE232A]'>
              饼图数据2分类占比
            </span>
          </div>
          <div className='h-4/5 w-full' ref={pieChartRef2}></div>
        </div>
      </div>
    </div>
  );
});

export default Module1;
