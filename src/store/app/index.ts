/**
 * @ Author: willy
 * @ CreateTime: 2024-06-20 14:28:22
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-09-06 11:46:13
 * @ Description: App 的全局数据
 */

import { create } from 'zustand';
import { APP_ROUTE_CONFIGS, type IRouteConfig } from '@/router/routes/appRoutes';

interface IAppStoreState {
  /**
   * 菜单相关
   */
  /** 菜单列表 */
  menuList: IRouteConfig[];
  /** 活跃的菜单 */
  activeMenu: IRouteConfig;
  /** 设置菜单 */
  setMenu: (menu: IRouteConfig) => void;

  /**
   * 全局弹窗
   */
  /** 提示弹窗 */
  dialogPromptConfig: {
    show: boolean;
    info?: {
      /** 标题 */
      title: string;
      /** 标签 */
      tags: Array<string>;
      /** 二级弹窗 */
      secondTitle: string;
      /** 描述（对数组进行拼接，使用数组是因为每一行都有一个 margin-bottom 样式） */
      descList: string[];
    };
  };
  /** 设置提示弹窗的配置信息 */
  setDialogPrompt: (
    show: IAppStoreState['dialogPromptConfig']['show'],
    info?: IAppStoreState['dialogPromptConfig']['info'],
  ) => void;
}

/** App 的全局数据 */
export const useAppStore = create<IAppStoreState>((set) => ({
  menuList: Object.values(APP_ROUTE_CONFIGS),
  activeMenu: Object.values(APP_ROUTE_CONFIGS)[0],

  setMenu: (menu: IRouteConfig) => {
    // document.title = menu.label;
    set({ activeMenu: menu });
  },

  dialogPromptConfig: {
    show: Math.random() > 0.5,
    info: {
      title: '新版本功能',
      tags: ['v5.129.0', 'New'],
      secondTitle: '新增需求跟踪矩阵',
      descList: [
        '主要更新内容：',
        '1. 新增需求跟踪矩阵<br/>2. 关联空间组件升级<br/>3. 产品细节优化',
      ],
    },
  },
  setDialogPrompt: (show, info) => {
    set({ dialogPromptConfig: { show, info } });
  },
}));
