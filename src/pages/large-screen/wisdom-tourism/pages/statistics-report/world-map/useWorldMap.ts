/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-16 14:41:09
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-16 14:51:54
 * @ Description: 世界地图
 */

import { useMemo } from 'react';
import type { EChartsOption } from 'echarts';
import { BJData, geoCoordMap } from './world-map-data';
import worldMapJSON from './world.json';
import echarts from '../../../hooks/useEcharts';
import { useInitEchart } from '../../../hooks/useInitEchart';

/**
 * @description 世界地图
 */
export const useWorldMap = () => {
  /** 组合数据 */
  const convertData = (data: typeof BJData) => {
    const result: Record<string, any>[] = [];
    data.forEach((item) => {
      const fromCoord = geoCoordMap[item[0].name];
      const toCoord = geoCoordMap[item[1].name];
      if (fromCoord && toCoord) {
        result.push({
          fromName: item[0].name,
          toName: item[1].name,
          coords: [fromCoord, toCoord],
          value: item[1].value,
        });
      }
    });
    return result;
  };

  /** 通讯行为分析 */
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
          if (data.componentSubType === 'effectScatter') {
            return data.data.name + ':' + data.data.value[2] + '次';
          }
          return '';
        },
      },
      title: [
        {
          text: '通话走势',
          bottom: '10%',
          left: '2%',
          textStyle: {
            color: '#75deef',
            fontSize: 12,
          },
        },
      ],
      legend: {
        orient: 'horizontal',
        top: '5%',
        right: '5%',
        data: ['通话'],
        itemHeight: 7,
        textStyle: {
          color: '#75deef',
          fontSize: 12,
        },
      },
      grid: {
        top: '88%',
        left: '3%',
        right: '3%',
        bottom: '2%',
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        axisLabel: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#3F4527',
          },
        },
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
      geo: {
        map: 'world',
        zoom: 1.1,
        aspectScale: 1,
        top: '14%',
        left: '8%',
        right: '8%',
        bottom: '15%',
        emphasis: {
          itemStyle: {
            areaColor: '#2a333d',
          },
          label: {
            show: false,
          },
        },
        itemStyle: {
          areaColor: 'rgb(40,113,234)',
          borderColor: '#111',
        },
      },
      series: [
        {
          type: 'lines',
          coordinateSystem: 'geo',
          lineStyle: {
            color: '#f1e816',
          },
          data: convertData(BJData),
        },
        {
          name: '通话',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: BJData.map((dataItem) => ({
            name: dataItem[0].name + '-' + dataItem[1].name,
            value: geoCoordMap[dataItem[1].name].concat([dataItem[1]?.value ?? 0]),
          })),
          symbolSize: (val) => val[2] / 10,
          label: {
            show: false,
          },
          emphasis: {
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 1,
            },
          },
          itemStyle: {
            color: 'rgb(230,215,5)',
          },
        },
        {
          data: [
            { value: 5, symbol: 'none' },
            { value: 23, symbol: 'none' },
            { value: 9, symbol: 'none' },
            { value: 12, symbol: 'none' },
            { value: 24, symbol: 'none' },
            { value: 8, symbol: 'none' },
            { value: 23, symbol: 'none' },
            { value: 24, symbol: 'none' },
            { value: 4, symbol: 'none' },
            {
              value: 24,
              symbol: 'circle',
              symbolSize: 5,
              itemStyle: {
                color: '#293880',
                borderColor: 'rgba(228,234,40,.8)',
                borderWidth: 1,
              },
            },
          ],

          type: 'line',
          name: '通话',
          symbol: 'none',
          smooth: true,

          lineStyle: {
            color: 'rgba(228,234,40,.8)',
            width: 1,
          },
          areaStyle: {
            color: {
              // 颜色线性渐变
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(228,234,40,.8)' },
                { offset: 0.5, color: 'rgba(228,234,40,.5)' },
                { offset: 1, color: 'rgba(228,234,40,.1)' },
              ],
              globalCoord: false, // 缺省为 false
            },
          },
        },
      ],
    }),
    [],
  );
  echarts.registerMap('world', worldMapJSON as any);

  const { chartRef } = useInitEchart(option);

  return {
    chartRef,
  };
};
