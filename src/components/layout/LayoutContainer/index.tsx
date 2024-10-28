/**
 * @ Author: willy
 * @ CreateTime: 2024-06-24 12:05:50
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-25 14:40:00
 * @ Description: 页面的主体（嵌套路由的容器实现）
 */

import { FC, useState } from 'react';
import { Outlet } from 'react-router-dom';
import LayoutSidebar, { type IConfigProps } from '@comp/layout/LayoutSidebar';
import { IRouteConfig } from '@/router/routes/types';
import { createBEM } from '@/utils';
import s from './LayoutContainer.module.scss';

/** 路由配置列表的字段约束 */
export type IRouteListProps = IConfigProps[];

/**
 * @description 页面的主体（嵌套路由的容器实现）
 */
const LayoutContainer: FC<{ routeList: IRouteListProps }> = ({ routeList }) => {
  const NAMESPACE = 'layout-container';

  const [activeRoute, setActiveRoute] = useState<IRouteConfig>();

  return (
    <div className={s[createBEM(NAMESPACE)]}>
      <LayoutSidebar
        configList={routeList}
        onUpdateActiveRoute={(route) => setActiveRoute(route)}
      />
      <div className={s[createBEM(`${NAMESPACE}-main`)]}>
        <div className={s[createBEM(`${NAMESPACE}-main`, 'header')]}>{activeRoute?.label}</div>
        <div className={s[createBEM(`${NAMESPACE}-main`, 'content')]}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LayoutContainer;
