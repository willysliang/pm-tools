/**
 * @ Author: willysliang
 * @ CreateTime: 2024-06-23 11:02:59
 * @ Modifier: willy
 * @ ModifierTime: 2024-06-24 12:12:38
 * @ Description: 用户个人设置
 */

import { FC } from 'react';
import LayoutContainer from '@comp/layout/LayoutContainer';
import { IConfigList } from '@/components/layout/LayoutSidebar';
import { USER_ROUTE_CONFIGS } from '@/router/routes/userRoutes';

/** 侧边栏展示的列表 */
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
  return <LayoutContainer routeList={routeList}></LayoutContainer>;
};

export default Account;
