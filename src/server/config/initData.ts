/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-28 16:08:14
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-28 17:50:39
 * @ Description: 初始化数据
 */

import { IIndexedDBConfig } from '@/utils/cache/indexedDB';
import { permissionsInitData, permissionsStore } from '../permissions/initData';
import { rolesInitData, rolesStore } from '../roles/initData';
import { IBaseProps, StoreNameEnum } from './types';

/**
 * 表拥有的属性字段
 */
/** 表的基础属性 */
export const baseProps: (keyof IBaseProps)[] = [
  'createTime',
  'creater',
  'modifierTime',
  'modifier',
];

/** 基础数据的初始化 */
const initBaseData: IBaseProps = {
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
    data: rolesInitData.map((item) => ({ ...initBaseData, ...item })),
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
