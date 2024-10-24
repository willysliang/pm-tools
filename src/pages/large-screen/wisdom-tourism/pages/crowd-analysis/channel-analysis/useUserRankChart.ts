/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-22 17:28:20
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-23 15:45:34
 * @ Description: 图表2 - 用户排名
 */

import { useMemo } from 'react';
import type { EChartsOption } from 'echarts';
import { useInitEchart } from '../../../hooks/useInitEchart';

export interface IUserRankChartDataProps {
  top: string;
  color: string;
  data: { name: string; value: number }[];
}

/**
 * @description 图表2 - 用户排名
 */
export const useChart2 = (title: string, data: IUserRankChartDataProps[]) => {
  /** 图表配置 */
  const option = useMemo<EChartsOption>(
    () => ({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: '{b}:{c}',
      },
      title: {
        text: title,
        left: 'center',
        top: 25,
        textStyle: {
          fontSize: 12,
          color: '#FFF',
        },
      },
      grid: data.map(({ top }) => ({
        top: top,
        left: 8,
        right: 30,
        height: '13.5%',
      })),
      xAxis: data.map((_, index) => ({
        axisLine: { show: false },
        axisTick: { show: false, interval: 0 },
        splitLine: { show: false },
        type: 'category',
        boundaryGap: false,
        gridIndex: index,
        axisLabel: {
          show: false,
        },
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      })),
      yAxis: data.map((_, index) => ({
        type: 'value',
        axisLine: { show: false },
        gridIndex: index,
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
      })),
      series: data.map((item, index) => ({
        type: 'bar',
        barWidth: 2,
        data: item.data,
        label: {
          show: true,
          position: 'insideBottomLeft',
          offset: [3, 0],
          distance: 2,
          color: '#88B6C7',
          fontSize: 9,
          lineHeight: 9,
          rich: {
            a: {
              // 没有设置 `verticalAlign`，则 `verticalAlign` 为 bottom
            },
          },
          formatter: (data: any) => {
            const joinStr = data.data.name.length == 2 ? '\n\n' : '\n';
            return data.data.name.split('').join(joinStr);
          },
        },
        itemStyle: {
          color: {
            // 颜色线性渐变
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(' + item.color + ',1)', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(' + item.color + ',0)', // 100% 处的颜色
              },
            ],
            globalCoord: false, // 缺省为 false
          },
        },
        xAxisIndex: index,
        yAxisIndex: index,
      })),
    }),
    [title, data],
  );
  const { chartRef } = useInitEchart(option);

  return {
    chartRef,
  };
};
