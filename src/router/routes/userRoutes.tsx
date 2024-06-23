/**
 * @ Author: willysliang
 * @ CreateTime: 2024-06-22 20:24:21
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-06-23 12:32:37
 * @ Description: 用户路由
 */

import { lazy } from 'react';
import { Remind, SettingOne, User } from '@icon-park/react';
import { IRouteConfig, IRouteConfigMap } from './types';

const Account = lazy(() => import('@/pages/account/index'));
const AccountSetting = lazy(() => import('@/pages/account/setting'));

/** 用户路由的类型枚举 */
export enum UserRouteType {
  /** 账号设置 */
  ACCOUNT_SETTING = 'ACCOUNT_SETTING',
  /** 通知设置 */
  NOTICE_SETTING = 'NOTICE_SETTING',
  /** 偏好设置 */
  PREFERENCE_SETTING = 'PREFERENCE_SETTING',

  /** 个人资料 */
  PERSONAL = 'PERSONAL',
  /** 登录日志 */
  LOGIN_LOG = 'LOGIN_LOG',
}

/** 用户路由根 path */
export const USER_ROUTE_BASE: IRouteConfig = {
  label: '用户个人设置',
  path: `/account`,
  icon: User,
  key: 'account',
  element: <Account />,
  meta: {},
};

/** 用户路由集合 */
export const USER_ROUTE_CONFIGS: IRouteConfigMap<UserRouteType> = {
  [UserRouteType.ACCOUNT_SETTING]: {
    label: '账号设置',
    path: `${USER_ROUTE_BASE.path}/${UserRouteType.ACCOUNT_SETTING}`,
    icon: User,
    key: 'setting',
    element: <AccountSetting />,
    meta: {},
  },
  [UserRouteType.NOTICE_SETTING]: {
    label: '通知设置',
    path: `${USER_ROUTE_BASE.path}/${UserRouteType.NOTICE_SETTING}`,
    icon: Remind,
    key: 'notice',
    meta: {},
  },
  [UserRouteType.PREFERENCE_SETTING]: {
    label: '偏好设置',
    path: `${USER_ROUTE_BASE.path}/${UserRouteType.PREFERENCE_SETTING}`,
    icon: SettingOne,
    key: 'preference',
    meta: {},
  },
  [UserRouteType.PERSONAL]: {
    label: '个人资料',
    path: `${USER_ROUTE_BASE.path}/${UserRouteType.PERSONAL}`,
    icon: SettingOne,
    key: 'personal',
    meta: {},
  },
  [UserRouteType.LOGIN_LOG]: {
    label: '登录日志',
    path: `${USER_ROUTE_BASE.path}/${UserRouteType.LOGIN_LOG}`,
    icon: SettingOne,
    key: 'login-log',
    meta: {},
  },
};
