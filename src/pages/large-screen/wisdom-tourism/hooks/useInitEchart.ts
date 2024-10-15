/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-15 09:18:32
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-15 09:28:57
 * @ Description: 挂载更新 echart 图表 hooks
 */

import { useEffect, useRef } from 'react';
import { init } from 'echarts';
import type { ECharts, EChartsOption } from 'echarts';

/**
 * @description: 挂载更新 echart 图表
 */
export const useInitEchart = (option: EChartsOption) => {
  /** 挂载 echarts 的 dom */
  const chartRef = useRef<HTMLDivElement>(null);
  /** 注册的 echart 实例 */
  const chartInstance = useRef<ECharts>();

  /**
   * 渲染图表
   */
  useEffect(() => {
    chartInstance.current = init(chartRef.current);
    chartInstance.current.setOption(option);
    return () => {
      chartInstance.current?.dispose();
    };
  }, []);

  /**
   * 更新图表
   */
  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.setOption(option);
    }
  }, [option]);

  return {
    chartRef,
  };
};
