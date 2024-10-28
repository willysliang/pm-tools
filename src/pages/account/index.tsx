/**
 * @ Author: willysliang
 * @ CreateTime: 2024-06-23 11:02:59
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-25 15:34:47
 * @ Description: 用户个人设置
 */

import { FC, memo } from 'react';
import LayoutContainer, { type IRouteListProps } from '@comp/layout/LayoutContainer';
import { USER_ROUTE_CONFIGS, UserRouteType } from '@/router/routes/userRoutes';

/** 侧边栏展示的列表 */
export const ROUTE_LIST: IRouteListProps = [
  {
    label: '访问',
    list: [
      USER_ROUTE_CONFIGS[UserRouteType.PERSONAL],
      USER_ROUTE_CONFIGS[UserRouteType.ACCOUNT_SETTING],
      USER_ROUTE_CONFIGS[UserRouteType.LOGIN_LOG],
    ],
  },
  {
    label: '通知',
    list: [USER_ROUTE_CONFIGS[UserRouteType.NOTICE_SETTING]],
  },
];

/**
 * @description 用户个人设置
 */
export const Account: FC = memo(() => {
  return <LayoutContainer routeList={ROUTE_LIST}></LayoutContainer>;
});

export default Account;
