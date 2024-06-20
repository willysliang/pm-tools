/**
 * @ Author: willy
 * @ CreateTime: 2024-06-20 17:40:36
 * @ Modifier: willy
 * @ ModifierTime: 2024-06-20 17:47:58
 * @ Description: 用户信息
 */

import { create } from 'zustand';
import avatar from '@assets/common/avactor.jpg';

interface IUserInfo {
  avatar: string;
  userId: string;
  username: string;
}

interface IUserStoreState {
  userInfo: IUserInfo;
}

/** App 的全局数据 */
export const useUserStore = create<IUserStoreState>(() => ({
  userInfo: {
    avatar,
    userId: '2682337050',
    username: 'willy',
  },
}));
