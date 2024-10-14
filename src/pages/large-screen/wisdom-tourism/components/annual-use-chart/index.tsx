/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-12 17:51:21
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-14 10:56:27
 * @ Description: AnnualUseChart - 年度游客量对比
 */

import { FC, memo, useEffect, useMemo, useRef } from 'react';
import WisdomTourismPanel from '../wisdom-tourism-panel';
import { init } from 'echarts';
import type { ECharts, EChartsOption } from 'echarts';
import s from '../../index.module.scss';

export interface IAnnualUseChartDataProps {
  label: string;
  value: string[];
}

/** 以月份为一个周期的 label */
const COLUMNS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
/** 折线线条色 */
const COLORS = ['#FFA600', '#007AFE', '#FF4B7A'];
const gradientColors = [
  'rgba(254, 219, 101,0.1)',
  'rgba(0, 122, 254,0.1)',
  'rgba(255, 75, 122, 0.1)',
];

/**
 * @description 年度游客量对比
 */
export const AnnualUseChart: FC<{ data: IAnnualUseChartDataProps[] }> = memo(({ data }) => {
  const option = useMemo<EChartsOption>(
    () => ({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'none',
        },
        borderWidth: 0, //边框线宽
        padding: 0,
        backgroundColor: 'transparent',
        formatter: (p: any) => {
          let str = '';
          // 防止内容溢出
          p.slice(0, 3).forEach((val: Record<string, any>) => {
            str += `
              <div class="${s['year-item']}">
                <span class="${s['year-item__year-dot']}" style="background-color: ${val.color};"></span>
                <span class="${s['year-item__year-name']}">${val.seriesName}</span>
                <span class="${s['year-item__year-value']}">${
                  val.data >= 10000 ? (val.data / 10000).toFixed(2) + 'w' : val.data
                }</span>
              </div>
            `;
          });
          const dom = `
            <div class="${s['annual-use-chart-tooltip']}">
              <span class="${s['annual-use-chart-tooltip__month']}">${p[0].dataIndex + 1}月</span>
              <div class="${s['annual-use-chart-tooltip__list']}">
                ${str}
              </div>
            </div>
          `;
          return dom;
        },
      },

      legend: {
        right: '2%',
        top: '0%',
        itemWidth: 15,
        itemHeight: 6,
        align: 'auto',
        icon: 'rect',
        itemGap: 15,
        textStyle: {
          color: '#ebebf0',
        },
      },
      grid: {
        top: '20%',
        left: '40',
        right: '4%',
        bottom: '15%',
        // containLabel: true
      },
      xAxis: [
        {
          name: '(月份)',
          type: 'category',
          boundaryGap: false,
          axisLine: {
            //坐标轴轴线相关设置。数学上的x轴
            show: true,
            lineStyle: {
              color: '#233653',
            },
          },
          axisLabel: {
            //坐标轴刻度标签的相关设置
            color: '#7ec7ff',
            padding: 0,
            fontSize: 12,
            formatter: (data) => data,
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
          data: COLUMNS,
        },
      ],
      yAxis: {
        name: '(人数)',
        nameTextStyle: {
          color: '#D6DFEA',
          fontSize: 12,
          padding: [0, 30, 0, 0],
        },
        // nameGap:18,
        minInterval: 1,
        // min: 4,
        splitNumber: 5,
        splitLine: {
          show: false,
          lineStyle: {
            color: '#192a44',
          },
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#233653',
          },
        },
        axisLabel: {
          show: true,
          color: '#B9D6D6',
          padding: 0,
          formatter: (value: number) => (value >= 10000 ? value / 10000 + 'w' : value),
        },
        axisTick: {
          show: false,
        },
      },
      series: data.map((val, index: number) => {
        return {
          name: val.label,
          type: 'line',
          symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
          showSymbol: false,
          smooth: true,
          lineStyle: {
            width: 1,
            color: COLORS[index % COLORS.length], // 线条颜色
            borderColor: COLORS[index % COLORS.length],
          },
          itemStyle: {
            color: COLORS[index % COLORS.length],
            borderColor: '#646ace',
            borderWidth: 2,
          },
          tooltip: {
            show: true,
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
                  color: COLORS[index % COLORS.length], // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: gradientColors[index % gradientColors.length], // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
            shadowColor: 'rgba(25,163,223, 0.3)', //阴影颜色
            shadowBlur: 20, //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
          },
          data: val.value,
        };
      }),
    }),
    [data],
  );

  const chartRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const charEch: ECharts = init(chartRef.current);
    charEch.setOption(option);
  }, [option]);

  return (
    <WisdomTourismPanel
      title='年度游客量对比'
      style={{
        height: '350px',
        flex: 1,
        margin: '20px 0',
      }}
    >
      <div className='w-full h-full' ref={chartRef}></div>
    </WisdomTourismPanel>
  );
});

export default AnnualUseChart;
