/**
 * @ Author: willy
 * @ CreateTime: 2024-06-20 14:28:22
 * @ Modifier: willy
 * @ ModifierTime: 2024-06-21 15:17:22
 * @ Description: App 的全局数据
 */

import { create } from 'zustand';
import { APP_ROUTE_CONFIGS, type IRouteConfig } from '@/router/routes/appRoutes';

interface IAppStoreState {
  menuList: IRouteConfig[];
  activeMenu: IRouteConfig;

  setMenu: (menu: IRouteConfig) => void;
}

/** 初始化 store 的数据 */
const initAppStoreConfig = () => {
  const initConfig = {
    menuList: Object.values(APP_ROUTE_CONFIGS),
    activeMenu: Object.values(APP_ROUTE_CONFIGS)[0],
  };

  document.title = initConfig.activeMenu.label;

  return initConfig;
};

/** App 的全局数据 */
export const useAppStore = create<IAppStoreState>((set) => ({
  ...initAppStoreConfig(),

  setMenu: (menu: IRouteConfig) => {
    document.title = menu.label;
    set({ activeMenu: menu });
  },
}));
