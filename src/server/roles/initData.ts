/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-28 17:33:08
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-29 17:57:16
 * @ Description: 角色表初始化数据
 */

import { baseProps, StoreNameEnum } from '../config/types';
import { IRolesProps, RoleCodeEnum } from './types';

/** 角色表值唯一的属性 */
const roleUniqueProps: (keyof IRolesProps)[] = ['roleCode', 'roleName'];
/** 角色表值不唯一的属性 */
const roleNotUniqueProps: (keyof IRolesProps)[] = ['status', 'permissionCodes'];

/** 角色表仓库定义 */
export const rolesStore = {
  name: StoreNameEnum.Roles,
  primaryKey: 'id',
  indexList: [
    ...baseProps.map((name) => ({
      name,
      unique: false,
    })),
    ...roleUniqueProps.map((name) => ({
      name,
      unique: true,
    })),
    ...roleNotUniqueProps.map((name) => ({
      name,
      unique: false,
    })),
  ],
};

/** 角色表初始化数据 */
export const rolesInitData: IRolesProps[] = [
  {
    roleCode: RoleCodeEnum.Admin,
    roleName: '管理员',
    permissionCodes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    status: 1,
  },
  {
    roleCode: RoleCodeEnum.User,
    roleName: '普通成员',
    permissionCodes: [1, 2, 3, 4, 5, 6, 7, 8],
    status: 1,
  },
  {
    roleCode: RoleCodeEnum.ReadonlyUser,
    roleName: '只读成员',
    permissionCodes: [],
    status: 1,
  },
];
