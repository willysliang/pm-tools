/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-21 15:58:46
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-22 10:17:15
 * @ Description: 图表5 - 等分横向柱状图
 */

import { useMemo } from 'react';
import type { EChartsOption } from 'echarts';
import { useInitEchart } from '../../../hooks/useInitEchart';

/**
 * @description 图表5 - 等分横向柱状图
 */
export const useChart5 = ({
  data1,
  data2,
  labels,
}: {
  data1: number[];
  data2: number[];
  labels: string[];
}) => {
  const option = useMemo<EChartsOption>(
    () => ({
      legend: {
        left: '8%',
        top: '10%',
        itemWidth: 7,
        itemHeight: 7,
        textStyle: {
          color: '#5CB1C1',
          fontSize: 10,
        },
      },
      grid: [
        {
          show: false,
          left: '6%',
          top: '17%',
          bottom: '3%',
          containLabel: true,
          width: '40%',
        },
        {
          show: false,
          left: '53%',
          top: '17%',
          bottom: '3%',
          width: '1%',
        },
        {
          show: false,
          right: '6%',
          top: '17%',
          bottom: '3%',
          containLabel: true,
          width: '40%',
        },
      ],
      xAxis: [
        {
          splitNumber: 8,
          type: 'value',
          inverse: true,
          axisLine: { show: false },
          axisTick: { show: false },
          position: 'bottom',
          axisLabel: { show: false },
          splitLine: { show: false },
        },
        {
          gridIndex: 1,
          show: false,
        },
        {
          gridIndex: 2,
          splitNumber: 8,
          type: 'value',
          axisLine: { show: false },
          axisTick: { show: false },
          position: 'bottom',
          axisLabel: { show: false },
          splitLine: { show: false },
        },
      ],
      yAxis: [
        //左边的标尺
        {
          type: 'category',
          inverse: true,
          position: 'left',
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { show: false },
        },
        //中间的标尺
        {
          gridIndex: 1,
          type: 'category',
          inverse: true,
          position: 'left',
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: {
            show: true,
            color: '#61B9C8',
            fontSize: 8,
            showMinLabel: true,
            showMaxLabel: true,
            interval: 0,
          },
          data: labels,
        },
        //右边的标尺
        {
          gridIndex: 2,
          type: 'category',
          inverse: true,
          offset: 50,
          position: 'left',
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { show: false },
        },
      ],
      series: [
        {
          name: '次数',
          type: 'bar',
          barGap: 10,
          barWidth: '40%',
          emphasis: {
            show: false,
          } as any,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                { offset: 0, color: 'rgba(1,176,223,1)' },
                { offset: 1, color: 'rgba(1,176,223,0)' },
              ],
              global: false, // 缺省为 false
            },
            borderRadius: 5,
          },
          data: data1,
        },
        {
          name: '人数',
          type: 'bar',
          barGap: 10,
          barWidth: '40%',
          xAxisIndex: 2,
          yAxisIndex: 2,
          emphasis: {
            show: false,
          } as any,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                { offset: 0, color: 'rgba(126,19,212,0)' },
                { offset: 1, color: 'rgba(126,19,212,1)' },
              ],
              global: false, // 缺省为 false
            },
            borderRadius: 5,
          },
          data: data2,
        },
      ],
    }),
    [labels, data1, data2],
  );
  const { chartRef } = useInitEchart(option);

  return {
    chartRef,
  };
};
