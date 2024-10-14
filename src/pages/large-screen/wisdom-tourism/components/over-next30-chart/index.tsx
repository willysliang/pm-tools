/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-12 11:17:07
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-12 17:35:01
 * @ Description: OverNext30Chart - 未来30天游客量趋势图
 */

import { FC, memo, useEffect, useMemo, useRef } from 'react';
import WisdomTourismPanel from '../wisdom-tourism-panel';
import { init } from 'echarts';
import type { ECharts, EChartsOption } from 'echarts';
import s from '../../index.module.scss';

/**
 * @description 未来30天游客量趋势图
 */
export const OverNext30Chart: FC = memo(() => {
  /** 获取当前日期到之后一个月30天的日期区间 */
  const initDate = (): string[] => {
    const dateList = [];
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 30);
    startDate.setDate(startDate.getDate() + 1);
    while (endDate.getTime() - startDate.getTime() >= 0) {
      const month = (startDate.getMonth() + 1).toString().padStart(2, '0');
      const day = startDate.getDate().toString().padStart(2, '0');
      dateList.push(month + '/' + day);
      startDate.setDate(startDate.getDate() + 1);
    }
    return dateList;
  };

  const UNIT = ['访问量'];
  const data = new Array(30).fill('').map(() => {
    const min = 1;
    const max = 2000;
    return Math.floor(Math.random() * (min - max) + max);
  });

  const option = useMemo<EChartsOption>(
    () => ({
      tooltip: {
        trigger: 'axis',
        confine: true,
        formatter: (params: any) => {
          const tipData = params[0];
          return `<div class="${s['chart-tooptip']}">
              <span>${tipData.name} <i >${tipData.value}</i> 人次访问</span>
          </div>`;
        },
        backgroundColor: 'transparent', // 提示标签背景颜色
        borderColor: 'transparent',
        axisPointer: {
          lineStyle: {
            type: 'dashed',
          },
          snap: true,
        },
        extraCssText: 'box-shadow: none; padding: 0',
      },
      grid: {
        top: '15%',
        left: '5%',
        right: '5%',
        bottom: '15%',
        // containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          axisLine: {
            //坐标轴轴线相关设置。数学上的x轴
            show: true,
            symbol: ['none', 'arrow'],
            symbolOffset: [0, 30],
            lineStyle: {
              color: '#233653',
              shadowOffsetX: 20,
              shadowColor: '#233653',
            },
          },
          axisLabel: {
            //坐标轴刻度标签的相关设置
            color: '#7ec7ff',
            padding: 0,
            fontSize: 12,
            formatter: (data: string) => data,
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: '#192a44',
            },
          },
          axisTick: {
            show: false,
          },
          data: initDate(),
        },
      ],
      yAxis: UNIT.map((_, index: number) => {
        return {
          name: '(访问量)',
          nameTextStyle: {
            color: '#7ec7ff',
            fontSize: 12,
            padding: [0, 30, -4, 0],
          },
          // nameGap:18,
          minInterval: 1,
          splitLine: {
            show: false,
            lineStyle: {
              color: '#192a44',
            },
          },
          axisLine: {
            show: index === 0 ? true : false,
            lineStyle: {
              color: '#233653',
            },
          },
          axisLabel: {
            show: true,
            color: '#7ec7ff',
            padding: 0,
            formatter: (value: string) => {
              if (Number(value) >= 10000) {
                value = Number(value) / 10000 + 'w';
              }
              return value;
            },
          },
          axisTick: {
            show: false,
          },
        };
      }),
      series: data.map(() => {
        return {
          name: '',
          type: 'line',
          symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
          showSymbol: false,
          smooth: true,
          lineStyle: {
            width: 1,
            color: '#707070', // 线条颜色
            borderColor: '#707070',
          },
          itemStyle: {
            color: '#F5B348',
            shadowColor: 'rgba(245, 179, 72, 0.3)',
            shadowBlur: 3,
          },
          emphasis: {
            scale: true,
          },
          areaStyle: {
            //区域填充样式
            //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: '#846B38', // 0% 处的颜色
                },
                {
                  offset: 0.5,
                  color: '#403E47', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#11144E', // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },

            shadowColor: 'rgba(255, 199, 37, 0)', //阴影颜色
            shadowBlur: 20, //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
          },
          data: data,
        };
      }),
    }),
    [data],
  );

  const OverNext30ChartRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const charEch: ECharts = init(OverNext30ChartRef.current);
    charEch.setOption(option);
  }, [option]);

  return (
    <WisdomTourismPanel
      title='未来30天游客量趋势图'
      style={{
        height: '252px',
        width: '100%',
      }}
    >
      <div className='w-full h-full' ref={OverNext30ChartRef}></div>
    </WisdomTourismPanel>
  );
});

export default OverNext30Chart;
