/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-17 11:07:34
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-17 11:30:40
 * @ Description: 面积图
 */

import { useCallback, useMemo } from 'react';
import type { EChartsOption } from 'echarts';
import { useInitEchart } from '../../../hooks/useInitEchart';

interface IAreaChartConfigDataProps {
  title: string;
  color: string;
  name: string[];
  data: {
    name: string;
    color: string[];
    data: number[];
  }[];
}

/**
 * @description 面积图
 */
export const useAreaChart = (
  selectRangeDate: string[],
  { title, color, name, data }: IAreaChartConfigDataProps,
) => {
  /** x轴label数据 */
  const xAxisData = useMemo(() => selectRangeDate.map((item) => item.slice(5)), [selectRangeDate]);

  /**
   * 系列的配置项相关
   */
  /** 系列的数据（随机生成） */
  const seriesData = useCallback(
    () => selectRangeDate.map(() => Math.floor(Math.random() * 250)),
    [selectRangeDate],
  );
  /** 系列的配置项 */
  const seriesConfig = useMemo<Record<string, any>[]>(() => {
    return data.map((item) => {
      return {
        name: item.name,
        type: 'line',
        smooth: true,
        symbol: 'none',
        areaStyle: {
          opacity: 1,
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: item.color[0], // 0% 处的颜色
              },
              {
                offset: 0.4,
                color: item.color[0], // 40% 处的颜色
              },
              {
                offset: 1,
                color: item.color[1], // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        lineStyle: {
          width: 0,
        },
        itemStyle: {
          color: item.color[0],
        },
        data: seriesData(),
      };
    });
  }, [data, seriesData]);

  /**
   * echart 图表的配置项
   */
  const option = useMemo<EChartsOption>(
    () => ({
      title: {
        show: !!title,
        text: title,
        textStyle: {
          color: color,
          fontSize: 12,
          fontWeight: 'normal',
        },
        top: '12%',
        left: '38%',
      },
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

        formatter: (params: any) =>
          params.reduce(
            (prev: string, cur: any) => prev + `<br> ${cur.seriesName}: ${cur.value}`,
            '',
          ),
      },
      legend: {
        top: title ? '23%' : '11%',
        left: 'center',
        itemWidth: 7,
        itemHeight: 7,
        textStyle: {
          color: color,
          fontSize: 12,
        },
      },
      grid: {
        top: title ? '40%' : '14%',
        left: '5%',
        right: '5%',
        bottom: '5%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        axisLabel: {
          interval: 0,
          color: color,
          fontSize: 9,
          align: 'center',
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#1a3c58',
            width: 2,
          },
        },
        axisTick: { show: false },
        data: xAxisData,
      },
      yAxis: [
        {
          type: 'value',
          min: 0,
          max: 300,
          axisLine: {
            show: true,
            lineStyle: {
              color: '#1a3c58',
            },
          },
          axisLabel: {
            color: color,
            fontSize: 9,
            showMaxLabel: false,
          },
          axisTick: {
            length: 3,
          },
          name: name[0],
          nameGap: -5,
          nameTextStyle: {
            color: color,
            fontSize: 9,
            align: 'right',
          },
          splitLine: { show: false },
        },
        {
          type: 'value',
          min: 0,
          max: 300,
          axisLine: {
            show: true,
            lineStyle: {
              color: '#1a3c58',
            },
          },
          axisTick: {
            length: 3,
          },
          axisLabel: {
            color: color,
            fontSize: 9,
            showMaxLabel: false,
          },
          name: name[1],
          nameTextStyle: {
            color: color,
            fontSize: 9,
            align: 'left',
          },
          nameGap: -5,
          splitLine: { show: false },
        },
      ],
      series: seriesConfig,
    }),
    [title, color, name, xAxisData, seriesConfig],
  );

  const { chartRef } = useInitEchart(option);

  return {
    chartRef,
  };
};
