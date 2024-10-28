/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-28 16:06:17
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-28 17:48:12
 * @ Description: 类型声明
 */

/** 定义条件类型来判断属性是否可选 */
export type IsOptional<T, K extends keyof T> = T[K] extends undefined ? K : never;

/** 定义条件类型来判断属性是否必选 */
export type IsRequired<T, K extends keyof T> = T[K] extends undefined ? never : K;

export interface IBaseProps {
  // id: number;
  createTime: Date;
  creater: string;
  modifierTime: Date;
  modifier: string;
}

/** 枚举 - 仓库表名 */
export enum StoreNameEnum {
  Permissions = 'permissions',
  Roles = 'roles',
}
