/**
 * @ Author: willy
 * @ CreateTime: 2024-06-20 14:30:55
 * @ Modifier: willy
 * @ ModifierTime: 2024-06-20 18:32:52
 * @ Description: App 相关的常量
 */

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
import { Icon } from '@icon-park/react/lib/runtime';

/** APP的一级菜单枚举 */
export enum AppMenuLevelType {
  /** 仪表板 */
  DASHBOARD = 'DASHBOARD',
  /** 任务管理 */
  TASK_MANAGEMENT = 'TASK_MANAGEMENT',
  /** 时间管理 */
  TIME_MANAGEMENT = 'TIME_MANAGEMENT',
  /** 资源管理 */
  RESOURCE_MANAGEMENT = 'RESOURCE_MANAGEMENT',
  /** 文件管理 */
  FILE_MANAGEMENT = 'FILE_MANAGEMENT',
  /** 系统管理 */
  SYSTEM_MANAGEMENT = 'SYSTEM_MANAGEMENT',
  /** 人员权限管理 */
  PERSON_PERMISSION_MANAGEMENT = 'PERSON_PERMISSION_MANAGEMENT',
  /** 沟通协作 */
  COMMUNICATION_COLLABORATION = 'COMMUNICATION_COLLABORATION',
  /** 进程规划 */
  PROCESS_PLANNING = 'PROCESS_PLANNING',
  /** 报表分析 */
  REPORT_ANALYSIS = 'REPORT_ANALYSIS',
  /** 集成扩展 */
  INTEGRATION_AND_EXTENSION = 'INTEGRATION_AND_EXTENSION',
}

export interface IMenuConfigItem {
  label: string;
  path: string;
  icon: Icon;
  key: string;
  children: IMenuConfigItem[];
}

/** APP 的菜单列表  */
export const MENU_CONFIG: Record<AppMenuLevelType, IMenuConfigItem> = {
  [AppMenuLevelType.DASHBOARD]: {
    label: '仪表板',
    path: `/${AppMenuLevelType.DASHBOARD}`,
    icon: DashboardCar,
    key: 'dashboard',
    children: [],
  },
  [AppMenuLevelType.TASK_MANAGEMENT]: {
    label: '任务管理',
    path: `/${AppMenuLevelType.TASK_MANAGEMENT}`,
    icon: Tag,
    key: 'task',
    children: [],
  },
  [AppMenuLevelType.TIME_MANAGEMENT]: {
    label: '时间管理',
    path: `/${AppMenuLevelType.TIME_MANAGEMENT}`,
    icon: HourglassFull,
    key: 'time',
    children: [],
  },
  [AppMenuLevelType.RESOURCE_MANAGEMENT]: {
    label: '资源管理',
    path: `/${AppMenuLevelType.RESOURCE_MANAGEMENT}`,
    icon: Pigeon,
    key: 'resource',
    children: [],
  },
  [AppMenuLevelType.FILE_MANAGEMENT]: {
    label: '文件管理',
    path: `/${AppMenuLevelType.FILE_MANAGEMENT}`,
    icon: Sleaves,
    key: 'file',
    children: [],
  },
  [AppMenuLevelType.SYSTEM_MANAGEMENT]: {
    label: '系统管理',
    path: `/${AppMenuLevelType.SYSTEM_MANAGEMENT}`,
    icon: Bat,
    key: 'system',
    children: [],
  },
  [AppMenuLevelType.PERSON_PERMISSION_MANAGEMENT]: {
    label: '人员权限管理',
    path: `/${AppMenuLevelType.PERSON_PERMISSION_MANAGEMENT}`,
    icon: TwoEllipses,
    key: 'person',
    children: [],
  },
  [AppMenuLevelType.COMMUNICATION_COLLABORATION]: {
    label: '沟通协作',
    path: `/${AppMenuLevelType.COMMUNICATION_COLLABORATION}`,
    icon: DragonZodiac,
    key: 'communication',
    children: [],
  },
  [AppMenuLevelType.PROCESS_PLANNING]: {
    label: '进程规划',
    path: `/${AppMenuLevelType.PROCESS_PLANNING}`,
    icon: CalendarThree,
    key: 'process',
    children: [],
  },
  [AppMenuLevelType.REPORT_ANALYSIS]: {
    label: '报表分析',
    path: `/${AppMenuLevelType.REPORT_ANALYSIS}`,
    icon: Excel,
    key: 'report',
    children: [],
  },
  [AppMenuLevelType.INTEGRATION_AND_EXTENSION]: {
    label: '集成扩展',
    path: `/${AppMenuLevelType.INTEGRATION_AND_EXTENSION}`,
    icon: CircularConnection,
    key: 'integration',
    children: [],
  },
};
