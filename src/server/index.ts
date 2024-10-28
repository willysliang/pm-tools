/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-28 16:06:06
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-28 17:58:12
 * @ Description: 服务器 - indexedDB
 */

import { IndexedDBHelper } from '@/utils';
import { initData, initDBConfig } from './config/initData';

/**
 * permissions: 权限表
 * roles: 角色表
 */

/**
 * 初始化 indexedDB 数据
 */
const dbInit = new IndexedDBHelper(initDBConfig);
const dbInstance = await dbInit.initRequestHandler();
try {
  for (const item of initData) {
    const data = await dbInstance.getAll(item.name);
    if (data.length) continue;
    for (const dataItem of item.data) {
      await dbInstance.add(item.name, dataItem);
    }
  }
} catch (e) {
  console.error('初始化 indexedDB 数据失败', e);
}

/**
 * 获取 indexedDB 实例
 */
export const db = dbInstance;
