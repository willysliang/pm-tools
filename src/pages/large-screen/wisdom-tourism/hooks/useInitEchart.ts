/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-15 09:18:32
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-16 15:33:24
 * @ Description: 挂载更新 echart 图表 hooks
 */

import { useEffect, useRef } from 'react';
import { init } from 'echarts';
import type { ECharts, EChartsOption } from 'echarts';

/** 扩展的方法 */
interface IExtraProps {
  /** 挂载DOM成功触发的回调 */
  onMountedCallback?: (instance: ECharts) => void;
  /** 销毁DOM之前触发的回调 */
  onUnmountedCallback?: (instance: ECharts) => void;
}

/**
 * @description: 挂载更新 echart 图表
 */
export const useInitEchart = (
  option: EChartsOption,
  { onMountedCallback, onUnmountedCallback }: IExtraProps = {},
) => {
  /** 挂载 echarts 的 dom */
  const chartRef = useRef<HTMLDivElement>(null);
  /** 注册的 echart 实例 */
  const chartInstance = useRef<ECharts>();

  /**
   * 渲染图表
   */
  useEffect(() => {
    chartInstance.current = init(chartRef.current);
    chartInstance.current.resize();
    // chartInstance.current.setOption(option);
    onMountedCallback?.(chartInstance.current);

    return () => {
      onUnmountedCallback?.(chartInstance.current!);
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
