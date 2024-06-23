/**
 * @ Author: willysliang
 * @ CreateTime: 2024-06-23 11:02:59
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-06-24 00:24:53
 * @ Description: 用户个人设置
 */

import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import LayoutSidebar, { IConfigList } from '@/components/layout/sidebar';
import { createBEM } from '@/utils';
import s from './account.module.scss';
import { USER_ROUTE_CONFIGS } from '@/router/routes/userRoutes';

export const routeList: IConfigList = [
  {
    label: '访问',
    list: [
      USER_ROUTE_CONFIGS.PERSONAL,
      USER_ROUTE_CONFIGS.ACCOUNT_SETTING,
      USER_ROUTE_CONFIGS.LOGIN_LOG,
    ],
  },
  {
    label: '通知',
    list: [USER_ROUTE_CONFIGS.NOTICE_SETTING],
  },
];

const Account: FC = () => {
  const namespace = 'account';

  return (
    <div className={s[createBEM(namespace)]}>
      <LayoutSidebar configList={routeList}></LayoutSidebar>
      <div className={s[createBEM(namespace, 'main')]}>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Account;
