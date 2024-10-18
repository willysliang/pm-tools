/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-16 08:54:27
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-16 14:37:44
 * @ Description: 图表2
 */

import { useMemo } from 'react';
import type { EChartsOption } from 'echarts';
import { useInitEchart } from '../../../hooks/useInitEchart';

interface IDataProps {
  name: string;
  number: string;
  labels: string[];
  color: string;
  value: number[];
}

/** 图表2 - 柱图 */
export const useChart2 = (data: IDataProps) => {
  const { name, number, labels, color, value } = data;

  /** 刻度尺 */
  const scalePercentage = useMemo(() => {
    const max = Math.max.apply(null, value);
    return Array.from({ length: 6 }, () => max / 10);
  }, [value]);

  /** 网站 */
  const option = useMemo<EChartsOption>(
    () => ({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'none', // 默认为直线，可选为：'line' | 'shadow'
        },
        backgroundColor: '#11367a',
        textStyle: {
          color: '#6dd0e3',
          fontSize: 10,
        },
        formatter: (params: any) => {
          const item = params[1];
          item.number = number;
          return item.name + '<br>' + item.seriesName + ':' + item.number + '/' + item.value + '人';
        },
      },
      grid: {
        left: '4%',
        top: '5%',
        bottom: 10,
        containLabel: true,
      },
      yAxis: {
        type: 'category',
        inverse: true,
        position: 'left',
        axisLine: {
          show: true,
          lineStyle: {
            color: '#1a3c58',
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: true,
          margin: 13,
          fontSize: 10,
          color: '#75deef',
        },
        data: labels,
      },
      xAxis: {
        type: 'value',
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
      series: [
        {
          name: '辅助',
          type: 'bar',
          stack: '总量',
          barCategoryGap: 20,
          barWidth: 8,
          itemStyle: {
            color: 'rgba(0,0,0,0)',
          },
          data: scalePercentage,
        },
        {
          name: name,
          type: 'bar',
          stack: '总量',
          barCategoryGap: 20,
          barWidth: 8,
          itemStyle: {
            color: {
              // 颜色线性渐变
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgb(' + color + ',0.1)', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: 'rgb(' + color + ',1)', // 100% 处的颜色
                },
              ],
              globalCoord: false, // 缺省为 false
            },
            borderRadius: 5,
          },
          data: value,
        },
      ],
    }),
    [name, number, labels, color, value, scalePercentage],
  );
  const { chartRef } = useInitEchart(option);

  return { chartRef };
};
