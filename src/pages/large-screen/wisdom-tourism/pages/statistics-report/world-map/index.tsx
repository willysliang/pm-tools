/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-16 14:49:13
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-16 14:50:28
 * @ Description: 世界地图
 */

import { FC, memo } from 'react';
import { useWorldMap } from './useWorldMap';

/**
 * @description 世界地图
 */
export const WorldMap: FC = memo(() => {
  const { chartRef } = useWorldMap();

  return <div className='w-full h-full' ref={chartRef}></div>;
});

export default WorldMap;
