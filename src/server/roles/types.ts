/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-28 17:36:18
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-11-25 17:04:29
 * @ Description: 角色表的类型
 */

import { IBaseProps } from '../config/types';
import { IPermissionsProps } from '../permissions/types';

/** 角色表的类型 */
export interface IRolesProps extends Partial<IBaseProps> {
  roleCode: string;
  roleName: string;
  permissionCodes: number[];
  status: number;
  /** 角色的权限列表(在查询接口时会返回) */
  permissions?: IPermissionsProps[];
}

/** 枚举 - 角色编号 */
export enum RoleCodeEnum {
  /** 管理员 */
  Admin = 'admin',
  /** 普通成员 */
  User = 'user',
  /** 只读成员 */
  ReadonlyUser = 'readonly-user',
}
