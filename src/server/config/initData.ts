/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-28 16:08:14
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-29 17:54:58
 * @ Description: 初始化数据
 */

import { IIndexedDBConfig } from '@/utils/cache/indexedDB';
import { permissionsInitData, permissionsStore } from '../permissions/initData';
import { rolesInitData, rolesStore } from '../roles/initData';
import { IBaseProps, StoreNameEnum } from './types';

/** 基础数据的初始化 */
const initBaseData: Omit<IBaseProps, 'id'> = {
  createTime: new Date(),
  creater: 'admin',
  modifierTime: new Date(),
  modifier: 'admin',
};

/**
 * 初始化表的数据
 */
export const initData = [
  {
    name: StoreNameEnum.Permissions,
    data: permissionsInitData.map((item) => ({ ...initBaseData, ...item })),
  },
  {
    name: StoreNameEnum.Roles,
    data: rolesInitData.map((item, index) => ({ ...initBaseData, id: index + 1, ...item })),
  },
];

/**
 * 初始化 indexedDB 配置
 */
export const initDBConfig: IIndexedDBConfig = {
  dbName: 'pm-tools',
  version: 1,
  stores: [permissionsStore, rolesStore],
};
