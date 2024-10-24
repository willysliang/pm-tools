/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-23 15:57:53
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-24 09:26:50
 * @ Description: 图表4
 */

import { useMemo } from 'react';
import type { EChartsOption, SeriesOption } from 'echarts';
import { useInitEchart } from '../../../hooks/useInitEchart';

interface IChartProps {
  title: string;
  data: {
    name: string;
    color: string;
    value: (number | string)[];
  }[];
}

/**
 * @description 图表4
 */
export const useChart4 = ({ title, data }: IChartProps) => {
  /** 标题 */
  const labels = useMemo(
    () =>
      data.map((item) => ({
        name: item.name,
        icon: 'circle',
      })),
    [data],
  );
  /** 数据配置 */
  const series = useMemo<SeriesOption[]>(
    () =>
      data.map((item) => ({
        type: 'bar',
        name: item.name,
        barWidth: 4,
        barGap: 0,
        itemStyle: {
          borderRadius: 2,
          color: item.color,
        },
        data: item.value,
      })),
    [data],
  );

  /** 图表配置项 */
  const option = useMemo<EChartsOption>(
    () => ({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      title: {
        text: title,
        top: '5%',
        left: '5%',
        textStyle: {
          color: '#fff',
          fontSize: 12,
        },
      },
      legend: {
        data: labels,
        left: 'center',
        top: '17%',
        orient: 'horizontal',
        itemWidth: 7,
        itemHeight: 7,
        itemGap: 10,
        textStyle: {
          color: '#67C3D6',
          fontSize: 10,
        },
      },
      grid: {
        left: '5%',
        top: '35%',
        right: '5%',
        bottom: '15%',
      },
      xAxis: {
        axisLine: {
          lineStyle: {
            color: '#2B427F',
          },
        },
        axisLabel: {
          color: '#0DF5F8',
          fontSize: 8,
          interval: 0,
        },
        axisTick: {
          inside: true,
          alignWithLabel: true,
          interval: 0,
          color: '#2B427F',
        },
        data: ['TOP1', 'TOP2', 'TOP3', 'TOP4', 'TOP5', 'TOP6'],
      },

      yAxis: {
        type: 'value',
        axisLine: {
          show: false,
        },
        axisLabel: { show: false },
        axisTick: { show: false },
        splitLine: {
          lineStyle: {
            color: '#2B427F',
          },
        },
      },
      series: series,
    }),
    [series, labels, title],
  );
  const { chartRef } = useInitEchart(option);

  return { chartRef };
};
