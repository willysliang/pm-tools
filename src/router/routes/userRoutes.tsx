/**
 * @ Author: willysliang
 * @ CreateTime: 2024-06-22 20:24:21
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-06-23 01:16:39
 * @ Description: 用户路由
 */

import { Remind, SettingOne, User } from '@icon-park/react';
import { IRouteConfigMap } from './types';

/** 用户路由的类型枚举 */
export enum UserRouteType {
  /** 账号设置 */
  ACCOUNT_SETTING = 'ACCOUNT_SETTING',
  /** 通知设置 */
  NOTICE_SETTING = 'NOTICE_SETTING',
  /** 偏好设置 */
  PREFERENCE_SETTING = 'PREFERENCE_SETTING',
}

/** 用户路由集合 */
export const USER_ROUTE_CONFIGS: IRouteConfigMap<UserRouteType> = {
  [UserRouteType.ACCOUNT_SETTING]: {
    label: '账号设置',
    path: `/${UserRouteType.ACCOUNT_SETTING}`,
    icon: User,
    key: 'account',
    meta: {},
  },
  [UserRouteType.NOTICE_SETTING]: {
    label: '通知设置',
    path: `/${UserRouteType.NOTICE_SETTING}`,
    icon: Remind,
    key: 'login',
    meta: {},
  },
  [UserRouteType.PREFERENCE_SETTING]: {
    label: '偏好设置',
    path: `/${UserRouteType.PREFERENCE_SETTING}`,
    icon: SettingOne,
    key: 'preference',
    meta: {},
  },
};
