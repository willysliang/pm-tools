/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-21 15:58:46
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-22 09:17:08
 * @ Description: 图表2 - 新增/总数 柱状图
 */

import { useMemo } from 'react';
import type { EChartsOption } from 'echarts';
import { useInitEchart } from '../../../hooks/useInitEchart';

/**
 * @description 图表2 - 新增/总数 柱状图
 */
export const useChart2 = ({
  newAdddata,
  totalData,
}: {
  newAdddata: number[];
  totalData: number[];
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
      legend: [
        {
          top: '8%',
          right: '5%',
          itemWidth: 7,
          itemHeight: 7,
          textStyle: {
            color: '#5CB1C1',
          },
        },
      ],
      grid: {
        top: '15%',
        left: '3%',
        right: '5%',
        bottom: '8%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          axisLabel: {
            interval: 0,
            color: '#61B9C8',
            fontSize: 10,
          },
          axisLine: {
            symbol: ['none', 'arrow'],
            symbolSize: [6, 6],
            symbolOffset: [0, 5],
            lineStyle: {
              color: '#122C49',
            },
          },
          axisTick: { show: false },
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月'],
        },
      ],
      yAxis: {
        type: 'value',
        min: 0,
        max: 300,
        axisLabel: {
          color: '#61B9C8',
          fontSize: 9,
          showMaxLabel: false,
        },
        axisLine: {
          symbol: ['none', 'arrow'],
          symbolSize: [6, 6],
          symbolOffset: [0, 5],
          lineStyle: {
            color: '#122C49',
          },
        },
        axisTick: {
          length: 3,
        },
        name: '(人)',
        nameGap: -5,
        nameTextStyle: {
          color: '#61B9C8',
          fontSize: 9,
          align: 'right',
          padding: [0, 6, 0, 0],
        },
        splitLine: { show: false },
      },
      series: [
        {
          name: '新增',
          type: 'bar',
          barWidth: 7,
          stack: '总数',
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
                  color: '#FC9386', // 0% 处的颜色
                },
                {
                  offset: 0.4,
                  color: '#F87B86', // 40% 处的颜色
                },
                {
                  offset: 1,
                  color: '#F36087', // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            }, //背景渐变色
            borderRadius: [3.5, 3.5, 0, 0],
          },
          data: newAdddata,
        },
        {
          name: '总数',
          type: 'bar',
          barWidth: 7,
          stack: '总数',
          itemStyle: {
            color: '#8C14EA',
            borderRadius: [3.5, 3.5, 0, 0],
          },
          data: totalData,
        },
      ],
    }),
    [newAdddata, totalData],
  );
  const { chartRef } = useInitEchart(option);

  return {
    chartRef,
  };
};
