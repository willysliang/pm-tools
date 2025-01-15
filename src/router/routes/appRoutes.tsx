/**
 * @ Author: willy
 * @ CreateTime: 2024-06-20 14:30:55
 * @ Modifier: willysliang
 * @ ModifierTime: 2025-01-15 17:18:05
 * @ Description: App 路由
 */

import { lazy } from 'react';
import {
  Bat,
  Bug,
  CalendarThree,
  CircularConnection,
  DashboardCar,
  Excel,
  HourglassFull,
  Permissions,
  Pigeon,
  Sleaves,
  Tag,
  TwoEllipses,
} from '@icon-park/react';
import {
  AppDefaultRouteType,
  AppSystemRouteType,
  AppRouteLevelType,
  IRouteConfigMap,
} from './types';

/**
 * 不缓存的页面
 */
import NotFound from '@/pages/System/NotFound/index';
import { PERMISSION_ROUTE_CONFIGS } from './permissionRoutes';
import { REPORT_ANALYSIS_ROUTE_CONFIGS } from './reportAnalysisRoutes';

/** 将 type 中的所有声明同步导出 */
export * from './types';

/**
 * 路由配置项相关
 */
/** APP 系统路由 */
export const APP_SYSTEM_ROUTE_CONFIGS: IRouteConfigMap<AppSystemRouteType> = {
  [AppSystemRouteType.LOGIN]: {
    label: '登录',
    path: `/${AppSystemRouteType.LOGIN}`,
    icon: DashboardCar,
    key: 'login',
    meta: {},
  },
  [AppSystemRouteType.NOT_FOUND]: {
    label: '404',
    path: `/${AppSystemRouteType.NOT_FOUND}`,
    icon: DashboardCar,
    key: '404',
    element: <NotFound />,
    meta: {},
  },
};

const Dashboard = lazy(() => import('@/pages/Dashboard'));
const WorkingHours = lazy(() => import('@/pages/working-hours'));
const Permission = lazy(() => import('@/pages/permission-manage'));
const ReportAnalysis = lazy(() => import('@/pages/report-analysis'));
const DemoTest = lazy(() => import('@/pages/Test'));

/** APP 菜单路由  */
export const APP_ROUTE_CONFIGS: IRouteConfigMap<AppRouteLevelType> = {
  [AppRouteLevelType.DASHBOARD]: {
    label: '仪表板',
    path: `/${AppRouteLevelType.DASHBOARD}`,
    icon: DashboardCar,
    key: 'dashboard',
    element: <Dashboard />,
    meta: {},
    children: [],
  },
  [AppRouteLevelType.TASK_MANAGEMENT]: {
    label: '任务管理',
    path: `/${AppRouteLevelType.TASK_MANAGEMENT}`,
    icon: Tag,
    key: 'task',
    meta: {},
    children: [],
  },
  [AppRouteLevelType.TIME_MANAGEMENT]: {
    label: '时间管理',
    path: `/${AppRouteLevelType.TIME_MANAGEMENT}`,
    icon: HourglassFull,
    key: 'time',
    element: <WorkingHours />,
    meta: {},
    children: [],
  },
  [AppRouteLevelType.RESOURCE_MANAGEMENT]: {
    label: '资源管理',
    path: `/${AppRouteLevelType.RESOURCE_MANAGEMENT}`,
    icon: Pigeon,
    key: 'resource',
    meta: {},
    children: [],
  },
  [AppRouteLevelType.FILE_MANAGEMENT]: {
    label: '文件管理',
    path: `/${AppRouteLevelType.FILE_MANAGEMENT}`,
    icon: Sleaves,
    key: 'file',
    meta: {},
    children: [],
  },
  [AppRouteLevelType.SYSTEM_MANAGEMENT]: {
    label: '系统管理',
    path: `/${AppRouteLevelType.SYSTEM_MANAGEMENT}`,
    icon: Bat,
    key: 'system',
    meta: {},
    children: [],
  },
  [AppRouteLevelType.PERMISSION_MANAGEMENT]: {
    label: '权限管理',
    path: `/${AppRouteLevelType.PERMISSION_MANAGEMENT}`,
    icon: Permissions,
    key: 'permission',
    element: <Permission />,
    meta: {},
    children: Object.values(PERMISSION_ROUTE_CONFIGS),
  },
  [AppRouteLevelType.COMMUNICATION_COLLABORATION]: {
    label: '沟通协作',
    path: `/${AppRouteLevelType.COMMUNICATION_COLLABORATION}`,
    icon: TwoEllipses,
    key: 'communication',
    meta: {},
    children: [],
  },
  [AppRouteLevelType.PROCESS_PLANNING]: {
    label: '进程规划',
    path: `/${AppRouteLevelType.PROCESS_PLANNING}`,
    icon: CalendarThree,
    key: 'process',
    meta: {},
    children: [],
  },
  [AppRouteLevelType.REPORT_ANALYSIS]: {
    label: '报表分析',
    path: `/${AppRouteLevelType.REPORT_ANALYSIS}`,
    icon: Excel,
    key: 'report',
    element: <ReportAnalysis />,
    meta: {},
    children: Object.values(REPORT_ANALYSIS_ROUTE_CONFIGS),
  },
  [AppRouteLevelType.INTEGRATION_AND_EXTENSION]: {
    label: '集成扩展',
    path: `/${AppRouteLevelType.INTEGRATION_AND_EXTENSION}`,
    icon: CircularConnection,
    key: 'integration',
    meta: {},
    children: [],
  },
  [AppRouteLevelType.DEMO_TEST]: {
    label: '示例测试',
    path: `/${AppRouteLevelType.DEMO_TEST}`,
    icon: Bug,
    key: 'bug',
    element: <DemoTest />,
    meta: {},
    children: [],
  },
};

/** APP 默认路由 */
export const APP_DEFAULT_ROUTE_CONFGS: IRouteConfigMap<AppDefaultRouteType> = {
  [AppDefaultRouteType.DEFAULT]: {
    ...APP_ROUTE_CONFIGS.DASHBOARD,
    path: '/',
  },
  [AppDefaultRouteType.UNKNOW]: {
    ...APP_SYSTEM_ROUTE_CONFIGS.NOT_FOUND,
    path: '*',
  },
};
