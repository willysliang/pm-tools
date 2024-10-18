/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-17 09:13:46
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-17 10:09:13
 * @ Description: 模块5 - 用户行为分析
 */

import { FC, memo } from 'react';
import { useChart8 } from './useChart8';

/**
 * @description 模块5 - 用户行为分析
 */
export const Module5: FC = memo(() => {
  const data = [
    { value: 100, name: '数据1' },
    { value: 80, name: '数据2' },
    { value: 60, name: '数据3' },
    { value: 40, name: '数据4' },
    { value: 20, name: '数据5' },
  ];

  const { chartRef: chartRef8 } = useChart8(data);

  return <div ref={chartRef8} className='w-full h-full'></div>;
});

export default Module5;
