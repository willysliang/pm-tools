/**
 * @ Author: willysliang
 * @ CreateTime: 2025-01-15 17:10:18
 * @ Modifier: willysliang
 * @ ModifierTime: 2025-01-15 17:30:11
 * @ Description: 报表分析
 */

import { FC, memo } from 'react';
import LayoutContainer, { type IRouteListProps } from '@comp/layout/LayoutContainer';
import {
  REPORT_ANALYSIS_ROUTE_CONFIGS,
  ReportAnalysisRouteEnum,
} from '@/router/routes/reportAnalysisRoutes';

const ROUTE_LIST: IRouteListProps = [
  {
    label: '',
    list: [REPORT_ANALYSIS_ROUTE_CONFIGS[ReportAnalysisRouteEnum.REPORT_PRINT]],
  },
];

/**
 * @description 报表分析模块
 */
export const ReportAnalysis: FC = memo(() => {
  return <LayoutContainer routeList={ROUTE_LIST}></LayoutContainer>;
});

export default ReportAnalysis;
