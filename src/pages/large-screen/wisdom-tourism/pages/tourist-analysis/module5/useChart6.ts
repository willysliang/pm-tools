/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-21 15:58:46
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-22 10:27:49
 * @ Description: 图表6 - 分类-柱状图
 */

import { useMemo } from 'react';
import type { EChartsOption } from 'echarts';
import { useInitEchart } from '../../../hooks/useInitEchart';

interface IChartProps {
  labels: string[];
  data1: number[];
  data2: number[];
  data3: number[];
}

/**
 * @description 图表6 - 分类-柱状图
 */
export const useChart6 = ({ labels, data1, data2, data3 }: IChartProps) => {
  const option = useMemo<EChartsOption>(
    () => ({
      grid: {
        top: '20%',
        bottom: '15%',
        left: 40,
        right: 40,
      },
      tooltip: {
        trigger: 'axis',
      },
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
      calculable: true,
      xAxis: [
        {
          type: 'category',
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
          data: labels,
        },
      ],
      yAxis: [
        {
          type: 'value',
          interval: 50,
          min: 0,
          max: 400,
          splitNumber: 7,
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
          name: '(元)',
          nameGap: -10,
          nameTextStyle: {
            color: '#61B9C8',
            fontSize: 9,
            align: 'right',
            padding: [0, 6, 0, 0],
          },
        },
        {
          type: 'value',
          interval: 50,
          position: 'right',
          offset: -35,
          min: 0,
          max: 400,
          splitNumber: 7,
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
          name: '(人)',
          nameGap: -10,
          nameTextStyle: {
            color: '#61B9C8',
            fontSize: 9,
            align: 'left',
            padding: [0, 0, 0, 6],
          },
        },
        {
          type: 'value',
          position: 'right',
          interval: 50,
          min: 0,
          max: 400,
          splitNumber: 7,
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
          name: '(次)',
          nameGap: -10,
          nameTextStyle: {
            color: '#61B9C8',
            fontSize: 9,
            align: 'left',
            padding: [0, 0, 0, 6],
          },
        },
      ],
      series: [
        {
          name: '金额',
          type: 'bar',
          barGap: 0,
          barWidth: 6,
          data: data1,
          itemStyle: {
            borderRadius: [3, 3, 0, 0],
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(252,145,134,1)', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: 'rgba(241,88,135,1)', // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            }, //背景渐变色
          },
        },
        {
          name: '人数',
          type: 'bar',
          barGap: 0,
          barWidth: 6,
          data: data2,
          itemStyle: {
            borderRadius: [3, 3, 0, 0],
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(144,20,238,1)', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: 'rgba(74,8,211,1)', // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            }, //背景渐变色
          },
        },
        {
          name: '次数',
          type: 'bar',
          barGap: 0,
          barWidth: 6,
          data: data3,
          itemStyle: {
            borderRadius: [3, 3, 0, 0],
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(0,204,255,1)', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: 'rgba(8,59,126,1)', // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            }, //背景渐变色
          },
        },
      ],
    }),
    [labels, data1, data2, data3],
  );
  const { chartRef } = useInitEchart(option);

  return {
    chartRef,
  };
};
