/**
 * @ Author: willysliang
 * @ CreateTime: 2024-09-27 11:32:11
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-15 09:03:46
 * @ Description: dashboardRoutes - 大屏看板路由
 */

import { lazy } from 'react';
import { DataSheet, InFlight, Windmill } from '@icon-park/react';
import { IRouteConfig, IRouteConfigMap } from './types';

/**
 * 根路由部分
 */
const LargeScreen = lazy(() => import('@/pages/large-screen/index'));

/** 大屏看板路由根 path */
export const DASHBOARD_ROUTE_BASE: IRouteConfig = {
  label: '大屏看板',
  path: `/large-screen`,
  icon: DataSheet,
  key: 'large-screen',
  element: <LargeScreen />,
  meta: {},
};

/**
 * 二级路由部分
 */
/** 大屏看板的一级菜单枚举 */
export enum DashboardLevelType {
  /** 大风车 */
  DASHBOARD_WINDMILL = 'DASHBOARD_WINDMILL',
  /** 智慧旅游 */
  DASHBOARD_WISDOM_TOURISM = 'DASHBOARD_WISDOM_TOURISM',
}

const DashboardTurbine = lazy(() => import('@/pages/large-screen/turbine'));
const DashboardWisdomTourism = lazy(() => import('@/pages/large-screen/wisdom-tourism'));

/** 大屏看板 - 二级路由 */
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

/**
 * 三级路由部分
 */
/** 智慧旅游子模块菜单枚举 */
export enum EnumSmartTourismSubMenu {
  /** 首页 */
  BASE = '',
  /** 游客量分析 */
  TOURIST_ANALYSIS = 'TOURIST_ANALYSIS',
  /** 人群分析 */
  CROWD_ANALYSIS = 'CROWD_ANALYSIS',
  /** 统计报告 */
  STATISTICS_REPORT = 'STATISTICS_REPORT',
}

/** 智慧旅游子模块 - 基础路径 */
export const SmartTourismSubBasePath =
  DASHBOARD_ROUTE_CONFIGS[DashboardLevelType.DASHBOARD_WISDOM_TOURISM].path;

const SmartTourismBase = lazy(
  () => import('@/pages/large-screen/wisdom-tourism/components/wisdom-tourism-main'),
);
const SmartTourismTouristAnalysis = lazy(
  () => import('@/pages/large-screen/wisdom-tourism/pages/tourist-analysis'),
);
const SmartTourismCrowdAnalysis = lazy(
  () => import('@/pages/large-screen/wisdom-tourism/pages/crowd-analysis'),
);
const SmartTourismStatisticsReport = lazy(
  () => import('@/pages/large-screen/wisdom-tourism/pages/statistics-report'),
);

/** 智慧旅游子模块 - 三级路由 */
export const SMART_TOURISM_ROUTE_CONFIGS: IRouteConfigMap<EnumSmartTourismSubMenu> = {
  [EnumSmartTourismSubMenu.BASE]: {
    label: '智慧旅游-首页',
    path: `${SmartTourismSubBasePath}/${EnumSmartTourismSubMenu.BASE}`,
    icon: Windmill,
    key: 'dashboard_wisdom-tourism_base',
    element: <SmartTourismBase />,
    meta: {},
  },
  [EnumSmartTourismSubMenu.TOURIST_ANALYSIS]: {
    label: '智慧旅游-游客量分析',
    path: `${SmartTourismSubBasePath}/${EnumSmartTourismSubMenu.TOURIST_ANALYSIS}`,
    icon: Windmill,
    key: 'dashboard_wisdom-tourism_tourist-analysis',
    element: <SmartTourismTouristAnalysis />,
  },
  [EnumSmartTourismSubMenu.CROWD_ANALYSIS]: {
    label: '智慧旅游-人群分析',
    path: `${SmartTourismSubBasePath}/${EnumSmartTourismSubMenu.CROWD_ANALYSIS}`,
    icon: Windmill,
    key: 'dashboard_wisdom-tourism_crowd-analysis',
    element: <SmartTourismCrowdAnalysis />,
  },
  [EnumSmartTourismSubMenu.STATISTICS_REPORT]: {
    label: '智慧旅游-统计报告',
    path: `${SmartTourismSubBasePath}/${EnumSmartTourismSubMenu.STATISTICS_REPORT}`,
    icon: Windmill,
    key: 'dashboard_wisdom-tourism_statistics-report',
    element: <SmartTourismStatisticsReport />,
  },
};

/**
 * 导出
 */
/** 大屏看板路由 */
export const DASHBOARD_ROUTE = {
  ...DASHBOARD_ROUTE_BASE,
  children: [
    DASHBOARD_ROUTE_CONFIGS[DashboardLevelType.DASHBOARD_WINDMILL],
    {
      ...DASHBOARD_ROUTE_CONFIGS[DashboardLevelType.DASHBOARD_WISDOM_TOURISM],
      children: Object.values(SMART_TOURISM_ROUTE_CONFIGS),
    },
  ],
};
