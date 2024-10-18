/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-16 15:28:34
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-16 17:11:13
 * @ Description: 图表5 - 折线图
 */

import { useMemo, useState } from 'react';
import { message } from 'antd';
import type { EChartsOption } from 'echarts';
import { useInitEchart } from '../../../hooks/useInitEchart';

/**
 * @description 图表5使用的数据源
 */
export const useChartDataSet = () => {
  const COLORS = [
    '#bf232a',
    '#feed2c',
    '#2c7bfe',
    '#feac2c',
    '#ff7b7e',
    '#2cd9fe',
    '#a262f2',
    '#2ca8fe',
  ];

  /** 获取随机模拟生成的数据 */
  const getRandomInfo = ({
    index,
    length,
    ...extraInfo
  }: {
    index: number;
    length: number;
    [key: string]: unknown;
  }) => {
    return {
      type: 'line',
      symbol: 'circle',
      smooth: false,
      itemStyle: {
        color: COLORS[index % COLORS.length],
      },
      lineStyle: {
        width: 1,
        color: COLORS[index % COLORS.length],
      },
      data: Array.from({ length }, () => Math.floor(Math.random() * 300)),
      ...(extraInfo ?? {}),
    };
  };

  /** 切换选择 日/月 */
  const handleSelect = (type: 'day' | 'month') => {
    const xAxisData: string[] = [];
    const seriesData: Record<string, unknown>[] = [];
    const legendData: string[] = [];
    const selected: Record<string, boolean> = {};
    const curYear = new Date().getFullYear();
    const curMonth = new Date().getMonth();

    /** 选择月 */
    const selectMonth = () => {
      /** 前年、今年 */
      const year = [curYear - 1, curYear];
      for (let i = 1; i <= 12; i++) {
        xAxisData.push(i + '月');
      }
      year.forEach((item, index) => {
        legendData.push(item + '年');

        const obj1 = getRandomInfo({
          index,
          length: 12,
          name: item + '年',
        });
        const obj2 = getRandomInfo({
          index,
          length: 12,
          name: item + '年',
          xAxisIndex: 1,
          yAxisIndex: 1,
        });

        seriesData.push(obj1);
        seriesData.push(obj2);
      });
    };

    /** 选择日 */
    const selectDay = () => {
      const dateLength = new Date(curYear, curMonth, 0).getDate();
      for (let i = 1; i <= dateLength; i++) {
        xAxisData.push(i + '日');
      }

      for (let index = 1; index <= 12; index++) {
        legendData.push(index + '月');
        selected[index + '月'] = index <= 4;

        const obj1 = getRandomInfo({
          index,
          length: dateLength,
          name: index + '月',
        });
        const obj2 = getRandomInfo({
          index,
          length: dateLength,
          name: index + '月',
          xAxisIndex: 1,
          yAxisIndex: 1,
        });
        seriesData.push(obj1);
        seriesData.push(obj2);
      }
    };

    if (type === 'day') selectDay();
    else if (type === 'month') selectMonth();

    return {
      type,
      xAxisData,
      seriesData,
      legendData,
      selected,
    };
  };

  /** 日/月类型 */
  const [type, setType] = useState<'day' | 'month'>('month');
  /** x轴数据 */
  const [xAxisData, setXAxisData] = useState<string[]>([]);
  /** 系列数据 */
  const [seriesData, setSeriesData] = useState<Record<string, unknown>[]>([]);
  /** 图例数据 */
  const [legendData, setLegendData] = useState<string[]>([]);
  /** 当前选择的周期（仅在选择日中才会存在） */
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  const onSelectType = (type: 'day' | 'month') => {
    const data = handleSelect(type);
    setType(data.type);
    setXAxisData(data.xAxisData);
    setSeriesData(data.seriesData);
    setLegendData(data.legendData);
    setSelected(data.selected);
  };

  return {
    onSelectType,
    type,
    setType,
    xAxisData,
    setXAxisData,
    legendData,
    setLegendData,
    seriesData,
    setSeriesData,
    selected,
    setSelected,
  };
};

/**
 * @description 图表5 - 折线图
 */
