/**
 * @ Author: willysliang
 * @ CreateTime: 2025-01-15 16:56:33
 * @ Modifier: willysliang
 * @ ModifierTime: 2025-01-15 17:24:32
 * @ Description: report-analysis 报表分析 - 路由配置
 */

import { lazy } from 'react';
import { PrinterOne } from '@icon-park/react';
import { IRouteConfigMap, AppRouteLevelType } from './types';

/** 枚举 - 报表分析路由类型 */
export enum ReportAnalysisRouteEnum {
  /** 报表打印 */
  REPORT_PRINT = 'report-print',
}

/** 报表分析基础 Path */
const REPORT_ANALYSIS_BASE_PATH = `/${AppRouteLevelType.REPORT_ANALYSIS}`;

/**
 * 懒加载的子路由
 */
const ReportPrint = lazy(() => import('@/pages/report-analysis/report-print'));

/** 报表分析路由 Map */
export const REPORT_ANALYSIS_ROUTE_CONFIGS: IRouteConfigMap<ReportAnalysisRouteEnum> = {
  [ReportAnalysisRouteEnum.REPORT_PRINT]: {
    label: '报表打印',
    path: `${REPORT_ANALYSIS_BASE_PATH}/${ReportAnalysisRouteEnum.REPORT_PRINT}`,
    icon: PrinterOne,
    key: ReportAnalysisRouteEnum.REPORT_PRINT,
    element: <ReportPrint />,
    meta: {},
  },
};
