/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-28 17:33:08
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-28 18:01:12
 * @ Description: 角色表初始化数据
 */

import { baseProps, StoreNameEnum } from '../config/types';
import { PermissionCodeEnum, SpacePermissionCodeEnum } from '../permissions/types';
import { IRolesProps, RoleCodeEnum } from './types';

/** 角色表值唯一的属性 */
const roleUniqueProps: (keyof IRolesProps)[] = ['roleCode', 'roleName'];
/** 角色表值不唯一的属性 */
const roleNotUniqueProps: (keyof IRolesProps)[] = ['permissionCodes'];

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
    permissionCodes: Object.values(PermissionCodeEnum),
  },
  {
    roleCode: RoleCodeEnum.User,
    roleName: '普通成员',
    permissionCodes: Object.values(SpacePermissionCodeEnum),
  },
  {
    roleCode: RoleCodeEnum.ReadonlyUser,
    roleName: '只读成员',
    permissionCodes: [],
  },
];
