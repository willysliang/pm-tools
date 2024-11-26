/**
 * @ Author: willysliang
 * @ CreateTime: 2024-11-26 10:20:13
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-11-26 11:39:10
 * @ Description: 权限选择器的数据获取
 */

import { useEffect, useState } from 'react';
import { BaseOptionType } from 'antd/es/select';
import { getAllPermission } from '@/server/permissions';

/** 权限选择器的数据获取 */
export const useSelectPermission = () => {
  const [permissionList, setPermissionList] = useState<BaseOptionType[]>([]);

  /** 获取权限表所有数据 */
  const getList = async () => {
    const { permissions } = await getAllPermission();
    const permissionsMap: Record<string, BaseOptionType[]> = {};

    // 转化为 Map 形式
    permissions.forEach(({ id, permissionType, permissionName, ...restProps }) => {
      if (!permissionsMap[permissionType]) permissionsMap[permissionType] = [];
      permissionsMap[permissionType].push({
        ...restProps,
        label: permissionName,
        value: id,
      });
    });

    const result: BaseOptionType[] = [];
    // 转化为 antd 所需要的数组形式
    for (const type in permissionsMap) {
      result.push({
        label: <span>{type}</span>,
        title: type,
        options: permissionsMap[type],
      });
    }

    setPermissionList(result);
  };

  useEffect(() => {
    getList();
  }, []);

  return {
    permissionList,
  };
};
