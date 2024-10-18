/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-16 14:56:21
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-16 14:59:47
 * @ Description: 图表4 - 圆环
 */

import { useMemo } from 'react';
import type { EChartsOption } from 'echarts';
import { useInitEchart } from '../../../hooks/useInitEchart';

/**
 * @description 图表4 - 圆环
 */
export const useChart4 = ({ title, data }: { title: string; data: Record<string, any>[] }) => {
  const option = useMemo<EChartsOption>(
    () => ({
      title: {
        text: '【' + title + '】',
        top: 20,
        x: 'center',
        textStyle: {
          color: '#75deef',
          fontSize: 14,
          fontWeight: 'normal',
        },
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)',
        backgroundColor: '#11367a',
        textStyle: {
          color: '#6dd0e3',
          fontSize: 10,
        },
      },
      series: [
        {
          name: title,
          type: 'pie',
          radius: ['40%', '60%'],
          center: ['50%', '55%'],
          avoidLabelOverlap: true,
          label: {
            show: true,
            position: 'outside',
            fontSize: 10,
            color: '#75deef',
          },
          labelLine: {
            show: true,
            length: 8,
            length2: 5,
            lineStyle: {
              color: '#303851',
            },
          },
          data: data,
        },
      ],
    }),
    [title, data],
  );

  const { chartRef } = useInitEchart(option);

  return {
    chartRef,
  };
};
