/**
 * @ Author: willy
 * @ CreateTime: 2024-06-21 16:38:54
 * @ Modifier: willy
 * @ ModifierTime: 2024-06-21 18:59:03
 * @ Description: 路由总表
 */

import {
  APP_DEFAULT_ROUTE_CONFGS,
  APP_ROUTE_CONFIGS,
  APP_SYSTEM_ROUTE_CONFIGS,
  IRouteConfig,
} from './appRoutes';

export const routes: IRouteConfig[] = [
  APP_DEFAULT_ROUTE_CONFGS.DEFAULT,
  ...Object.values(APP_ROUTE_CONFIGS),
  ...Object.values(APP_SYSTEM_ROUTE_CONFIGS),
  APP_DEFAULT_ROUTE_CONFGS.UNKNOW,
];
