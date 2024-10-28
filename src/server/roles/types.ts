/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-28 17:36:18
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-28 17:54:37
 * @ Description: 角色表的类型
 */

import { IBaseProps } from '../config/types';

export interface IRolesProps extends Partial<IBaseProps> {
  roleCode: string;
  roleName: string;
  permissionCodes: string[];
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
