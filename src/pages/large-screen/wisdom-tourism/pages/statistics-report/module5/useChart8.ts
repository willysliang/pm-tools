/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-17 09:57:09
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-17 10:06:52
 * @ Description: 图表8 - 漏斗图
 */

import { useMemo } from 'react';
import type { EChartsOption } from 'echarts';
import { useInitEchart } from '../../../hooks/useInitEchart';

const COLORS1 = ['#2c7afc', '#bd2229', '#a262f2', '#fe672c', '#27fcfe'];
const COLORS2 = [
  'rgb(44,123,254)',
  'rgb(194,35,42)',
  'rgb(162,98,242)',
  'rgb(254,103,44)',
  'rgb(44,252,254)',
];

/**
 * @description 图表8 - 漏斗图
 */
export const useChart8 = (data: { name: string; value: number }[]) => {
  const labels = useMemo(() => data.map((item) => item.name), [data]);

  const option = useMemo<EChartsOption>(
    () => ({
      tooltip: {
        trigger: 'item',
        formatter: '{b} : {c}',
        backgroundColor: '#11367a',
        textStyle: {
          color: '#6dd0e3',
          fontSize: 10,
        },
      },
      legend: {
        top: '25%',
        right: '7%',
        orient: 'vertical',
        itemWidth: 0,
        itemGap: 27,
        textStyle: {
          color: '#75deef',
          fontSize: 14,
        },
        data: labels,
      },
      series: [
        {
          name: '预期',
          type: 'funnel',
          left: '6%',
          width: '60%',
          height: '75%',
          label: {
            show: false,
          },
          labelLine: {
            show: false,
          },
          itemStyle: {
            borderWidth: 0,
            opacity: 0.7,
            color: (params) => COLORS1[params.dataIndex % COLORS1.length],
          },
          data,
        },
        {
          name: '实际',
          type: 'funnel',
          left: '6%',
          height: '75%',
          width: '60%',
          maxSize: '60%',
          z: 3,
          label: {
            position: 'inside',
            formatter: '{c}个',
            color: '#fff',
          },
          emphasis: {
            label: {
              position: 'inside',
            },
          },
          itemStyle: {
            opacity: 0.5,
            borderWidth: 0,
            color: (params) => COLORS2[params.dataIndex % COLORS2.length],
          },
          data,
        },
      ],
    }),
    [data, labels],
  );

  const { chartRef } = useInitEchart(option);

  return {
    chartRef,
  };
};
