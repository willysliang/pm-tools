/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-10 23:33:25
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-15 09:34:02
 * @ Description: HotPlateChart - 热门景区排行
 */

import { FC, memo, useMemo } from 'react';
import WisdomTourismPanel from '../wisdom-tourism-panel';
import { ranking1, ranking2, ranking3, ranking4 } from './config/ranking-icon';
import type { EChartsOption } from 'echarts';
import { useInitEchart } from '../../hooks/useInitEchart';
import { createBEM } from '@/utils';
import s from './index.module.scss';

export interface IHotChartDataProps {
  name: string;
  value: number;
  percentage: string;
  maxValue: number;
}

const COLORS = ['#1089E7', '#F57474', '#56D0E3', '#F8B448', '#8B78F6'];

/**
 * @description 热门景区排行
 */
export const HotPlateChart: FC<{ data: IHotChartDataProps[] }> = memo(({ data }) => {
  const NAMESPACE = 'hot-plate-chart';

  /**
   * echart 图表配置
   */
  const option = useMemo<EChartsOption>(
    () => ({
      grid: {
        top: '5%',
        left: '7%',
        right: '4%',
        bottom: '1%',
        containLabel: true,
      },
      xAxis: {
        type: 'value',
        axisLine: {
          show: false,
          lineStyle: {
            color: 'white',
          },
        },
        nameGap: 1,
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
          fontSize: 16,
        },
        // boundaryGap: ["3%", "2%"],
        // splitNumber: 4,
        triggerEvent: false,
      },
      yAxis: [
        {
          show: true,
          data: data.map((val) => val.name),
          inverse: true,
          axisLine: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: '#fff',
            formatter: (value: string) => {
              const str = value.length > 6 ? value.slice(0, 6) + '...' : value;
              const index = data.map((item) => item.name).indexOf(value) + 1;
              return [
                '{' + (index > 3 ? 'lg' : 'lg' + index) + '|NO.' + index + '}',
                '{title|' + str + '}',
              ].join(' ');
            },
            rich: {
              lg1: {
                width: 60,
                backgroundColor: {
                  image: ranking1,
                },
                color: '#fff',
                align: 'center',
                height: 20,
                fontSize: 13,
              },
              lg2: {
                width: 60,
                backgroundColor: {
                  image: ranking2,
                },
                color: '#fff',
                align: 'center',
                height: 20,
                fontSize: 13,
              },
              lg3: {
                width: 60,
                backgroundColor: {
                  image: ranking3,
                },
                color: '#fff',
                align: 'center',
                height: 20,
                fontSize: 13,
              },
              lg: {
                width: 60,
                backgroundColor: {
                  image: ranking4,
                },
                color: '#fff',
                align: 'center',

                height: 20,
                fontSize: 13,
              },
              title: {
                width: 60,
                fontSize: 13,
                align: 'center',
                padding: [0, 10, 0, 15],
              },
            },
          },
          triggerEvent: false,
        },
        {
          show: true,
          inverse: true,
          data: data,
          axisLabel: {
            fontSize: 14,
            color: '#fff',
            // align: "right",
            margin: 20,
            formatter: (value: number): string => {
              return value >= 10000 ? (value / 10000).toFixed(2) + 'w' : value.toFixed(0);
            },
          },
          axisLine: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          triggerEvent: false,
        },
      ],
      series: [
        {
          name: '条',
          type: 'bar',
          yAxisIndex: 0,
          data: data,
          barWidth: 14,
          itemStyle: {
            borderRadius: 30,
            color: (params) => COLORS[params.dataIndex % COLORS.length],
          },
          label: {
            show: true,
            position: [12, 1],
            lineHeight: 14,
            color: '#fff',
            formatter: (params: any) => params.data.percentage,
          },
        },
        {
          name: '框',
          type: 'bar',
          yAxisIndex: 1,
          data: data.map((val) => (!val.maxValue ? 5 : val.maxValue)),
          barWidth: 18,
          itemStyle: {
            color: 'none',
            borderColor: '#00c1de',
            borderWidth: 1,
            borderRadius: 15,
          },
          silent: true,
        },
      ],
    }),
    [data],
  );
  const { chartRef } = useInitEchart(option);

  return (
    <WisdomTourismPanel
      title='热门景区排行'
      style={{
        height: '300px',
      }}
    >
      <div className={s[createBEM(NAMESPACE)]}>
        <div className={s[createBEM(`${NAMESPACE}-header`)]}>
          <span>排名</span>
          <span>景区</span>
          <span>预约数量</span>
        </div>
        <div className={s[createBEM(`${NAMESPACE}-body`)]} ref={chartRef}></div>
      </div>
    </WisdomTourismPanel>
  );
});

export default HotPlateChart;
