/**
 * @ Author: willy
 * @ CreateTime: 2024-06-21 16:38:54
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-14 23:15:24
 * @ Description: 路由总表
 */

import {
  APP_DEFAULT_ROUTE_CONFGS,
  APP_ROUTE_CONFIGS,
  APP_SYSTEM_ROUTE_CONFIGS,
  IRouteConfig,
} from './appRoutes';
import { DASHBOARD_ROUTE } from './dashboardRoutes';
import { USER_ROUTE_BASE, USER_ROUTE_CONFIGS } from './userRoutes';

export const routes: IRouteConfig[] = [
  APP_DEFAULT_ROUTE_CONFGS.DEFAULT,

  /** 系统 */
  ...Object.values(APP_ROUTE_CONFIGS),
  ...Object.values(APP_SYSTEM_ROUTE_CONFIGS),

  /** 大屏看板 */
  DASHBOARD_ROUTE,

  /** 用户 */
  {
    ...USER_ROUTE_BASE,
    children: Object.values(USER_ROUTE_CONFIGS),
  },

  APP_DEFAULT_ROUTE_CONFGS.UNKNOW,
];
