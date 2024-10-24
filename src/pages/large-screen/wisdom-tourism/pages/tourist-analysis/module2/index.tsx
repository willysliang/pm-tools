/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-18 17:30:47
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-22 09:30:00
 * @ Description: 游客分析-游客来源
 */

import { FC, memo } from 'react';
import { useRadarChart } from '../../../hooks/useRadarChart';
import { useChart2 } from './useChart2';
import { useChart3 } from './useChart3';

/**
 * @description 模块2
 */
export const Module2: FC<{ selectRangeDate: string[] }> = memo(({ selectRangeDate }) => {
  /**
   * 雷达图
   */
  const { chartRef: friendRadarRef } = useRadarChart({
    title: '好友雷达图',
    indicator: [
      { text: '分类1' },
      { text: '分类2' },
      { text: '分类3' },
      { text: '分类4' },
      { text: '分类5' },
      { text: '分类6' },
    ],
    data: [
      {
        name: '数据',
        color: '#FA8486',
        value: [100, 8, 0.4, -80, 2000, 332],
      },
    ],
  });

  /**
   * 新增与总数-柱状图
   */
  const { chartRef: newAndTotalChartRef } = useChart2({
    newAdddata: [120, 102, 101, 134, 190, 130, 120, 190, 130, 120],
    totalData: [120, 132, 101, 134, 90, 130, 110, 90, 130, 120],
  });

  /**
   * 雷达图
   */
  const { chartRef: momentsRadarRef } = useRadarChart({
    title: '要素雷达图',
    indicator: [
      { text: '分类1' },
      { text: '分类2' },
      { text: '分类3' },
      { text: '分类4' },
      { text: '分类5' },
      { text: '分类6' },
    ],
    data: [
      {
        name: '个数',
        color: '#D91748',
        value: [100, 8, 0.4, -80, 2000, 332],
      },
    ],
  });

  /**
   * 分类-曲线图
   */
  const { chartRef: sortCategoryChartRef } = useChart3({
    data: selectRangeDate.map(() => Math.floor(Math.random() * 250)),
    labels: selectRangeDate.map((item) => item.slice(5)),
  });

  return (
    <div className='w-full h-full flex flex-col'>
      <div className='h-[50%] flex'>
        <div ref={friendRadarRef} className='h-full w-[32%]'></div>
        <div ref={newAndTotalChartRef} className='h-full w-[68%]'></div>
      </div>
      <div className='flex-1 flex'>
        <div ref={momentsRadarRef} className='h-full w-[32%]'></div>
        <div ref={sortCategoryChartRef} className='h-full w-[68%]'></div>
      </div>
    </div>
  );
});

export default Module2;
