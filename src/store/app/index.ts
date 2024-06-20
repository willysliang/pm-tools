/**
 * @ Author: willy
 * @ CreateTime: 2024-06-20 14:28:22
 * @ Modifier: willy
 * @ ModifierTime: 2024-06-20 17:19:50
 * @ Description: App 的全局数据
 */

import { MENU_CONFIG, type IMenuConfigItem } from '@/constants/app';
import { create } from 'zustand';

interface IAppStoreState {
  menuList: IMenuConfigItem[];
  activeMenu: IMenuConfigItem;

  setMenu: (menu: IMenuConfigItem) => void;
}

/** 初始化 store 的数据 */
const initAppStoreConfig = () => {
  const initConfig = {
    menuList: Object.values(MENU_CONFIG),
    activeMenu: Object.values(MENU_CONFIG)[0],
  };

  document.title = initConfig.activeMenu.label;

  return initConfig;
};

/** App 的全局数据 */
export const useAppStore = create<IAppStoreState>((set) => ({
  ...initAppStoreConfig(),

  setMenu: (menu: IMenuConfigItem) => {
    document.title = menu.label;
    set({ activeMenu: menu });
  },
}));
