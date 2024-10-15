/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-12 17:42:03
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-15 09:02:52
 * @ Description: AgeRatioChart - 年龄比例图表
 */

import { FC, memo, useEffect, useMemo, useRef } from 'react';
import WisdomTourismPanel from '../wisdom-tourism-panel';
import { init } from 'echarts';
import type { ECharts, EChartsOption } from 'echarts';

export interface IAgeRatioChartDataProps {
  value: number;
  name: string;
  percentage: string;
}

const COLORS = ['#F6C95C', '#EF7D33', '#1F9393', '#184EA1', '#81C8EF', '#9270CA'];

/**
 * @description 年龄比例图表
 */
export const AgeRatioChart: FC<{ data: IAgeRatioChartDataProps[] }> = memo(({ data }) => {
  const option = useMemo<EChartsOption>(
    () => ({
      color: COLORS,
      tooltip: {
        show: true,
        trigger: 'item',
        formatter: '{b} <br/>占比：{d}%',
      },
      legend: {
        orient: 'vertical',
        right: '10px',
        top: '15px',
        itemGap: 15,
        itemWidth: 14,
        formatter: (name) => {
          const info = data.find((val) => val.name === name);
          const text = ' ' + name + '　 ' + info?.percentage;
          return text;
        },
        textStyle: {
          color: '#fff',
        },
      },
      grid: {
        top: 'bottom',
        left: 10,
        bottom: 10,
      },
      series: [
        {
          zlevel: 1,
          name: '年龄比例',
          type: 'pie',
          selectedMode: 'single',
          radius: [50, 90],
          center: ['30%', '50%'],
          startAngle: 60,
          // hoverAnimation: false,
          label: {
            position: 'inside',
            show: true,
            color: '#fff',
            formatter: (params: any) => params.data.percentage,
            rich: {
              b: {
                fontSize: 16,
                lineHeight: 30,
                color: '#fff',
              },
            },
          },
          itemStyle: {
            shadowColor: 'rgba(0, 0, 0, 0.2)',
            shadowBlur: 10,
          },
          data: data.map((val, index: number) => ({
            value: val.value,
            name: val.name,
            percentage: val.percentage,
            itemStyle: {
              borderWidth: 10,
              shadowBlur: 20,
              borderColor: COLORS[index],
              borderRadius: 10,
            },
          })),
        },
        {
          name: '',
          type: 'pie',
          selectedMode: 'single',
          radius: [50, 90],
          center: ['30%', '50%'],
          startAngle: 60,
          data: [
            {
              value: 1000,
              name: '',
              label: {
                show: true,
                formatter: '{a|本日总数}',
                rich: {
                  a: {
                    align: 'center',
                    color: 'rgb(98,137,169)',
                    fontSize: 14,
                  },
                },
                position: 'center',
              },
            },
          ],
        },
      ],
    }),
    [data],
  );

  const chartRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const charEch: ECharts = init(chartRef.current);
    charEch.setOption(option);

    return () => {
      charEch.dispose();
    };
  }, [option]);

  return (
    <WisdomTourismPanel
      title='年龄比例'
      style={{
        height: '320px',
        flex: 1,
      }}
    >
      <div className='w-full h-full' ref={chartRef}></div>
    </WisdomTourismPanel>
  );
});

export default AgeRatioChart;
