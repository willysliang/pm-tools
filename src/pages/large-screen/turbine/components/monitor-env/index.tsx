/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-08 09:27:46
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-08 10:16:32
 * @ Description: 环境监测
 */

import { FC, memo, useEffect, useRef } from 'react';
import { WidgetPanel } from '../widget-panel';
import highcharts from 'highcharts';
import highcharts3d from 'highcharts/highcharts-3d';

/** 环境监测 */
export const MonitorEnv: FC = memo(() => {
  const containerRef = useRef<HTMLElement>();
  const options: highcharts.Options = {
    credits: { enabled: false },
    chart: {
      type: 'pie',
      backgroundColor: 'rgba(0,0,0,0)',
      options3d: {
        enabled: true,
        alpha: 50,
      },
    },
    legend: {
      align: 'right',
      verticalAlign: 'top',
      itemStyle: {
        color: '#fff',
        fontSize: '14px',
        lineHeight: '30px',
        fontFamily: 'ding-talk-sans',
      },
    },
    title: false,
    plotOptions: {
      pie: {
        innerSize: 50,
        depth: 40,
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
      },
    },
    series: [
      {
        name: '时长',
        data: [
          ['停机维护', 24],
          ['故障维护', 16],
          ['正常运行', 87],
          ['保养维护', 3],
        ],
      },
    ],
  };

  /**
   * 渲染图表
   */
  highcharts3d(highcharts);
  useEffect(() => {
    highcharts.chart(containerRef.current, options);
  }, []);

  return (
    <WidgetPanel title='环境监测'>
      <div ref={containerRef} className='flex flex-col w-full h-full'></div>
    </WidgetPanel>
  );
});

export default MonitorEnv;
