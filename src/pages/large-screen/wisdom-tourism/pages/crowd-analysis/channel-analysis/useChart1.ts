/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-22 17:28:20
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-23 15:37:07
 * @ Description: 图表1 - 分析图表 - 横向柱状图
 */

import { useMemo } from 'react';
import type { EChartsOption } from 'echarts';
import { useInitEchart } from '../../../hooks/useInitEchart';

export interface IChartDataProps {
  subtitle: string;
  top: string;
  data: { name: string; value: number; color: string };
}

/**
 * @description 图表1 - 分析图表 - 横向柱状图
 */
export const useChart1 = (title: string, data: IChartDataProps[]) => {
  /** 渠道标题 */
  const channelTitle = useMemo(() => {
    const result: Record<string, unknown>[] = [
      {
        text: title,
        top: 25,
        left: 'center',
        textStyle: {
          color: '#fff',
          fontSize: 12,
        },
      },
    ];

    data.forEach((item) => {
      result.push({
        subtext: item.subtitle,
        top: item.top,
        left: 10,
        subtextStyle: {
          color: '#8CBCCD',
          fontSize: 9,
        },
      });
    });
    return result;
  }, [title, data]);

  /** 渠道柱体最大值 */
  const channelBarMaxValue = useMemo(() => data.map(() => 100), [data]);
  /** 渠道数据 */
  const channelData = useMemo(() => data.map((item) => item.data), [data]);

  /** 图表配置 */
  const option = useMemo<EChartsOption>(
    () => ({
      tooltip: {
        trigger: 'item',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      title: channelTitle,
      grid: {
        top: '15%',
        bottom: '3%',
        left: '5%',
      },
      yAxis: {
        data: [],
        inverse: true,
        axisLabel: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
      },
      xAxis: {
        splitLine: { show: false },
        axisLabel: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
      },
      series: [
        {
          type: 'bar',
          silent: true,
          barWidth: 15,
          barGap: '-100%', // Make series be overlap
          itemStyle: {
            color: '#1F1E4E',
          },
          data: channelBarMaxValue,
        },
        {
          type: 'bar',
          barWidth: 15,
          z: 2,
          label: {
            show: true,
            position: 'insideLeft',
            color: '#fff',
            offset: [0, 1],
            fontSize: 9,
            formatter: (params) => params.name,
          },
          itemStyle: {
            color: (params: any) => params.data.color,
          },
          data: channelData,
        },
      ],
    }),
    [channelTitle, channelBarMaxValue, channelData],
  );
  const { chartRef } = useInitEchart(option);

  return {
    chartRef,
  };
};
