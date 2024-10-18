/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-12 17:52:08
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-15 09:34:51
 * @ Description: MaleFemaleRatioChart - 男女比例
 */

import { FC, memo, useMemo } from 'react';
import WisdomTourismPanel from '../wisdom-tourism-panel';
import iconMan from '@/assets/large-screen/wisdom-tourism/icon-man.png';
import iconWoman from '@/assets/large-screen/wisdom-tourism/icon-woman.png';
import type { EChartsOption } from 'echarts';
import { useInitEchart } from '../../hooks/useInitEchart';
import { createBEM } from '@/utils';
import s from './index.module.scss';

interface IMaleFemaleRatioChartProps {
  man: number;
  woman: number;
}

/**
 * @description 男女比例
 */
export const MaleFemaleRatioChart: FC<IMaleFemaleRatioChartProps> = memo(({ man, woman }) => {
  const NAMESPACE = 'male-female-ratio-chart';

  /**
   * echart 图表配置
   */
  const option = useMemo<EChartsOption>(
    () => ({
      xAxis: {
        type: 'value',
        show: false,
      },
      grid: {
        left: 0,
        top: '30px',
        bottom: 0,
        right: 0,
      },
      yAxis: [
        {
          type: 'category',
          position: 'left',
          data: ['男士'],
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
        },
        {
          type: 'category',
          position: 'right',
          data: ['女士'],
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: false,
            padding: [0, 0, 40, -60],
            fontSize: 12,
            lineHeight: 60,
            color: 'rgba(255, 255, 255, 0.9)',
            formatter: '{value}' + woman * 100 + '%',
            rich: {
              a: {
                color: 'transparent',
                lineHeight: 30,
                fontFamily: 'digital',
                fontSize: 12,
              },
            },
          },
        },
      ],
      series: [
        {
          type: 'bar',
          barWidth: 20,
          data: [man],
          z: 20,
          itemStyle: {
            borderRadius: 10,
            color: '#007AFE',
          },
          label: {
            show: true,
            color: '#E7E8ED',
            position: 'insideLeft',
            offset: [0, -20],
            fontSize: 12,
            formatter: () => `男士 ${man * 100}%`,
          },
          tooltip: {
            show: true,
            formatter: () => `男士 ${man * 100}%`,
          },
        },
        {
          type: 'bar',
          barWidth: 20,
          data: [1],
          barGap: '-100%',
          itemStyle: {
            borderRadius: 10,
            color: '#FF4B7A',
          },
          label: {
            show: true,
            color: '#E7E8ED',
            position: 'insideRight',
            offset: [0, -20],
            fontSize: 12,
            formatter: () => `女士 ${woman * 100}%`,
          },
          tooltip: {
            show: true,
            formatter: () => `女士 ${woman * 100}%`,
          },
        },
      ],
    }),
    [man, woman],
  );
  const { chartRef } = useInitEchart(option);

  return (
    <WisdomTourismPanel
      title='男女比例'
      style={{
        height: '270px',
        flex: 1,
        margin: '20px 0',
      }}
    >
      <div className={s[createBEM(NAMESPACE)]}>
        <div className={s[createBEM(`${NAMESPACE}-header`)]}>
          <div className={s[createBEM(`${NAMESPACE}-header`, 'man')]}>
            <span>男士</span>
            <img src={iconMan} alt='' />
          </div>
          <div className={s[createBEM(`${NAMESPACE}-header`, 'woman')]}>
            <span>女士</span>
            <img src={iconWoman} alt='' />
          </div>
        </div>
        <div className={s[createBEM(`${NAMESPACE}-content`)]} ref={chartRef}></div>
      </div>
    </WisdomTourismPanel>
  );
});

export default MaleFemaleRatioChart;
