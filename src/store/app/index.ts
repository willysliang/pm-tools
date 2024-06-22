/**
 * @ Author: willy
 * @ CreateTime: 2024-06-20 14:28:22
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-06-22 15:37:10
 * @ Description: App 的全局数据
 */

import { create } from 'zustand';
import { APP_ROUTE_CONFIGS, type IRouteConfig } from '@/router/routes/appRoutes';

interface IAppStoreState {
  menuList: IRouteConfig[];
  activeMenu: IRouteConfig;

  setMenu: (menu: IRouteConfig) => void;
}

/** App 的全局数据 */
export const useAppStore = create<IAppStoreState>((set) => ({
  menuList: Object.values(APP_ROUTE_CONFIGS),
  activeMenu: Object.values(APP_ROUTE_CONFIGS)[0],

  setMenu: (menu: IRouteConfig) => {
    // document.title = menu.label;
    set({ activeMenu: menu });
  },
}));
