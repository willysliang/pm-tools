/**
 * @ Author: willy
 * @ CreateTime: 2024-06-20 17:40:36
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-06-22 19:53:15
 * @ Description: 用户信息
 */

import { create } from 'zustand';
import avatar from '@assets/common/avactor.jpg';

interface IUserInfo {
  avatar: string;
  userId: string;
  username: string;
  description: string;
}

interface IUserStoreState {
  userInfo: IUserInfo;
}

/** App 的全局数据 */
export const useUserStore = create<IUserStoreState>(() => ({
  userInfo: {
    avatar: Math.random() > 0.5 ? avatar : '',
    userId: '2682337050',
    username: 'willy',
    description: 'willysliang的团队',
  },
}));
