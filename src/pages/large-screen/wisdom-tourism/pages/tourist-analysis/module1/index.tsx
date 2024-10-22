/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-18 17:30:47
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-22 09:41:42
 * @ Description: 模块1
 */

import { FC, memo } from 'react';
import { ITouristDataProps } from '../types';
import { useAreaChart } from '../../statistics-report/module4/useAreaChart';
import { useRadarChart } from '../../../hooks/useRadarChart';
import { useChart1 } from './useChart1';

/**
 * @description 模块1
 */
export const Module1: FC<{ touristData: ITouristDataProps[]; selectRangeDate: string[] }> = memo(
  ({ touristData, selectRangeDate }) => {
    /**
     * 面积图
     */
    const areaChartConfigData = {
      title: '【标题】',
      color: '#75deef',
      name: ['（次）', '（人）'],
      data: [
        {
          name: '次数',
          color: ['#9e70ff', '#6e5eff'],
          data: touristData.map((item) => item.frequency),
        },
        {
          name: '人数',
          color: ['#48cefd', '#5356f1'],
          data: touristData.map((item) => item.people),
        },
      ],
    };
    const { chartRef: areaChartRef1 } = useAreaChart(selectRangeDate, areaChartConfigData);

    /**
     * 雷达图
     */
    const { chartRef: chatRadarRef } = useRadarChart({
      title: '聊天雷达图',
      indicator: touristData.map((item) => ({ text: item.address })),
      data: [
        {
          name: '次数',
          color: '#0DF5F8',
          value: touristData.map((item) => item.frequency),
        },
        {
          name: '人数',
          color: '#7921AD',
          value: touristData.map((item) => item.people),
        },
      ],
    });

    /**
     * 柱状图
     */
    const { chartRef: officeBarChartRef } = useChart1({
      data: touristData.map((item) => item.people),
      labels: touristData.map((item) => item.address),
      title: '金额',
    });

    /**
     * 雷达图
     */
    const { chartRef: profitRadarRef } = useRadarChart({
      title: '金额雷达图',
      indicator: touristData.map((item) => ({ text: item.address })),
      data: [
        {
          name: '金额',
          color: '#55d35b',
          value: touristData.map((item) => item.profit),
        },
      ],
    });

    return (
      <div className='w-full h-full flex flex-col'>
        <div className='h-[50%] flex'>
          <div ref={areaChartRef1} className='h-full w-[68%]'></div>
          <div ref={chatRadarRef} className='h-full w-[32%]'></div>
        </div>
        <div className='flex-1 flex'>
          <div ref={officeBarChartRef} className='h-full w-[68%]'></div>
          <div ref={profitRadarRef} className='h-full w-[32%]'></div>
        </div>
      </div>
    );
  },
);

export default Module1;
