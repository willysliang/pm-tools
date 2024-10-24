/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-24 09:43:27
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-24 10:13:05
 * @ Description: 中国地图表
 */

import { useMemo } from 'react';
import type { EChartsOption } from 'echarts';
import echarts from '../../../hooks/useEcharts';
import { useInitEchart } from '../../../hooks/useInitEchart';
import mapJson from '../../../../wisdom-tourism/components/china-map-chart/config/china.json';
import { chinaGeoCoordMap } from '../../statistics-report/world-map/world-map-data';

const COLORS = ['#FFA200', '#0006FF', '#D6FC01', '#00D8FF', '#FF00CC', '#FF1200'];

/**
 * @description 中国地图表
 */
export const useChinaMapChart = (mapData: { name: string; value: number }[]) => {
  /** 组合数据 */
  const convertData = (data: typeof mapData) => {
    const result: Record<string, any>[] = [];
    data.forEach((item) => {
      const geoCoord = chinaGeoCoordMap[item.name];
      if (geoCoord) {
        result.push({
          name: item.name,
          value: geoCoord.concat(item.value),
        });
      }
    });
    return result;
  };

  const option = useMemo<EChartsOption>(
    () => ({
      title: [
        {
          text: '数据1',
          top: '4.8%',
          left: '7.5%',
          textStyle: {
            color: '#fff',
            fontSize: 12,
            fontWeight: 'normal',
          },
        },
        {
          text: '数据2',
          top: '11.5%',
          left: '7.5%',
          textStyle: {
            color: '#fff',
            fontSize: 12,
            fontWeight: 'normal',
          },
        },
        {
          text: '数据3',
          top: '4.8%',
          left: '37.5%',
          textStyle: {
            color: '#fff',
            fontSize: 12,
            fontWeight: 'normal',
          },
        },
        {
          text: '数据4',
          top: '11.5%',
          left: '37.5%',
          textStyle: {
            color: '#fff',
            fontSize: 12,
            fontWeight: 'normal',
          },
        },
        {
          text: '数据5',
          top: '4.8%',
          left: '67.5%',
          textStyle: {
            color: '#fff',
            fontSize: 12,
            fontWeight: 'normal',
          },
        },
        {
          text: '数据6',
          top: '11.5%',
          left: '67.5%',
          textStyle: {
            color: '#fff',
            fontSize: 12,
            fontWeight: 'normal',
          },
        },
      ],
      grid: [
        {
          top: '3%',
          left: '17.5%',
          height: '5%',
          right: '67.5%',
        },
        {
          top: '10%',
          height: '5%',
          left: '15.5%',
          right: '67.5%',
        },
        {
          top: '3%',
          left: '47.5%',
          height: '5%',
          right: '37.5%',
        },
        {
          top: '10%',
          height: '5%',
          left: '47.5%',
          right: '37.5%',
        },
        {
          top: '3%',
          left: '77.5%',
          height: '5%',
          right: '7.5%',
        },
        {
          top: '10%',
          height: '5%',
          left: '77.5%',
          right: '7.5%',
        },
      ],
      xAxis: [
        {
          axisLabel: { show: false },
          axisTick: { show: false },
          axisLine: {
            lineStyle: {
              color: '#4F2561',
            },
          },
          inverse: true,
          boundaryGap: false,
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        },
        {
          gridIndex: 1,
          axisLabel: { show: false },
          axisTick: { show: false },
          axisLine: {
            lineStyle: {
              color: '#51323E',
            },
          },
          inverse: true,
          boundaryGap: false,
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        },
        {
          gridIndex: 2,
          axisLabel: { show: false },
          axisTick: { show: false },
          axisLine: {
            lineStyle: {
              color: '#55594B',
            },
          },
          inverse: true,
          boundaryGap: false,
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        },
        {
          gridIndex: 3,
          axisLabel: { show: false },
          axisTick: { show: false },
          axisLine: {
            lineStyle: {
              color: '#451C45',
            },
          },
          inverse: true,
          boundaryGap: false,
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        },
        {
          gridIndex: 4,
          axisLabel: { show: false },
          axisTick: { show: false },
          axisLine: {
            lineStyle: {
              color: '#1E5A79',
            },
          },
          inverse: true,
          boundaryGap: false,
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        },
        {
          gridIndex: 5,
          axisLabel: { show: false },
          axisTick: { show: false },
          axisLine: {
            lineStyle: {
              color: '#172E6F',
            },
          },
          inverse: true,
          boundaryGap: false,
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        },
      ],
      yAxis: [
        {
          type: 'value',
          axisLabel: { show: false },
          position: 'right',
          axisLine: {
            show: false,
          },
          axisTick: { show: false },
          splitLine: { show: false },
        },
        {
          gridIndex: 1,
          type: 'value',
          axisLabel: { show: false },
          position: 'right',
          axisLine: {
            show: false,
          },
          axisTick: { show: false },
          splitLine: { show: false },
        },
        {
          gridIndex: 2,
          axisLabel: { show: false },
          position: 'right',
          axisLine: {
            show: false,
          },
          axisTick: { show: false },
          splitLine: { show: false },
          type: 'value',
        },
        {
          gridIndex: 3,
          axisLabel: { show: false },
          position: 'right',
          axisLine: {
            show: false,
          },
          axisTick: { show: false },
          splitLine: { show: false },
          type: 'value',
        },
        {
          gridIndex: 4,
          axisLabel: { show: false },
          position: 'right',
          axisLine: {
            show: false,
          },
          axisTick: { show: false },
          splitLine: { show: false },
          type: 'value',
        },
        {
          gridIndex: 5,
          axisLabel: { show: false },
          position: 'right',
          axisLine: {
            show: false,
          },
          axisTick: { show: false },
          splitLine: { show: false },
          type: 'value',
        },
      ],
      geo: {
        map: 'china',
        // 对地图进行放大
        zoom: 1.4,
        // 向上位置偏移
        top: '170px',
        emphasis: {
          label: {
            show: false,
          },
        },
        roam: false,
        itemStyle: {
          areaColor: '#2043AA',
          borderColor: '#111',
        },
      },
      series: [
        {
          name: 'pm2.5',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: convertData(mapData.sort((a, b) => b.value - a.value).slice(0, 10)),
          symbolSize: (val) => val[2] / 15,
          showEffectOn: 'render',
          // // 效果
          // rippleEffect: {
          //   brushType: 'stroke',
          // },
          emphasis: {
            scale: true,
          },
          label: {
            formatter: '{b}',
            position: 'right',
            show: false,
          },
          itemStyle: {
            color: (params) => COLORS[params.dataIndex % COLORS.length],
            shadowBlur: 10,
          },
          zlevel: 1,
        },
        {
          type: 'line',

          smooth: true,
          lineStyle: {
            color: 'rgba(161,23,128,1)',
            width: 1,
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(161,23,128,1)', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: 'rgba(161,23,128,0)', // 100% 处的颜色
                },
              ],
              globalCoord: false, // 缺省为 false
            },
          },
          data: [
            {
              value: 4,
              symbol: 'circle',
              symbolSize: 5,
              itemStyle: {
                color: '#293880',
                borderColor: 'rgba(161,23,128,1)',
                borderWidth: 1,
              },
            },
            { value: 5, symbol: 'none' },
            { value: 3, symbol: 'none' },
            { value: 9, symbol: 'none' },
            { value: 2, symbol: 'none' },
            { value: 4, symbol: 'none' },
            { value: 8, symbol: 'none' },
            { value: 3, symbol: 'none' },
            { value: 4, symbol: 'none' },
            { value: 4, symbol: 'none' },
          ],
        },
        {
          type: 'line',
          symbol: 'none',
          smooth: true,
          xAxisIndex: 1,
          yAxisIndex: 1,
          lineStyle: {
            color: 'rgba(196,103,20,1)',
            width: 1,
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(196,103,20,1)', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: 'rgba(196,103,20,0)', // 100% 处的颜色
                },
              ],
              globalCoord: false, // 缺省为 false
            },
          },
          data: [
            {
              value: 4,
              symbol: 'circle',
              symbolSize: 5,
              itemStyle: {
                color: '#293880',
                borderColor: 'rgba(196,103,20,1)',
                borderWidth: 1,
              },
            },
            { value: 5, symbol: 'none' },
            { value: 3, symbol: 'none' },
            { value: 9, symbol: 'none' },
            { value: 2, symbol: 'none' },
            { value: 4, symbol: 'none' },
            { value: 8, symbol: 'none' },
            { value: 3, symbol: 'none' },
            { value: 4, symbol: 'none' },
            { value: 4, symbol: 'none' },
          ],
        },
        {
          type: 'line',
          xAxisIndex: 2,
          yAxisIndex: 2,
          smooth: true,
          lineStyle: {
            color: 'rgba(181,174,28,1)',
            width: 1,
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(181,174,28,1)', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: 'rgba(181,174,28,0)', // 100% 处的颜色
                },
              ],
              globalCoord: false, // 缺省为 false
            },
          },
          data: [
            {
              value: 4,
              symbol: 'circle',
              symbolSize: 5,
              itemStyle: {
                color: '#293880',
                borderColor: 'rgba(181,174,28,1)',
                borderWidth: 1,
              },
            },
            { value: 5, symbol: 'none' },
            { value: 3, symbol: 'none' },
            { value: 9, symbol: 'none' },
            { value: 2, symbol: 'none' },
            { value: 4, symbol: 'none' },
            { value: 8, symbol: 'none' },
            { value: 3, symbol: 'none' },
            { value: 4, symbol: 'none' },
            { value: 4, symbol: 'none' },
          ],
        },
        {
          type: 'line',
          symbol: 'none',
          smooth: true,
          xAxisIndex: 3,
          yAxisIndex: 3,
          lineStyle: {
            color: 'rgba(165,15,71,1)',
            width: 1,
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(165,15,71,1)', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: 'rgba(165,15,71,0)', // 100% 处的颜色
                },
              ],
              globalCoord: false, // 缺省为 false
            },
          },
          data: [
            {
              value: 4,
              symbol: 'circle',
              symbolSize: 5,
              itemStyle: {
                color: '#293880',
                borderColor: 'rgba(165,15,71,1)',
                borderWidth: 1,
              },
            },
            { value: 5, symbol: 'none' },
            { value: 3, symbol: 'none' },
            { value: 9, symbol: 'none' },
            { value: 2, symbol: 'none' },
            { value: 4, symbol: 'none' },
            { value: 8, symbol: 'none' },
            { value: 3, symbol: 'none' },
            { value: 4, symbol: 'none' },
            { value: 4, symbol: 'none' },
          ],
        },
        {
          type: 'line',
          xAxisIndex: 4,
          yAxisIndex: 4,
          smooth: true,
          lineStyle: {
            color: 'rgba(16,182,165,1)',
            width: 1,
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(16,182,165,1)', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: 'rgba(16,182,165,0)', // 100% 处的颜色
                },
              ],
              globalCoord: false, // 缺省为 false
            },
          },
          //4,5,3,9,2,4,8,3,4,5
          data: [
            {
              value: 4,
              symbol: 'circle',
              symbolSize: 5,
              itemStyle: {
                color: '#293880',
                borderColor: 'rgba(16,182,165,1)',
                borderWidth: 1,
              },
            },
            { value: 5, symbol: 'none' },
            { value: 3, symbol: 'none' },
            { value: 9, symbol: 'none' },
            { value: 2, symbol: 'none' },
            { value: 4, symbol: 'none' },
            { value: 8, symbol: 'none' },
            { value: 3, symbol: 'none' },
            { value: 4, symbol: 'none' },
            { value: 4, symbol: 'none' },
          ],
        },
        {
          type: 'line',
          symbol: 'none',
          smooth: true,
          xAxisIndex: 5,
          yAxisIndex: 5,
          lineStyle: {
            color: 'rgba(9,83,176,1)',
            width: 1,
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(9,83,176,1)', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: 'rgba(9,83,176,0)', // 100% 处的颜色
                },
              ],
              globalCoord: false, // 缺省为 false
            },
          },
          data: [
            {
              value: 4,
              symbol: 'circle',
              symbolSize: 5,
              itemStyle: {
                color: '#293880',
                borderColor: 'rgba(9,83,176,1)',
                borderWidth: 1,
              },
            },
            { value: 5, symbol: 'none' },
            { value: 3, symbol: 'none' },
            { value: 9, symbol: 'none' },
            { value: 2, symbol: 'none' },
            { value: 4, symbol: 'none' },
            { value: 8, symbol: 'none' },
            { value: 3, symbol: 'none' },
            { value: 4, symbol: 'none' },
            { value: 4, symbol: 'none' },
          ],
        },
      ],
    }),
    [],
  );

  /**
   * 挂载渲染地图
   */
  echarts.registerMap('china', mapJson as any);
  const { chartRef } = useInitEchart(option);

  return {
    chartRef,
  };
};
