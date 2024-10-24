/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-21 15:58:46
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-22 09:40:36
 * @ Description: 图表1 - 柱状图
 */

import { useMemo } from 'react';
import type { EChartsOption } from 'echarts';
import { useInitEchart } from '../../../hooks/useInitEchart';

/**
 * @description 图表1 - 柱状图
 */
export const useChart1 = ({
  data,
  labels,
  title,
}: {
  data: number[];
  labels: string[];
  title: string;
}) => {
  const option = useMemo<EChartsOption>(
    () => ({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        },
        backgroundColor: '#11367a',
        textStyle: {
          color: '#6dd0e3',
          fontSize: 10,
        },
      },
      legend: {
        left: '11%',
        top: '15%',
        itemWidth: 7,
        itemHeight: 7,
        textStyle: {
          color: '#5CB1C1',
        },
      },
      grid: {
        top: '12%',
        bottom: '12%',
        left: '10%',
        right: '10%',
        containLabel: false,
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: true,
          axisLine: {
            symbol: ['none', 'arrow'],
            symbolSize: [6, 6],
            symbolOffset: [0, 10],
            lineStyle: {
              color: '#122C49',
            },
          },
          axisTick: { show: false },
          axisLabel: {
            color: '#61B9C8',
            fontSize: 10,
            interval: 0,
          },
          data: labels,
        },
      ],
      yAxis: [
        {
          type: 'value',
          scale: true,
          max: 400,
          min: 0,
          interval: 50,
          axisLine: {
            symbol: ['none', 'arrow'],
            symbolSize: [6, 6],
            lineStyle: {
              color: '#122C49',
            },
          },
          axisLabel: {
            color: '#61B9C8',
            showMaxLabel: false,
            fontSize: 10,
          },
          splitLine: {
            show: false,
          },
          name: '(小时)',
          nameGap: -5,
          nameTextStyle: {
            color: '#61B9C8',
            fontSize: 9,
            align: 'right',
            padding: [0, 4, 0, 0],
          },
        },
      ],
      series: [
        {
          name: title,
          type: 'bar',
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: '#50A2F6', // 0% 处的颜色
                },
                {
                  offset: 0.4,
                  color: '#9490F9', // 40% 处的颜色
                },
                {
                  offset: 1,
                  color: '#DF7DFD', // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            }, //背景渐变色
          },
          barWidth: 10,
          barCategoryGap: 10,
          data: data,
        },
      ],
    }),
    [data, labels, title],
  );
  const { chartRef } = useInitEchart(option);

  return {
    chartRef,
  };
};