export const useChart5 = () => {
  const { onSelectType, type, xAxisData, legendData, seriesData, selected } = useChartDataSet();

  const option = useMemo<EChartsOption>(
    () => ({
      title: [
        {
          text: '【交易笔数分析】',
          textStyle: {
            fontSize: 12,
            color: '#75deef',
            fontWeight: 'normal',
          },
          top: '24%',
          left: '20%',
        },
        {
          text: '【交易金额分析】',
          textStyle: {
            fontSize: 12,
            color: '#75deef',
            fontWeight: 'normal',
          },
          top: '24%',
          right: '12%',
        },
      ],
      grid: [
        {
          show: false,
          left: '2%',
          top: '38%',
          right: '51%',
          bottom: 0,
          containLabel: true,
        },
        {
          show: false,
          left: '51%',
          top: '38%',
          bottom: 0,
          right: '2%',
          containLabel: true,
        },
      ],
      tooltip: {
        trigger: 'item',
        axisPointer: {
          type: 'none',
        },
        backgroundColor: '#11367a',
        formatter: (params: any) => {
          const { seriesId, seriesName, name, value } = params;
          const curSeriesId = seriesId.substr(seriesId.length - 1, 1);
          const units = curSeriesId == 0 ? ['交易笔数', '笔'] : ['交易金额', '元'];
          return `${seriesName}/${name}<br>${units[0]}:${value}${units[1]}`;
        },
        textStyle: {
          color: '#6dd0e3',
          fontSize: 10,
        },
      },
      legend: {
        type: 'scroll',
        top: '10%',
        textStyle: {
          color: '#75deef',
          padding: [3, 0, 0, 0],
          fontSize: 12,
        },
        pageTextStyle: {
          color: '#75deef',
        },
        pageIconSize: 10,
        pageIconColor: '#75deef',
        itemWidth: 12,
        itemHeight: 7,
        right: '15%',
        left: '15%',
        selected: selected,
        data: legendData,
      },
      xAxis: [
        {
          type: 'category',
          data: xAxisData,
          boundaryGap: false,
          axisLabel: {
            fontSize: 9,
            color: '#75deef',
            interval: 0,
            showMaxLabel: true,
            showMinLabel: true,
            formatter: (value, index) => {
              if (type === 'month') {
                if (index % 2 == 1) return value;
              } else {
                if ((index + 1) % 5 == 0) return value;
              }
              if (index == 0) return value;
            },
          },
          axisLine: {
            lineStyle: {
              color: '#1a3c58',
            },
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: true,
            inside: true,
          },
        },
        {
          gridIndex: 1,
          type: 'category',
          data: xAxisData,
          axisLabel: {
            fontSize: 9,
            color: '#75deef',
            interval: 0,
            showMaxLabel: true,
            showMinLabel: true,
            formatter: (value, index) => {
              if (type === 'month') {
                if (index % 2 == 1) return value;
              } else {
                if ((index + 1) % 5 == 0) return value;
              }
              if (index == 0) return value;
            },
          },
          axisLine: {
            lineStyle: {
              color: '#1a3c58',
            },
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: true,
            inside: true,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          splitLine: {
            show: false,
          },
          min: 0,
          max: 300,
          splitNumber: 5,
          axisLabel: {
            showMaxLabel: false,
            fontSize: 9,
            color: '#75deef',
          },
          name: '(笔)',
          nameGap: -5,
          nameTextStyle: {
            color: '#75deef',
            fontSize: 9,
            align: 'right',
            padding: [0, 6, 0, 0],
          },
          axisLine: {
            lineStyle: {
              color: '#1a3c58',
            },
          },
          axisTick: {
            length: 3,
          },
        },

        {
          gridIndex: 1,
          type: 'value',
          min: 0,
          max: 300,
          interval: 50,
          splitLine: {
            show: false,
          },
          axisLabel: {
            showMaxLabel: false,
            fontSize: 9,
            color: '#75deef',
          },
          name: '(元)',
          nameGap: -5,
          nameTextStyle: {
            color: '#75deef',
            fontSize: 9,
            align: 'right',
            padding: [0, 6, 0, 0],
          },
          axisLine: {
            lineStyle: {
              color: '#1a3c58',
            },
          },
          axisTick: {
            length: 3,
          },
        },
      ],
      series: seriesData,
    }),
    [type, xAxisData, legendData, seriesData, selected],
  );

  const { chartRef } = useInitEchart(option, {
    onMountedCallback: (chartInstance) => {
      onSelectType('day');
      chartInstance.on('legendselectchanged', (params: any) => {
        const result = [];
        for (const i in params.selected) {
          const item: boolean = params.selected[i];
          if (item) result.push(item);
        }
        if (result.length > 4) {
          message.warning('当前最多显示4个图例');
          chartInstance.dispatchAction({
            type: 'legendUnSelect',
            // 图例名称
            name: params.name,
          });
        }
      });
    },
  });

  return {
    chartRef,
    type,
    onSelectType,
  };
};
