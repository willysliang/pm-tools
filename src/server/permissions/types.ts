/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-28 17:36:18
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-29 18:31:51
 * @ Description: 权限表的类型
 */

import { IBaseProps } from '../config/types';

/** 权限表的类型 */
export interface IPermissionsProps extends Partial<IBaseProps> {
  permissionCode: string;
  permissionName: string;
  permissionType: string;
  status: number;
}

/** 枚举 - 空间权限编号 */
export enum SpacePermissionCodeEnum {
  /** 基本设置 */
  BaseSet = 'base-set',
  /** 成员管理 */
  Roles = 'roles',
  /** 模板管理 */
  Templates = 'templates',
  /** 标签管理 */
  Tags = 'tags',
  /** 页面权限 */
  PagePermissions = 'page-permissions',
  /** 目录管理 */
  Directories = 'directories',
}

/** 枚举 - 页面权限编号 */
export enum PagePermissionCodeEnum {
  /** 新建分组 */
  GroupNew = 'new-group',
  /** 编辑分组 */
  GroupEdit = 'edit-group',
  /** 删除分组 */
  GroupDelete = 'delete-group',
  /** 复制分组 */
  GroupCopy = 'copy-group',
  /** 导出分组 */
  GroupExport = 'export-group',
  /** 附件上传 */
  AttachmentUpload = 'upload-attachment',
  /** 附件下载 */
  AttachmentDownload = 'download-attachment',
  /** 附件重命名 */
  AttachmentRename = 'rename-attachment',
}

/** 枚举 - 所有的权限编号 */
export const PermissionCodeEnum = {
  ...SpacePermissionCodeEnum,
  ...PagePermissionCodeEnum,
};
