/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-16 09:16:24
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-16 14:37:57
 * @ Description: 饼图
 */

import { useMemo } from 'react';
import type { EChartsOption } from 'echarts';
import { useInitEchart } from '../../../hooks/useInitEchart';

interface IDataProps {
  value: number;
  name: string;
  itemStyle: {
    color: string;
  };
}

/** 饼图 */
export const usePieChart = (data: IDataProps[]) => {
  const option = useMemo<EChartsOption>(
    () => ({
      tooltip: {
        trigger: 'item',
        backgroundColor: '#11367a',
        textStyle: {
          color: '#6dd0e3',
          fontSize: 10,
        },
        // 数据项名称:数据项的值 %
        formatter: '{b}:{d}%',
      },
      series: [
        {
          type: 'pie',
          radius: '70%',
          center: ['50%', '50%'],
          label: {
            color: '#75deef',
            fontSize: 8,
            formatter: (data: any) => data.data.name + ' ' + data.percent.toFixed(0) + '%',
          },
          labelLine: {
            length: 10,
            length2: 8,
            lineStyle: {
              color: 'rgb(57,63,90)',
            },
          },
          data: data,
        },
      ],
    }),
    [data],
  );
  const { chartRef } = useInitEchart(option);

  return { chartRef };
};
