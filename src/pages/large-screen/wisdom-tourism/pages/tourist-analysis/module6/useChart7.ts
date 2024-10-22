/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-21 15:58:46
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-22 10:40:06
 * @ Description: 图表7 - 三饼图
 */

import { useMemo } from 'react';
import type { EChartsOption } from 'echarts';
import { useInitEchart } from '../../../hooks/useInitEchart';

interface IChartProps {
  labels: string[];
  data1: {
    name: string;
    value: number;
  }[];
  data2: {
    name: string;
    value: number;
  }[];
  data3: {
    name: string;
    value: number;
  }[];
}

const COLORS = ['#F74F64', '#00CCFF', '#315371', '#142AFE', '#9814FE'];

/**
 * @description 图表7 - 三饼图
 */
export const useChart7 = ({ labels, data1, data2, data3 }: IChartProps) => {
  const option = useMemo<EChartsOption>(
    () => ({
      title: [
        {
          text: '【金额】',
          left: '12%',
          bottom: '6%',
          textStyle: {
            color: '#fff',
            fontSize: 12,
          },
        },
        {
          text: '【人数】',
          left: '46%',
          bottom: '6%',
          textStyle: {
            color: '#fff',
            fontSize: 12,
          },
        },
        {
          text: '【次数】',
          right: '12%',
          bottom: '6%',
          textStyle: {
            color: '#fff',
            fontSize: 12,
          },
        },
      ],
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        data: labels.map((name) => ({
          name,
          icon: 'circle',
        })),
        left: '8%',
        top: '10%',
        itemWidth: 7,
        itemHeight: 7,
        textStyle: {
          color: '#00CCFF',
          fontSize: 10,
        },
      },
      series: [
        {
          name: '【金额】',
          type: 'pie',
          radius: '40%',
          center: ['17%', '60%'],
          data: data1,
          label: {
            fontSize: 8,
            color: '#00CCFF',
          },
          labelLine: {
            length: 15,
            length2: 10,
            lineStyle: {
              color: '#3F3F5C',
            },
          },
          itemStyle: {
            color: (params) => COLORS[params.dataIndex % COLORS.length],
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
        {
          name: '【人数】',
          type: 'pie',
          radius: '40%',
          center: ['50%', '60%'],
          data: data2,
          label: {
            fontSize: 8,
            color: '#00CCFF',
          },
          labelLine: {
            length: 15,
            length2: 10,
            lineStyle: {
              color: '#3F3F5C',
            },
          },
          itemStyle: {
            color: (params) => COLORS[params.dataIndex % COLORS.length],
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
        {
          name: '【次数】',
          type: 'pie',
          radius: '40%',
          center: ['82%', '60%'],
          data: data3,
          label: {
            fontSize: 8,
            color: '#00CCFF',
          },
          labelLine: {
            length: 15,
            length2: 10,
            lineStyle: {
              color: '#3F3F5C',
            },
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
          itemStyle: {
            color: (params) => COLORS[params.dataIndex % COLORS.length],
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
