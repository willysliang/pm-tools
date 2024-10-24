/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-23 15:57:53
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-23 17:28:39
 * @ Description: 图表6
 */

import { useMemo } from 'react';
import type { EChartsOption } from 'echarts';
import { useInitEchart } from '../../../hooks/useInitEchart';

interface IChartData {
  name: string;
  color: string;
  /** 次数 */
  frequency: number[];
  /** 人数 */
  people: number;
  /** 盈利 */
  profit: number;
}

/**
 * @description 图表6
 */
export const useChart6 = (chartData: IChartData[]) => {
  /** label */
  const labels = useMemo(() => chartData.map((item) => item.name), [chartData]);

  /** 分类数据 */
  const seriesData = useMemo(
    () =>
      chartData.map((item) => ({
        name: item.name,
        type: 'bar',
        stack: '总量',
        barWidth: 8,
        itemStyle: {
          color: item.color,
          borderRadius: [0, 8, 8, 0],
        },
        label: {
          show: false,
          position: 'insideRight',
        },
        data: item.frequency,
      })),
    [chartData],
  );
  /** 金额数据 */
  const seriesProfitData = useMemo(() => chartData.map((item) => item.profit), [chartData]);
  /** 人数数据 */
  const seriesPeopleData = useMemo(() => chartData.map((item) => item.people), [chartData]);

  /** 图表配置项 */
  const option = useMemo<EChartsOption>(
    () => ({
      title: [
        {
          text: '重点用户关注排行',
          textStyle: {
            color: '#fff',
            fontSize: 12,
          },
          top: 20,
          left: '4%',
        },
        {
          text: '分类排行标题',
          textStyle: {
            color: '#fff',
            fontSize: 12,
          },
          top: 20,
          left: '60%',
        },
      ],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      legend: {
        data: [
          { name: '人数', icon: 'circle' },
          { name: '金额', icon: 'circle' },
        ],
        gridIndex: 3,
        orient: 'vertical',
        right: '44%',
        bottom: '6%',
        itemWidth: 7,
        itemHeight: 7,
        textStyle: {
          color: '#00CCFF',
          fontSize: 10,
        },
      },
      grid: {
        top: '15%',
        left: '3%',
        right: '50%',
        bottom: '5%',
        containLabel: true,
      },
      xAxis: {
        type: 'value',
        axisLabel: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLine: { show: false },
      },
      yAxis: {
        type: 'category',
        axisTick: { show: false },
        splitLine: { show: false },
        axisLine: { show: false },
        axisLabel: {
          color: '#fff',
          backgroundColor: '#A34FFA',
          borderRadius: 3,
          margin: 0,
          padding: [1, 3, 1, 3],
        },
        inverse: true,
        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      },
      angleAxis: {
        type: 'category',
        axisLine: {
          lineStyle: {
            color: '#172E6E',
          },
        },
        startAngle: 135,
        axisLabel: {
          color: '#04E8EB',
          fontSize: 10,
        },
        axisTick: { show: false },
        data: labels,
        z: 10,
      },
      radiusAxis: {
        splitLine: {
          lineStyle: {
            color: '#172E6E',
          },
        },
        axisTick: { show: false },
        axisLabel: { show: false },
        axisLine: {
          show: false,
        },
      },
      polar: {
        center: ['72%', '55%'],
        radius: '65%',
      },
      series: [
        ...seriesData,
        {
          type: 'bar',
          data: seriesProfitData,
          coordinateSystem: 'polar',
          name: '金额',
          itemStyle: {
            color: '#0AB9FE',
          },
          stack: 'a',
        },
        {
          type: 'bar',
          data: seriesPeopleData,
          coordinateSystem: 'polar',
          name: '人数',
          itemStyle: {
            color: {
              // 颜色线性渐变
              type: 'linear',
              x: 0,
              y: 1,
              x2: 0,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(104,18,147,1)', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#1D2584', // 100% 处的颜色
                },
              ],
              globalCoord: false, // 缺省为 false
            },
          },
          stack: 'a',
        } as any,
      ],
    }),
    [labels, seriesData, seriesProfitData, seriesPeopleData],
  );
  const { chartRef } = useInitEchart(option);

  return { chartRef };
};
