/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-28 17:32:35
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-30 16:30:09
 * @ Description: 权限表的接口
 */

import { db } from '../index';
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
  error?: unknown;
}> => {
  let permissions: IPermissionsProps[] = [];
  let total = 0;
  let error = undefined;
  let code = 0;

  try {
    // 获取所有权限数据
    const allPermissions = await db.getAll<IPermissionsProps>(StoreNameEnum.Permissions);

    // 根据搜索条件过滤权限数据
    let searchPermissions = allPermissions;
    if (searchValue !== '') {
      searchPermissions = allPermissions.filter(
        ({ permissionCode, permissionName }) =>
          permissionCode.includes(searchValue) || permissionName.includes(searchValue),
      );
    }

    // 分页处理
    total = searchPermissions.length;
    permissions = searchPermissions.slice((page - 1) * size, page * size);
  } catch (err) {
    code = 500;
    error = err;
  }

  return {
    code,
    total,
    permissions,
    error,
  };
};
