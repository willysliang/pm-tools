/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-28 17:33:53
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-11-26 09:33:06
 * @ Description: 角色表接口
 */

import { db } from '../index';
import { StatusEnum } from '@/constants/common';
import { StoreNameEnum } from '../config/types';
import { IPermissionsProps } from '../permissions/types';
import { IRolesProps } from './types';

/**
 * @method getRoles 获取角色表的数据
 * @param {string} searchValue 搜索过滤条件
 * @param {number} page 当前页
 * @param {number} size 当前页的数据量大小
 * @returns {Promise}
 */
export const getRoles = async (
  searchValue: string,
  page: number,
  size: number,
): Promise<{
  code: number;
  roles: IRolesProps[];
  total: number;
  msg: string;
  error?: unknown;
}> => {
  let roles: IRolesProps[] = [];
  let total = 0;
  let code = 0;
  let msg = undefined;
  let error = undefined;

  try {
    // 获取所有权限数据，并转化为 hash 形式存储
    const allPermissions = await db.getAll<IPermissionsProps>(StoreNameEnum.Permissions);
    const allPermissionsMap: Record<string, IPermissionsProps> = {};
    allPermissions.forEach((permission) => {
      allPermissionsMap[permission.permissionCode] = permission;
    });

    // 获取所有角色数据
    const allRoles = await db.getAll<IRolesProps>(StoreNameEnum.Roles);

    // 过滤掉已删除的数据，并把相关联的权限数据整合一起
    const notDeleteRoles: IRolesProps[] = allRoles.reduce((prev, curr) => {
      if (curr.status !== StatusEnum.Deleted) {
        const item = { ...curr };
        item.permissions = curr.permissionCodes.map(
          (permissionCode) => allPermissionsMap[permissionCode],
        );
        prev.push(item);
      }
      return prev;
    }, [] as IRolesProps[]);

    // 根据搜索条件过滤权限数据
    let searchRoles = notDeleteRoles;
    if (searchValue !== '') {
      searchRoles = notDeleteRoles.filter(
        ({ roleCode, roleName }) =>
          roleCode.includes(searchValue) || roleName.includes(searchValue),
      );
    }

    // 分页处理
    total = searchRoles.length;
    roles = searchRoles.slice((page - 1) * size, page * size);
    msg = '获取角色数据成功';
  } catch (err) {
    code = 500;
    msg = '获取角色数据失败';
    error = err;
  }

  return {
    code,
    total,
    roles,
    msg,
    error,
  };
};

/**
 * @method updateRole 更新角色表某一行的数据
 * @param {unknown} data 更新角色表的数据
 * @param {number=} id 主键-角色id
 * @returns {Promise}
 */
export const updateRole = async (
  data: IRolesProps,
  id?: Required<IRolesProps>['id'],
): Promise<{
  code: number;
  msg: string;
  error?: unknown;
}> => {
  try {
    await db.update(StoreNameEnum.Roles, data, id);
    return {
      code: 0,
      msg: '更新角色成功',
    };
  } catch (err) {
    return {
      code: 500,
      msg: '更新角色错误',
      error: err,
    };
  }
};

/**
 * @method addRole 添加角色表的数据
 *@param {IRolesProps} data 新增角色表的数据
 * @returns {Promise}
 */
export const addRole = async (data: IRolesProps) => {
  try {
    await db.add(StoreNameEnum.Roles, data);
    return {
      code: 0,
      msg: '添加角色成功',
    };
  } catch (err) {
    return {
      code: 500,
      msg: '添加角色错误',
      error: err,
    };
  }
};

/**
 * @method deleteRole 删除角色表的数据
 * @param {number} id 主键-角色id
 * @returns {Promise}
 */
export const deleteRole = async (
  data: IRolesProps,
  id?: Required<IRolesProps>['id'],
): Promise<{
  code: number;
  msg: string;
  error?: unknown;
}> => {
  try {
    await updateRole({ ...data, status: StatusEnum.Deleted, id });
    return {
      code: 0,
      msg: '删除角色成功',
    };
  } catch (err) {
    return {
      code: 500,
      msg: '删除角色错误',
      error: err,
    };
  }
};
