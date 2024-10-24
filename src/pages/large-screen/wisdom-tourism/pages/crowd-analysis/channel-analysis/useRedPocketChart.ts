/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-23 15:05:03
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-23 15:32:23
 * @ Description: 图表3 - 散点图-红包转账分析
 */

import { useMemo } from 'react';
import type { EChartsOption } from 'echarts';
import { useInitEchart } from '../../../hooks/useInitEchart';

type IScatterData = Array<Array<number>>;

/**
 * @description 图表3 - 散点图-红包转账分析
 */
export const useRedPocketChart = (
  scatterData1: IScatterData,
  scatterData2: IScatterData,
  scatterData3: IScatterData,
) => {
  /**
   * 图表配置项
   */
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
        text: '红包转账分析',
        top: '6%',
        left: '2%',
        textStyle: {
          color: '#fff',
          fontSize: 14,
        },
      },
      grid: {
        top: '23%',
        bottom: '10%',
      },
      xAxis: {
        scale: true,
        name: '次数',
        nameTextStyle: {
          color: '#0FB9CD',
          fontSize: 10,
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          color: '#0FB9CD',
          fontSize: 8,
        },
        axisTick: {
          color: '#14336D',
        } as any,
        splitLine: {
          lineStyle: {
            color: '#14336D',
          },
        },
      },
      yAxis: {
        scale: true,
        name: '金额',
        nameTextStyle: {
          color: '#0FB9CD',
          fontSize: 10,
          padding: [0, 65, -10, 0],
        },
        axisTick: { show: false },
        axisLabel: {
          color: '#0FB9CD',
          fontSize: 8,
        },
        axisLine: {
          lineStyle: {
            color: '#134076',
          },
        },
        splitLine: {
          lineStyle: {
            color: '#14336D',
          },
        },
      },
      series: [
        {
          type: 'effectScatter',
          symbolSize: 10,
          z: 10,
          itemStyle: {
            color: 'red',
          },
          data: scatterData1,
        },
        {
          type: 'scatter',
          itemStyle: {
            color: '#0E4CFF',
          },
          data: scatterData2,
        },
        {
          type: 'scatter',
          itemStyle: {
            color: 'yellowgreen',
          },
          data: scatterData3,
        },
      ],
    }),
    [scatterData1, scatterData2, scatterData3],
  );
  const { chartRef } = useInitEchart(option);

  return {
    chartRef,
  };
};
