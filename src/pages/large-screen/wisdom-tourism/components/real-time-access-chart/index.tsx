/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-10 11:11:12
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-14 10:50:07
 * @ Description: RealTimeAccessChart - 实时游客访问量
 */

import { FC, memo, useEffect, useMemo, useRef } from 'react';
import WisdomTourismPanel from '../wisdom-tourism-panel';
import { init } from 'echarts';
import type { ECharts } from 'echarts';
import 'echarts-liquidfill';
import s from './index.module.scss';

interface IRealTimeAccessChartProps {
  /** 已预约人数 */
  actualTotal: number;
}

/**
 * @description 实时游客访问量
 */
export const RealTimeAccessChart: FC<IRealTimeAccessChartProps> = memo(({ actualTotal }) => {
  const NAMESPACE = 'real-time-access-chart';

  /** 可预约总数 */
  const total = 999999;
  /** 已预约总数跟可预约总数的百分比 */
  const percentage = useMemo(() => actualTotal / total, [actualTotal]);
  /** 已预约人数格式化（转为六位数，不足补零） */
  const actualTotalFormat = useMemo<string>(() => {
    // 对已预约人数做处理，如果超出上限，则显示上限
    const actualTotalStr = (actualTotal > total ? total : actualTotal).toString();
    return actualTotalStr.padStart(6, '0');
  }, [actualTotal]);

  const option = useMemo(
    () => ({
      title: [
        {
          text: '预约量',
          left: '49%',
          top: '25%',
          textAlign: 'center',
          textStyle: {
            fontSize: '15',
            fontWeight: 'normal',
            color: '#ffffff',
            align: 'center',
            textBorderColor: 'rgba(0, 0, 0, 0)',
            textShadowColor: '#000',
            textShadowBlur: 0,
            textShadowOffsetX: 0,
            textShadowOffsetY: 1,
          },
        },
        {
          text: (percentage * 100).toFixed(2) + '%',
          left: '49%',
          top: '35%',
          textAlign: 'center',
          textStyle: {
            fontSize: '14',
            fontWeight: 'normal',
            color: '#ffffff',
            align: 'center',
            textBorderColor: 'rgba(0, 0, 0, 0)',
            textShadowColor: '#000',
            textShadowBlur: 0,
            textShadowOffsetX: 0,
            textShadowOffsetY: 1,
          },
        },
      ],
      grid: {
        top: '0',
        left: '0px',
        right: '0px',
        bottom: '0',
        containLabel: true,
      },
      polar: {
        radius: ['75%', '85%'],
        center: ['50%', '50%'],
      },
      angleAxis: {
        max: 120,
        clockwise: false,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        startAngle: 188,
      },
      radiusAxis: {
        type: 'category',
        show: true,
        axisLabel: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
      },
      series: [
        {
          type: 'liquidFill',
          radius: '70%',
          z: 2,
          center: ['50%', '50%'],
          data: [percentage, percentage, percentage], // data个数代表波浪数
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: '#35FAB6', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: 'rgba(40, 209, 247,0.3)', // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
          outline: {
            borderDistance: 0,
            itemStyle: {
              borderWidth: 2,
              borderColor: '#31d8d5',
              shadowBlur: 20,
              shadowColor: '#50c1a7',
            },
          },
          label: {
            show: false,
          },
          backgroundStyle: {
            borderWidth: 1,
            // 径向渐变，前三个参数分别是圆心 x, y 和半径，取值同线性渐变
            color: {
              type: 'radial',
              x: 0.5,
              y: 0.5,
              r: 0.5,
              colorStops: [
                {
                  offset: 0,
                  color: '#0D2648', // 0% 处的颜色
                },
                {
                  offset: 0.8,
                  color: '#0D2648', // 100% 处的颜色
                },
                {
                  offset: 1,
                  color: '#228E7D', // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
        },
        {
          type: 'pie',
          radius: ['80%', '80%'],
          center: ['50%', '50%'],
          z: 1,
          label: {
            show: false,
          },
          silent: true,
          itemStyle: {
            borderWidth: 2,
            borderType: [8, 10],
            borderDashOffset: 15,
            borderColor: '#31d8d5',
            color: '#11144e',
            borderCap: 'round',
          },
          data: [100],
        },
        {
          type: 'bar',
          data: [55],
          z: 10,
          coordinateSystem: 'polar',
          roundCap: true,
          color: '#31d8d5',
        },
      ],
    }),
    [percentage],
  );

  /**
   * 渲染图表
   */
  const actualEchartsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const charEch: ECharts = init(actualEchartsRef.current);
    charEch.setOption(option);
  }, [option]);

  return (
    <WisdomTourismPanel
      title='实时游客统计'
      style={{
        height: '330px',
        flex: 1,
      }}
      headerSlot={
        <div className='self-end'>
          <span>
            可预约总量
            <i
              style={{
                fontStyle: 'oblique',
                color: '#ff8100',
              }}
            >
              {total}
            </i>
            人
          </span>
        </div>
      }
    >
      <div className={s[NAMESPACE]}>
        <div className={s['actual-total']}>
          {actualTotalFormat.split('').map((num, idx) => (
            <div key={idx} className={s['actual-total__item']}>
              {num}
            </div>
          ))}
          <div className={s['actual-total__item']}>人</div>
        </div>

        <div className={s['actual-echarts']} ref={actualEchartsRef}></div>
      </div>
    </WisdomTourismPanel>
  );
});

export default RealTimeAccessChart;
