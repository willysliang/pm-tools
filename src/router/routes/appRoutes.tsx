/**
 * @ Author: willy
 * @ CreateTime: 2024-06-20 14:30:55
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-06-22 20:33:15
 * @ Description: App 路由
 */

import { lazy } from 'react';
import {
  Bat,
  CalendarThree,
  CircularConnection,
  DashboardCar,
  DragonZodiac,
  Excel,
  HourglassFull,
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

import NotFound from '@/pages/System/NotFound/index';

/** 将 type 中的所有声明同步导出 */
export * from './types';

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
  [AppRouteLevelType.PERSON_PERMISSION_MANAGEMENT]: {
    label: '人员权限管理',
    path: `/${AppRouteLevelType.PERSON_PERMISSION_MANAGEMENT}`,
    icon: TwoEllipses,
    key: 'person',
    meta: {},
    children: [],
  },
  [AppRouteLevelType.COMMUNICATION_COLLABORATION]: {
    label: '沟通协作',
    path: `/${AppRouteLevelType.COMMUNICATION_COLLABORATION}`,
    icon: DragonZodiac,
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
    meta: {},
    children: [],
  },
  [AppRouteLevelType.INTEGRATION_AND_EXTENSION]: {
    label: '集成扩展',
    path: `/${AppRouteLevelType.INTEGRATION_AND_EXTENSION}`,
    icon: CircularConnection,
    key: 'integration',
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
