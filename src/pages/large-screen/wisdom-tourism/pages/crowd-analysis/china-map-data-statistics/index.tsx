/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-24 09:36:37
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-24 09:55:09
 * @ Description: 地图数据统计
 */

import { FC, memo } from 'react';
import { useChinaMapChart } from './useChinaMapChart';

/**
 * @description 地图数据统计
 */
export const ChinaMapDataStatistics: FC = memo(() => {
  const mapData = [
    { name: '鄂尔多斯', value: 125 },
    { name: '广州', value: 238 },
    { name: '贵阳', value: 171 },
    { name: '宝鸡', value: 272 },
    { name: '长沙', value: 175 },
    { name: '衢州', value: 177 },
    { name: '廊坊', value: 193 },
    { name: '菏泽', value: 194 },
    { name: '合肥', value: 229 },
    { name: '大庆', value: 279 },
  ];
  const { chartRef } = useChinaMapChart(mapData);

  return <div ref={chartRef} className='w-full h-full'></div>;
});

export default ChinaMapDataStatistics;
