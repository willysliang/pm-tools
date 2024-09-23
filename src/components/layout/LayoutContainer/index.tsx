/**
 * @ Author: willy
 * @ CreateTime: 2024-06-24 12:05:50
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-09-23 17:08:15
 * @ Description: 页面的主题（嵌套路由的容器实现）
 */

import { FC, useState } from 'react';
import { Outlet } from 'react-router-dom';
import LayoutSidebar, { IConfigList } from '@/components/layout/LayoutSidebar';
import { IRouteConfig } from '@/router/routes/types';
import { createBEM } from '@/utils';
import s from './LayoutContainer.module.scss';

const Account: FC<{ routeList: IConfigList }> = ({ routeList }) => {
  const namespace = 'layout-container';

  const [activeRoute, setActiveRoute] = useState<IRouteConfig>();

  return (
    <div className={s[createBEM(namespace)]}>
      <LayoutSidebar
        configList={routeList}
        onUpdateActiveRoute={(route) => setActiveRoute(route)}
      ></LayoutSidebar>
      <div className={s[createBEM(`${namespace}-main`)]}>
        <div className={s[createBEM(`${namespace}-main`, 'header')]}>{activeRoute?.label}</div>
        <div className={s[createBEM(`${namespace}-main`, 'content')]}>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Account;
