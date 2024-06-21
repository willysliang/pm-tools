/**
 * @ Author: willy
 * @ CreateTime: 2024-06-21 15:15:51
 * @ Modifier: willy
 * @ ModifierTime: 2024-06-21 18:58:13
 * @ Description: 路由相关的声明
 */

import React from 'react';
import { Icon } from '@icon-park/react/lib/runtime';

/** APP的系统级路由枚举  */
export enum AppSystemRouteType {
  /** 登录 */
  LOGIN = 'LOGIN',
  /** 404 */
  NOT_FOUND = 'NOT_FOUND',
}

/** APP的默认路由枚举 */
export enum AppDefaultRouteType {
  /** 默认 */
  DEFAULT = 'DEFAULT',
  /** 未知 */
  UNKNOW = 'UNKNOW',
}

/** APP的一级菜单枚举 */
export enum AppRouteLevelType {
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

/** 路由的页面内容 */
export type IRouteElement =
  | React.ReactNode
  | JSX.Element
  | React.LazyExoticComponent<React.ComponentType<any>>
  | React.ComponentType<any>;

export interface IRouteConfig {
  /** 标题 */
  label: string;
  /** 路由 */
  path: string;
  /** 图标 */
  icon: Icon;
  /** 唯一 key 值 */
  key: string;
  /** 节点信息 */
  element?: IRouteElement;
  meta?: {
    redirect?: string;
    /** 是否缓存路由  */
    KeepAlive?: boolean;
    /** 需要登陆 */
    needLogin?: boolean;
    /** 是否不需要懒加载 */
    unLazy?: boolean;
  };
  children?: IRouteConfig[];
}
