/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-28 17:32:35
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-11-05 10:30:36
 * @ Description: 权限表的接口
 */

import { db } from '../index';
import { StatusEnum } from '@/constants/common';
import { StoreNameEnum } from '../config/types';
import { IPermissionsProps } from './types';

/**
 * @method getPermissions 获取权限表的数据
 * @param {string} searchValue 搜索过滤条件
 * @param {number} page 当前页
 * @param {number} size 当前页的数据量大小
 * @returns {Promise}
 */
export const getPermissions = async (
  searchValue: string,
  page: number,
  size: number,
): Promise<{
  code: number;
  permissions: IPermissionsProps[];
  total: number;
  msg: string;
  error?: unknown;
}> => {
  let permissions: IPermissionsProps[] = [];
  let total = 0;
  let code = 0;
  let msg = undefined;
  let error = undefined;

  try {
    // 获取所有权限数据
    const allPermissions = await db.getAll<IPermissionsProps>(StoreNameEnum.Permissions);

    // 过滤掉已删除的数据
    const notDeletePermissions = allPermissions.filter(
      ({ status }) => status !== StatusEnum.Deleted,
    );

    // 根据搜索条件过滤权限数据
    let searchPermissions = notDeletePermissions;
    if (searchValue !== '') {
      searchPermissions = notDeletePermissions.filter(
        ({ permissionCode, permissionName }) =>
          permissionCode.includes(searchValue) || permissionName.includes(searchValue),
      );
    }

    // 分页处理
    total = searchPermissions.length;
    permissions = searchPermissions.slice((page - 1) * size, page * size);
    msg = '获取权限数据成功';
  } catch (err) {
    code = 500;
    msg = '获取权限数据失败';
    error = err;
  }

  return {
    code,
    total,
    permissions,
    msg,
    error,
  };
};

/**
 * @method updatePermission 更新权限表某一行的数据
 * @param {unknown} data 更新权限表的数据
 * @param {number=} id 主键-权限id
 * @returns {Promise}
 */
export const updatePermission = async (
  data: IPermissionsProps,
  id?: Required<IPermissionsProps>['id'],
): Promise<{
  code: number;
  msg: string;
  error?: unknown;
}> => {
  try {
    await db.update(StoreNameEnum.Permissions, data, id);
    return {
      code: 0,
      msg: '更新权限成功',
    };
  } catch (err) {
    return {
      code: 500,
      msg: '更新权限错误',
      error: err,
    };
  }
};

/**
 * @method addPermission 添加权限表的数据
 *@param {IPermissionsProps} data 新增权限表的数据
 * @returns {Promise}
 */
export const addPermission = async (data: IPermissionsProps) => {
  try {
    await db.add(StoreNameEnum.Permissions, data);
    return {
      code: 0,
      msg: '添加权限成功',
    };
  } catch (err) {
    return {
      code: 500,
      msg: '添加权限错误',
      error: err,
    };
  }
};

/**
 * @method deletePermission 删除权限表的数据
 * @param {number} id 主键-权限id
 * @returns {Promise}
 */
export const deletePermission = async (
  data: IPermissionsProps,
  id?: Required<IPermissionsProps>['id'],
): Promise<{
  code: number;
  msg: string;
  error?: unknown;
}> => {
  try {
    // await db.delete(StoreNameEnum.Permissions, id!);
    await updatePermission({ ...data, status: StatusEnum.Deleted, id });
    return {
      code: 0,
      msg: '删除权限成功',
    };
  } catch (err) {
    return {
      code: 500,
      msg: '删除权限错误',
      error: err,
    };
  }
};
