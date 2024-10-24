/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-22 14:22:34
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-23 15:45:43
 * @ Description: 渠道分析模块
 */

import { FC, memo } from 'react';
import {
  channelDistributionData,
  pieData1,
  pieData2,
  pieData3,
  scatterData1,
  scatterData2,
  scatterData3,
  top3ChannelData,
  userRankData,
  userRankData2,
} from './mock-data';
import { useChart1 } from './useChart1';
import { useChart2 } from './useUserRankChart';
import { useRedPocketChart } from './useRedPocketChart';
import { usePieChart } from '../../../hooks/usePieChart';

/**
 * @description 渠道分析模块
 */
export const ChannelAnalysis: FC = memo(() => {
  /**
   * 渠道分布分析 - 横向柱状图
   */
  const { chartRef: channelDistributionChartRef } = useChart1(
    '渠道分布统计',
    channelDistributionData,
  );
  const { chartRef: top3ChannelChartRef } = useChart1('前三渠道统计', top3ChannelData);

  /**
   * 重点关注用户排名
   */
  const { chartRef: userRankRef } = useChart2('关注用户排名', userRankData);
  const { chartRef: userRank2Ref } = useChart2('重点关注用户排名', userRankData2);

  /**
   * 饼图
   */
  const { chartRef: pieChartRef1 } = usePieChart(pieData1);
  const { chartRef: pieChartRef2 } = usePieChart(pieData2);
  const { chartRef: pieChartRef3 } = usePieChart(pieData3);

  /**
   * 红包转账
   */
  const { chartRef: redPocketChartRef } = useRedPocketChart(
    scatterData1,
    scatterData2,
    scatterData3,
  );
  return (
    <div className='w-full h-full'>
      <div className='h-[32.5%] w-full flex'>
        <div ref={channelDistributionChartRef} className='w-[45%] h-full'></div>
        <div ref={userRankRef} className='w-[55%] h-full'></div>
      </div>

      {/* 饼图 */}
      <div className='h-[14.5%] w-full flex pt-4'>
        <div className='h-full flex-1 flex flex-col'>
          <div className='h-[30px] w-full text-center text-[12px] text-[#68c6d6]'>
            <span className='inline-block select-none relative after:content-[""] after:absolute after:right-[-10px] after:top-[6px] after:w-[6px] after:h-[6px] after:rounded-full after:bg-[#2C7BFE] before:content-[""] before:absolute before:left-[-10px] before:top-[6px] before:w-[6px] before:h-[6px] before:rounded-full before:bg-[#2C7BFE]'>
              TOP数据1
            </span>
          </div>
          <div className='flex-1 w-full' ref={pieChartRef1}></div>
        </div>
        <div className='h-full flex-1 flex flex-col'>
          <div className='h-[30px] w-full text-center text-[12px] text-[#68c6d6]'>
            <span className='inline-block select-none relative after:content-[""] after:absolute after:right-[-10px] after:top-[6px] after:w-[6px] after:h-[6px] after:rounded-full after:bg-[#2C7BFE] before:content-[""] before:absolute before:left-[-10px] before:top-[6px] before:w-[6px] before:h-[6px] before:rounded-full before:bg-[#2C7BFE]'>
              TOP数据2
            </span>
          </div>
          <div className='flex-1 w-full' ref={pieChartRef2}></div>
        </div>
        <div className='h-full flex-1 flex flex-col'>
          <div className='h-[30px] w-full text-center text-[12px] text-[#68c6d6]'>
            <span className='inline-block select-none relative after:content-[""] after:absolute after:right-[-10px] after:top-[6px] after:w-[6px] after:h-[6px] after:rounded-full after:bg-[#2C7BFE] before:content-[""] before:absolute before:left-[-10px] before:top-[6px] before:w-[6px] before:h-[6px] before:rounded-full before:bg-[#2C7BFE]'>
              TOP数据3
            </span>
          </div>
          <div className='flex-1 w-full' ref={pieChartRef3}></div>
        </div>
      </div>

      <div ref={redPocketChartRef} className='h-[28%] w-full'></div>

      <div className='h-[22%] w-full flex'>
        <div ref={top3ChannelChartRef} className='w-[45%] h-full'></div>
        <div ref={userRank2Ref} className='w-[55%] h-full'></div>
      </div>
    </div>
  );
});

export default ChannelAnalysis;
