/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-23 18:06:02
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-24 09:34:03
 * @ Description: 占比分析
 */

import { FC, memo } from 'react';
import { useChart4 } from './useChart4';
import {
  barChartData1,
  barChartData2,
  barChartData3,
  barChartData4,
  radarData1,
  radarData2,
  radarData3,
  radarData4,
} from './mock-data';
import { useRadarChart } from '../../../hooks/useRadarChart';

/**
 * @description 占比分析
 */
export const ProportionAnalysis: FC = memo(() => {
  /**
   * 雷达图
   */
  const { chartRef: radarChartRef1 } = useRadarChart(radarData1);
  const { chartRef: radarChartRef2 } = useRadarChart(radarData2);
  const { chartRef: radarChartRef3 } = useRadarChart(radarData3);
  const { chartRef: radarChartRef4 } = useRadarChart(radarData4);

  /**
   * 柱状图
   */
  const { chartRef: barChartRef1 } = useChart4(barChartData1);
  const { chartRef: barChartRef2 } = useChart4(barChartData2);
  const { chartRef: barChartRef3 } = useChart4(barChartData3);
  const { chartRef: barChartRef4 } = useChart4(barChartData4);

  return (
    <div className='w-full h-full'>
      <div className='w-full h-[55%] flex'>
        <div ref={radarChartRef1} className='w-1/4 h-full'></div>
        <div ref={radarChartRef2} className='w-1/4 h-full'></div>
        <div ref={radarChartRef3} className='w-1/4 h-full'></div>
        <div ref={radarChartRef4} className='w-1/4 h-full'></div>
      </div>
      <div className='w-full h-[45%] flex'>
        <div ref={barChartRef1} className='w-1/4 h-full'></div>
        <div ref={barChartRef2} className='w-1/4 h-full'></div>
        <div ref={barChartRef3} className='w-1/4 h-full'></div>
        <div ref={barChartRef4} className='w-1/4 h-full'></div>
      </div>
    </div>
  );
});

export default ProportionAnalysis;
