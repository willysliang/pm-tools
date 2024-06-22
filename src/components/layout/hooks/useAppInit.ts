/**
 * @ Author: willysliang
 * @ CreateTime: 2024-06-22 15:04:32
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-06-23 01:34:51
 * @ Description: 页面初始化时候调用
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppStore } from '@/store/app/index';
import { routes } from '@/router/routes';
import type { IRouteConfig } from '@/router/routes/types';
import { APP_DEFAULT_ROUTE_CONFGS } from '@/router/routes/appRoutes';

export const useMenuInit = () => {
  /** 递归查找当前活跃的路由 */
  const deepFindRoute = (routeList: IRouteConfig[], path: string): IRouteConfig | null => {
    for (let i = 0; i < routeList.length; i++) {
      const currentRoute = routeList[i];
      if (currentRoute.path === path) return currentRoute;
      if (Array.isArray(currentRoute.children) && currentRoute.children.length) {
        const findRouteInChild = deepFindRoute(currentRoute.children, path);
        if (findRouteInChild instanceof Object) return findRouteInChild;
      }
    }
    return null;
  };

  const location = useLocation();
  const { setMenu } = useAppStore();

  /**
   * 1. 查找页面的路由，如果存在，则更新页面的标题
   * 2. 查找菜单的路由，如果存在，则更新选择的菜单项(已忽略)
   *
   */
  useEffect(() => {
    let findRoute = deepFindRoute(routes, location.pathname);
    if (findRoute === null) findRoute = APP_DEFAULT_ROUTE_CONFGS.UNKNOW;
    document.title = findRoute.label;
    setMenu(findRoute);
  }, [location]);
};

export const useAppInit = () => {};
