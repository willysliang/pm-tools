/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-08 09:46:50
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-09 15:03:17
 * @ Description: 发电监测
 */

import { FC, memo, useEffect, useRef } from 'react';
import { WidgetPanel } from '../widget-panel';
import highcharts from 'highcharts';
import highcharts3d from 'highcharts/highcharts-3d';

export const MonitorEnergy: FC = memo(() => {
  const options: highcharts.Options = {
    credits: { enabled: false },
    chart: {
      type: 'column',
      backgroundColor: 'rgba(0,0,0,0)',
      options3d: {
        enabled: true,
        alpha: 5,
        beta: 20,
        depth: 0,
        viewDistance: 25,
      },
    },
    xAxis: {
      categories: [
        '#1风机',
        '#2风机',
        '#3风机',
        '#4风机',
        '#5风机',
        '#6风机',
        '#7风机',
        '#8风机',
        '#9风机',
      ],
      tickWidth: 0,
      gridLineWidth: 0,
      left: '10px',
      labels: {
        style: {
          color: '#8fe3fd',
          fontSize: '10px',
          fontFamily: 'ding-talk-sans',
        },
      },
    },
    yAxis: {
      visible: false,
      left: '10px',
    },
    tooltip: {
      pointFormat: '本月发电量: {point.y}MWh',
    },
    title: {
      text: '',
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      column: {
        depth: 20,
        borderColor: '',
        dataLabels: {
          borderWidth: 0,
          enabled: true,
          color: '#8fe3fd',
          style: {
            fontSize: '8px',
          },
          formatter() {
            return `${this.y}`;
          },
        },
      },
    },
    series: [
      {
        data: [22, 42, 99, 97, 98, 40, 97, 98, 40],
        colorByPoint: true,
      },
    ],
  };

  /**
   * 渲染图表
   */
  highcharts3d(highcharts);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    highcharts.chart(containerRef.current, options);
  }, []);

  return (
    <WidgetPanel title='发电监测'>
      <div ref={containerRef} className='flex flex-col w-full h-full'></div>
    </WidgetPanel>
  );
});

export default MonitorEnergy;
