/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-16 17:14:56
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-16 17:53:05
 * @ Description: 图表6 - 饼环图
 */

import { useMemo } from 'react';
import type { EChartsOption } from 'echarts';
import { useInitEchart } from '../../../hooks/useInitEchart';

interface IChartDataProps {
  data1: Record<string, any>[];
  data2: Record<string, any>[];
}

/**
 * @description 图表6 - 饼环图（交易支出）
 */
export const useChart6 = (title: string, { data1, data2 }: IChartDataProps) => {
  const option = useMemo<EChartsOption>(
    () => ({
      title: {
        text: '【' + title + '】',
        x: 'center',
        top: 0,
        textStyle: {
          color: '#75deef',
          fontSize: 12,
          fontWeight: 'normal',
        },
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b} : {c} ({d}%)',
        backgroundColor: '#11367a',
        textStyle: {
          color: '#6dd0e3',
          fontSize: 10,
        },
      },
      series: [
        {
          type: 'pie',
          startAngle: 160,
          radius: [0, '30%'],
          label: {
            show: true,
            position: 'inside',
            fontSize: 10,
          },
          center: ['50%', '60%'],
          data: data1,
        },
        {
          type: 'pie',
          startAngle: 160,
          radius: ['52%', '72%'],
          labelLine: {
            lineStyle: {
              color: '#444b62',
            },
            length: 5,
            length2: 5,
          },
          emphasis: {
            label: {
              color: '#fff',
              show: true,
            },
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
          label: {
            position: 'outside',
            borderRadius: 4,
            color: '#fff',
            fontSize: 10,
            padding: 0,
            backgroundColor: '#183566',
            formatter: '{b}{c}笔/{d}%',
          },
          center: ['50%', '60%'],
          data: data2,
        },
      ],
    }),
    [title, data1, data2],
  );

  const { chartRef } = useInitEchart(option, {
    onMountedCallback: (chartInstance) => {
      const params = {
        type: 'highlight',
        name: data1.map((item) => item.name),
      };
      chartInstance.dispatchAction(params);
      chartInstance.on('mouseout', () => {
        chartInstance.dispatchAction(params);
      });
    },
  });

  return {
    chartRef,
  };
};
