/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-17 10:56:03
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-17 11:05:34
 * @ Description: 图表7 - 柱图
 */

import { useMemo } from 'react';
import type { EChartsOption } from 'echarts';
import { useInitEchart } from '../../../hooks/useInitEchart';

/**
 * @description 图表7 - 柱图
 */
export const useChart7 = (labelData: { name: string; value: number; [key: string]: unknown }[]) => {
  const labels = useMemo(() => labelData.map((item) => item.name), [labelData]);

  const option = useMemo<EChartsOption>(
    () => ({
      title: {
        text: '旅游地排行榜',
        textStyle: {
          color: '#75deef',
          fontSize: 12,
          fontWeight: 'normal',
        },
        top: '5%',
        left: '31%',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'none', // 默认为直线，可选为：'line' | 'shadow'
        },
        backgroundColor: '#11367a',
        formatter: '{b}:{c1}',
        textStyle: {
          color: '#6dd0e3',
          fontSize: 10,
        },
      },
      grid: {
        top: '25%',
        left: '1%',
        right: '4%',
        bottom: '4%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        axisLabel: {
          interval: 0,
          color: '#75deef',
          fontSize: 9,
          showMinLabel: true,
        },
        axisLine: {
          lineStyle: {
            color: '#1a3c58',
            width: 2,
          },
        },
        axisTick: { show: false },

        data: labels,
      },
      yAxis: [
        {
          type: 'value',
          min: 0,
          max: 300,
          axisLabel: {
            color: '#75deef',
            fontSize: 9,
            showMaxLabel: false,
          },
          name: '(个)',
          nameGap: -5,
          nameTextStyle: {
            color: '#75deef',
            fontSize: 9,
            align: 'right',
            padding: [0, 6, 0, 0],
          },
          axisTick: {
            length: 3,
          },
          axisLine: {
            lineStyle: {
              color: '#1a3c58',
            },
          },

          splitLine: { show: false },
        },
      ],
      series: [
        {
          name: '辅助',
          type: 'bar',
          barWidth: 12,
          itemStyle: {
            color: '#252448',
          },
          data: [300, 300, 300, 300, 300, 300, 300, 300],
        },
        {
          name: '数据',
          type: 'bar',
          barWidth: 12,
          barGap: '-100%',

          data: labelData,
        },
      ],
    }),
    [labelData, labels],
  );

  const { chartRef } = useInitEchart(option);

  return {
    chartRef,
  };
};
