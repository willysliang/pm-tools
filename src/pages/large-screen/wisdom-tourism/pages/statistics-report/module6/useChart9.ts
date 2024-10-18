/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-17 10:09:46
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-17 10:52:10
 * @ Description: 图表9 - 柱图
 */

import { useMemo } from 'react';
import type { EChartsOption } from 'echarts';
import { useInitEchart } from '../../../hooks/useInitEchart';

/**
 * 时间秒数格式化
 * @param {number} s 时间戳（单位：秒）
 * @returns {string} 格式化后的时分秒
 */
export const formatTime = (s: number) => {
  let t = '';
  if (s > -1) {
    const hour = Math.floor(s / 3600);
    const min = Math.floor(s / 60) % 60;
    const sec = s % 60;
    if (hour) t = hour + '时';
    t += min + '分';
    t += sec + '秒';
  }
  return t;
};

/**
 * @description 图表9 - 柱图
 */
export const useChart9 = (seriesData: { name: string; value: number; data: number[] }[]) => {
  const optionData = useMemo(() => {
    const COLORS = [
      '#2c7bfe',
      '#c2232a',
      '#feed2c',
      '#a262f2',
      '#62d5f2',
      '#fe672c',
      '#2c7bfe',
      '#69f262',
    ];
    const result: Record<string, any>[] = [];

    // 获取 seriesData 中 data 的最大长度
    const maxLen = seriesData.reduce((prev, cur) => Math.max(prev, cur.data.length), 0);
    seriesData.forEach((item, index) => {
      // 根据数据的最大长度来进行生成相应补零的数组
      const values = new Array(maxLen).fill(0);
      values.splice(index, 1, item.value);
      const obj = {
        name: item.name,
        type: 'bar',
        z: 3,
        barWidth: 10,
        barGap: '-100%', // 设置柱状图之间的间距
        data: values,
        itemStyle: {
          color: COLORS[index % COLORS.length],
        },
      };
      result.push(obj);
    });

    seriesData.forEach((item, index) => {
      const obj1 = {
        type: 'line',
        name: item.name,
        symbol: 'circle',
        smooth: true,
        symbolSize: 4,
        xAxisIndex: 2,
        yAxisIndex: 3,
        data: item.data,
        lineStyle: {
          width: 1,
        },
        itemStyle: {
          color: COLORS[index % COLORS.length],
        },
      };
      const obj2 = {
        type: 'line',
        name: item.name,
        symbol: 'circle',
        smooth: true,
        symbolSize: 4,
        xAxisIndex: 3,
        yAxisIndex: 5,
        data: item.data,
        lineStyle: {
          width: 1,
        },
        itemStyle: {
          color: COLORS[index % COLORS.length],
        },
      };
      result.push(obj1, obj2);
    });

    // 其他配置项
    const otherConfigs = [
      {
        name: '辅助',
        type: 'bar',
        barWidth: 10,
        barGap: '-100%',
        itemStyle: {
          color: '#252448',
        },
        data: [500, 500, 500, 500, 500, 500, 500, 500],
      },
      {
        name: '辅助',
        xAxisIndex: 1,
        yAxisIndex: 1,
        type: 'bar',
        barWidth: 10,
        barGap: '-100%',
        itemStyle: {
          color: '#252448',
        },
        data: [500, 500, 500, 500, 500, 500, 500],
      },
      {
        xAxisIndex: 1,
        yAxisIndex: 1,
        type: 'bar',
        z: 3,
        barWidth: 10,
        itemStyle: {
          color: '#2c7bfe',
        },
        data: [390, 330, 280, 220, 160, 100, 40],
      },
    ];

    return result.concat(otherConfigs);
  }, [seriesData]);

  const option = useMemo<EChartsOption>(
    () => ({
      tooltip: {
        trigger: 'item',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'none', // 默认为直线，可选为：'line' | 'shadow'
        },
        backgroundColor: '#11367a',
        textStyle: {
          color: '#6dd0e3',
          fontSize: 10,
        },
        formatter: (data: any) => {
          const { componentSubType, seriesName, name, value } = data;
          if (componentSubType == 'bar' && seriesName != '辅助') {
            return name + ':' + value;
          } else if (componentSubType == 'line') {
            return name + '<br>' + seriesName + ':' + formatTime(value);
          }
          return '';
        },
      },
      title: [
        {
          text: '【类型统计】',
          textStyle: {
            color: '#75deef',
            fontSize: 12,
            fontWeight: 'normal',
          },
          top: '12%',
          left: '15%',
        },
        {
          text: '【时长TOP10】',
          textStyle: {
            color: '#75deef',
            fontSize: 12,
            fontWeight: 'normal',
          },
          top: '12%',
          right: '14%',
        },
        {
          text: '【使用时长日分布】',
          textStyle: {
            color: '#75deef',
            fontSize: 12,
            fontWeight: 'normal',
          },
          top: '53%',
          left: '14%',
        },
        {
          text: '【使用时长时段分布】',
          textStyle: {
            color: '#75deef',
            fontSize: 12,
            fontWeight: 'normal',
          },
          top: '53%',
          right: '12%',
        },
      ],
      legend: [
        {
          top: '6%',
          left: 'center',
          itemWidth: 7,
          itemHeight: 7,
          textStyle: {
            color: '#75deef',
            fontSize: 12,
          },
          z: 2,
          data: seriesData.map((item) => ({
            name: item.name,
            icon: 'circle',
          })),
        },
      ],
      grid: [
        {
          left: '5%',
          top: '20%',
          right: '52%',
          bottom: '53%',
          containLabel: false,
        },
        {
          left: '52%',
          top: '20%',
          right: '3%',
          bottom: '53%',
          containLabel: false,
        },
        {
          left: '8%',
          top: '62%',
          right: '52%',
          bottom: '8%',
          containLabel: false,
        },
        {
          left: '55%',
          top: '62%',
          right: '5%',
          bottom: '8%',
          containLabel: false,
        },
      ],
      xAxis: [
        {
          type: 'category',
          data: seriesData.map((item) => item.name),
          axisLabel: {
            interval: 0,
            fontSize: 9,
            color: '#75deef',
          },
          axisLine: { show: false },
          axisTick: {
            show: false,
          },
        },
        {
          type: 'category',
          gridIndex: 1,
          data: ['数据1', '数据2', '数据3', '数据4', '数据5', '数据6', '数据7'],
          axisLine: { show: false },
          axisLabel: {
            interval: 0,
            fontSize: 9,
            color: '#75deef',
          },
          axisTick: {
            show: false,
          },
        },
        {
          type: 'category',
          gridIndex: 2,
          boundaryGap: false,
          data: ['8.1', '8.2', '8.3', '8.4', '8.5', '8.6', '8.7'],
          axisLine: {
            show: true,
            lineStyle: {
              color: '#1a3c58',
            },
          },
          axisLabel: {
            interval: 0,
            fontSize: 9,
            color: '#75deef',
          },
          axisTick: {
            show: true,
          },
        },
        {
          type: 'category',
          gridIndex: 3,
          boundaryGap: false,
          data: ['0.00', '4.00', '8.00', '12.00', '16.00', '20.00', '24.00'],
          axisLine: {
            show: true,
            lineStyle: {
              color: '#1a3c58',
            },
          },
          axisLabel: {
            interval: 0,
            fontSize: 9,
            color: '#75deef',
          },
          axisTick: {
            show: true,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          splitLine: { show: false },
          axisLabel: { show: false },
          axisLine: { show: false },
          axisTick: {
            show: false,
          },
        },
        {
          type: 'value',
          gridIndex: 1,
          axisLabel: { show: false },
          splitLine: { show: false },
          axisLine: { show: false },
          axisTick: {
            show: false,
          },
        },
        {
          type: 'value',
          gridIndex: 2,
          axisLabel: {
            interval: 0,
            fontSize: 9,
            color: '#75deef',
            showMaxLabel: false,
          },
          name: '(小时)',
          nameGap: -5,
          nameTextStyle: {
            color: '#75deef',
            fontSize: 9,
            align: 'right',
            padding: [0, 4, 0, 0],
          },
          min: 0,
          max: 6,
          splitLine: { show: false },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#1a3c58',
            },
          },
          axisTick: {
            show: true,
          },
        },
        {
          type: 'value',
          gridIndex: 2,
          axisLabel: { show: false },
          splitLine: { show: false },
          axisLine: { show: false },
          axisTick: {
            show: false,
          },
        },
        {
          type: 'value',
          gridIndex: 3,
          axisLabel: {
            interval: 0,
            fontSize: 9,
            color: '#75deef',
            showMaxLabel: false,
          },
          name: '(小时)',
          nameGap: -5,
          nameTextStyle: {
            color: '#75deef',
            fontSize: 9,
            align: 'right',
            padding: [0, 4, 0, 0],
          },
          min: 0,
          max: 6,
          splitLine: {
            show: false,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#1a3c58',
            },
          },
          axisTick: {
            show: true,
          },
        },
        {
          type: 'value',
          gridIndex: 3,
          axisLabel: { show: false },
          splitLine: { show: false },
          axisLine: { show: false },
          axisTick: {
            show: false,
          },
        },
      ],
      series: optionData,
    }),
    [optionData, seriesData],
  );

  const { chartRef } = useInitEchart(option);

  return {
    chartRef,
  };
};
