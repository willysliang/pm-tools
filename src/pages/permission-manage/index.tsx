/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-25 16:53:21
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-28 10:04:44
 * @ Description: 权限管理
 */

import { FC, memo } from 'react';
import LayoutContainer, { type IRouteListProps } from '@comp/layout/LayoutContainer';
import { PERMISSION_ROUTE_CONFIGS, PermissionRouteEnum } from '@/router/routes/permissionRoutes';

const ROUTE_LIST: IRouteListProps = [
  {
    label: '权限管理',
    list: [
      PERMISSION_ROUTE_CONFIGS[PermissionRouteEnum.USER_PERMISSION],
      PERMISSION_ROUTE_CONFIGS[PermissionRouteEnum.ROLE_PERMISSION],
      PERMISSION_ROUTE_CONFIGS[PermissionRouteEnum.MENU_PERMISSION],
    ],
  },
];

/**
 * @description 权限管理
 */
export const PermissionManage: FC = memo(() => {
  return <LayoutContainer routeList={ROUTE_LIST}></LayoutContainer>;
});

export default PermissionManage;
