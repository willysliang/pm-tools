/**
 * @ Author: willy
 * @ CreateTime: 2024-06-20 17:40:36
 * @ Modifier: willy
 * @ ModifierTime: 2024-06-24 20:56:30
 * @ Description: 用户信息
 */

import { create } from 'zustand';
import avatar from '@assets/common/avactor.jpg';

export interface IUserInfo {
  userId: string;
  password: string | number;
  username: string;
  avatar: string;
  email: string;
  phone: number | string;
  description: string;
}

interface IUserStoreState {
  userInfo: IUserInfo;

  setUserInfo: (newUserInfo: Partial<IUserInfo>) => void;
}

/** App 的全局数据 */
export const useUserStore = create<IUserStoreState>((set) => ({
  userInfo: {
    password: 123456,
    userId: '2682337050',
    avatar: Math.random() > 0.5 ? avatar : '',
    username: 'willy',
    email: 'willysliang@qq.com',
    phone: '12345678901',
    description: 'willysliang的团队',
  },

  /** 更新用户信息 */
  setUserInfo: (newUserInfo: Partial<IUserInfo>) => {
    set((state) => ({
      userInfo: {
        ...state.userInfo,
        ...newUserInfo,
      },
    }));
  },
}));
