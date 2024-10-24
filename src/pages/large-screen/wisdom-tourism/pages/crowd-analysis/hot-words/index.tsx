/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-23 17:32:40
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-23 18:01:44
 * @ Description: 舆论、心里风险分析
 */

import { FC, memo } from 'react';
import { useDrawRingChart } from './useDrawRingChart';
import { useHotWordsChart } from './useHotWordsChart';

/**
 * @description 舆论、心里风险分析
 */
export const HotWords: FC = memo(() => {
  const { drawRingRef: drawRingRef1 } = useDrawRingChart('分类1', '#00CCFF');
  const { drawRingRef: drawRingRef2 } = useDrawRingChart('分类2', '#EDCE43');
  const { drawRingRef: drawRingRef3 } = useDrawRingChart('分类3', '#F83552');

  const { chartRef: hotWordsChartRef } = useHotWordsChart();

  return (
    <div className='w-full h-full flex'>
      <div className='w-[30%] h-full flex flex-col justify-end pb-4'>
        <div className='w-full h-[25px] text-[12px] leading-[25px] font-bold text-center text-white'>
          标题1
        </div>
        <div ref={drawRingRef1} className='w-full h-[30%]'></div>
        <div ref={drawRingRef2} className='w-full h-[30%]'></div>
        <div ref={drawRingRef3} className='w-full h-[30%]'></div>
      </div>
      <div ref={hotWordsChartRef} className='w-[70%] h-full'></div>
    </div>
  );
});

export default HotWords;
