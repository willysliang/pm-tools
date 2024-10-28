/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-28 17:31:46
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-28 18:01:03
 * @ Description: 权限表初始化数据
 */

import { baseProps, StoreNameEnum } from '../config/types';
import { IPermissionsProps, PermissionCodeEnum } from './types';

/** 权限表值唯一的属性 */
const permissionUniqueProps: (keyof IPermissionsProps)[] = ['permissionCode', 'permissionName'];
/** 权限表值不唯一的属性 */
const permissionNotUniqueProps: (keyof IPermissionsProps)[] = ['permissionType'];

/** 权限表仓库定义 */
export const permissionsStore = {
  name: StoreNameEnum.Permissions,
  primaryKey: 'id',
  indexList: [
    ...baseProps.map((name) => ({
      name,
      unique: false,
    })),
    ...permissionUniqueProps.map((name) => ({
      name,
      unique: true,
    })),
    ...permissionNotUniqueProps.map((name) => ({
      name,
      unique: false,
    })),
  ],
};

/** 权限表初始化数据 */
export const permissionsInitData: IPermissionsProps[] = [
  {
    permissionCode: PermissionCodeEnum.BaseSet,
    permissionName: '基本设置',
    permissionType: '空间',
  },
  {
    permissionCode: PermissionCodeEnum.Roles,
    permissionName: '成员管理',
    permissionType: '空间',
  },
  {
    permissionCode: PermissionCodeEnum.Templates,
    permissionName: '模板管理',
    permissionType: '空间',
  },
  {
    permissionCode: PermissionCodeEnum.Tags,
    permissionName: '标签管理',
    permissionType: '空间',
  },
  {
    permissionCode: PermissionCodeEnum.PagePermissions,
    permissionName: '页面权限',
    permissionType: '空间',
  },
  {
    permissionCode: PermissionCodeEnum.Directories,
    permissionName: '目录管理',
    permissionType: '空间',
  },
  {
    permissionCode: PermissionCodeEnum.GroupNew,
    permissionName: '新建分组',
    permissionType: '页面',
  },
  {
    permissionCode: PermissionCodeEnum.GroupEdit,
    permissionName: '编辑分组',
    permissionType: '页面',
  },
  {
    permissionCode: PermissionCodeEnum.GroupDelete,
    permissionName: '删除分组',
    permissionType: '页面',
  },
  {
    permissionCode: PermissionCodeEnum.GroupCopy,
    permissionName: '复制分组',
    permissionType: '页面',
  },
  {
    permissionCode: PermissionCodeEnum.GroupExport,
    permissionName: '导出分组',
    permissionType: '页面',
  },
  {
    permissionCode: PermissionCodeEnum.AttachmentUpload,
    permissionName: '附件上传',
    permissionType: '页面',
  },
  {
    permissionCode: PermissionCodeEnum.AttachmentDownload,
    permissionName: '附件下载',
    permissionType: '页面',
  },
  {
    permissionCode: PermissionCodeEnum.AttachmentRename,
    permissionName: '附件重命名',
    permissionType: '页面',
  },
];
