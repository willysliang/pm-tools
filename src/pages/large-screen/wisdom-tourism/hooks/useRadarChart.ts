/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-18 22:56:40
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-21 11:36:46
 * @ Description: 雷达图
 */

import { useMemo } from 'react';
import type { EChartsOption } from 'echarts';
import { useInitEchart } from './useInitEchart';

interface IRadarChartProps {
  title: string;
  indicator: { text: string }[];
  data: {
    name: string;
    value: any;
    color: string;
  }[];
}

/**
 * @description 雷达图
 */
export const useRadarChart = ({ title, indicator, data }: IRadarChartProps) => {
  const option = useMemo<EChartsOption>(() => {
    const seriesData = data.map((item) => ({
      value: item.value,
      name: item.name,
      symbol: 'none',
      symbolSize: 5,
      itemStyle: {
        color: item.color,
      },
      lineStyle: {
        color: item.color,
        width: 1,
      },
      emphasis: {
        lineStyle: {
          width: 2,
        },
      },
    }));

    return {
      tooltip: {
        trigger: 'item',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      title: {
        text: title,
        top: '15%',
        left: 'center',
        textStyle: {
          color: '#fff',
          fontSize: 12,
        },
      },
      legend: {
        data: data.map((item) => ({ name: item.name, icon: 'circle' })),
        left: 'center',
        top: '85%',
        itemWidth: 7,
        itemHeight: 7,
        textStyle: {
          color: '#67C3D6',
          fontSize: 10,
        },
      },
      radar: {
        indicator,
        center: ['50%', '50%'],
        radius: '50%',
        startAngle: 90,
        splitNumber: 4,
        shape: 'circle',
        axisName: {
          textStyle: {
            color: '#0DECF0',
            fontSize: 8,
          },
        },
        axisNameGap: 3,
        splitArea: {
          areaStyle: {
            color: ['#1166C4', '#0C52A4', '#102F7D', '#13216B'],
          },
        },
        axisLine: {
          lineStyle: {
            color: '#163794',
          },
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: '#163794',
          },
        },
      },
      series: {
        name: '雷达图',
        type: 'radar',
        emphasis: {
          // color: 各异,
          lineStyle: {
            width: 4,
          },
        },
        data: seriesData,
      },
    } as EChartsOption;
  }, [title, indicator, data]);

  const { chartRef } = useInitEchart(option);

  return {
    chartRef,
  };
};
