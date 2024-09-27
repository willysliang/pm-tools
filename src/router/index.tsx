/**
 * @ Author: willy
 * @ CreateTime: 2024-06-21 14:16:06
 * @ Modifier: willy
 * @ ModifierTime: 2024-06-21 17:46:44
 * @ Description: 路由处理
 */

import React, { Suspense } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { AppRouteLevelType, APP_SYSTEM_ROUTE_CONFIGS } from './routes/appRoutes';
import { IRouteConfig, IRouteElement } from './routes/types';
import { routes } from './routes/index.tsx';
import { USER_TOKEN } from '@/constants';
import { storage } from '@/utils';

const WHITE_LIST: string[] = [AppRouteLevelType.DASHBOARD];

/** 路由拦截 */
export const RouteBeforeEach: React.FC<{
  route: IRouteConfig;
  children?: React.ReactNode;
}> = ({ route, children }) => {
  // 更新页面标题
  if (route.label) document.title = route.label;

  const hasLogin = storage.get<string | null>(USER_TOKEN, null) !== null;
  const { pathname } = useLocation();

  if (hasLogin && WHITE_LIST.includes(pathname)) {
    return <Navigate to='/' replace />;
  }

  if (route?.meta?.needLogin && !hasLogin) {
    return <Navigate to={APP_SYSTEM_ROUTE_CONFIGS.LOGIN.path} replace />;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {route?.meta?.redirect && route.meta?.redirect !== pathname ? (
        <Navigate to={route.meta?.redirect} replace />
      ) : (
        children ?? <></>
      )}
    </Suspense>
  );
};

interface IRouteConfigExtended extends IRouteConfig {
  component?: IRouteElement;
  children?: IRouteConfigExtended[];
}

/** 路由列表数据转换 */
export const routeListTransform = (
  routes: IRouteConfig[],
  isChidren?: boolean,
): IRouteConfigExtended[] => {
  const routeList: IRouteConfigExtended[] = [];

  routes.forEach((item) => {
    const route = { ...item } as IRouteConfigExtended;
    if (route.element) {
      const Element = route.element as React.ComponentType<any>;
      <RouteBeforeEach route={route}>
        <Element />
        {isChidren && <Outlet />}
      </RouteBeforeEach>;
    }

    if (Array.isArray(route.children)) {
      route.children = routeListTransform(route.children, true);
    }

    routeList.push({
      ...route,
      element: route.component ?? route.element,
    });
  });

  return routeList;
};

export default routeListTransform(routes);
