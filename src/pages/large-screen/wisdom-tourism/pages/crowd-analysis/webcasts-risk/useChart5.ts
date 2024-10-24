/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-23 15:57:53
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-23 17:12:32
 * @ Description: 图表5
 */

import { useMemo } from 'react';
import type { EChartsOption } from 'echarts';
import { useInitEchart } from '../../../hooks/useInitEchart';

interface IChartData {
  value: number;
  name: string;
  color: string;
  data: number[];
}

const COLORS = ['#142AFE', '#3FA0FF', '#00CCFF', '#1456FE'];

/**
 * @description 图表5
 */
export const useChart5 = (chartData: IChartData[]) => {
  const labels = useMemo(
    () => chartData.map(({ name }) => ({ name, icon: 'circle' })),
    [chartData],
  );
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
        data: item.data,
      })),
    [chartData],
  );
  const seriesPieData = useMemo(
    () => chartData.map(({ value, name }) => ({ value, name })),
    [chartData],
  );

  const option = useMemo<EChartsOption>(
    () => ({
      title: {
        text: '重点用户关注排行',
        textStyle: {
          color: '#fff',
          fontSize: 12,
        },
        top: 20,
        left: '4%',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      legend: {
        data: labels,
        gridIndex: 3,
        right: '5%',
        top: 20,
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
          backgroundColor: '#4A7AFF',
          borderRadius: 3,
          margin: 0,
          padding: [1, 3, 1, 3],
        },
        inverse: true,
        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      },
      series: [
        ...seriesData,
        {
          type: 'pie',
          radius: ['20%', '21%'],
          center: ['72%', '60%'],
          data: [{ value: '1' }],
          label: { show: false },
          itemStyle: {
            color: '#7D7DA2',
          },
        },
        {
          type: 'pie',
          radius: ['40%', '65%'],
          roseType: 'area',
          center: ['72%', '60%'],
          avoidLabelOverlap: true,
          startAngle: 180,
          label: {
            show: true,
            padding: [0, -30],
            formatter: '{c} \n\n',
            position: 'outside',
            color: '#fff',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '30',
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: true,
            length2: 30,
            lineStyle: {
              // color: ['#408BE8', '#FE405C', '#3E3E7F', '#FFC740'],
            },
          },
          itemStyle: {
            color: (params: any) => COLORS[params.dataIndex % COLORS.length],
          },
          data: seriesPieData,
        } as any,
      ],
    }),
    [labels, seriesData, seriesPieData],
  );
  const { chartRef } = useInitEchart(option);

  return { chartRef };
};
