/**
 * @ Author: willysliang
 * @ CreateTime: 2024-09-27 11:32:11
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-09 10:57:04
 * @ Description: dashboardRoutes - 大屏看板路由
 */

import { lazy } from 'react';
import { DataSheet, InFlight, Windmill } from '@icon-park/react';
import { IRouteConfig, IRouteConfigMap } from './types';

/** 大屏看板的一级菜单枚举 */
export enum DashboardLevelType {
  /** 大风车 */
  DASHBOARD_WINDMILL = 'DASHBOARD_WINDMILL',
  /** 智慧旅游 */
  DASHBOARD_WISDOM_TOURISM = 'DASHBOARD_WISDOM_TOURISM',
}

const LargeScreen = lazy(() => import('@/pages/large-screen/index'));
const DashboardTurbine = lazy(() => import('@/pages/large-screen/turbine'));
const DashboardWisdomTourism = lazy(() => import('@/pages/large-screen/wisdom-tourism'));

/** 大屏看板路由根 path */
export const DASHBOARD_ROUTE_BASE: IRouteConfig = {
  label: '大屏看板',
  path: `/large-screen`,
  icon: DataSheet,
  key: 'large-screen',
  element: <LargeScreen />,
  meta: {},
};

/** 大屏看板二级路由 */
export const DASHBOARD_ROUTE_CONFIGS: IRouteConfigMap<DashboardLevelType> = {
  [DashboardLevelType.DASHBOARD_WINDMILL]: {
    label: '风力发电机',
    path: `${DASHBOARD_ROUTE_BASE.path}/${DashboardLevelType.DASHBOARD_WINDMILL}`,
    icon: Windmill,
    key: 'dashboard_turbine',
    element: <DashboardTurbine />,
    meta: {},
    children: [],
  },
  [DashboardLevelType.DASHBOARD_WISDOM_TOURISM]: {
    label: '智慧旅游',
    path: `${DASHBOARD_ROUTE_BASE.path}/${DashboardLevelType.DASHBOARD_WISDOM_TOURISM}`,
    icon: InFlight,
    key: 'dashboard_wisdom-tourism',
    element: <DashboardWisdomTourism />,
    meta: {},
    children: [],
  },
};
