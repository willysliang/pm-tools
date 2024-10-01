/**
 * @ Author: willysliang
 * @ CreateTime: 2024-09-29 17:21:19
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-09-30 11:25:57
 * @ Description: 大风车模块 store
 */

import { create } from 'zustand';
import { produce } from 'immer';
import { message } from 'antd';

const layoutModulesDefault = {
  MonitorActive: {
    key: 'MonitorActive',
    label: '活动监测',
    visible: true,
    updateTime: 1,
  },
  MonitorEnergy: {
    key: 'MonitorEnergy',
    label: '发电监测',
    visible: true,
    updateTime: 2,
  },
  MonitorEnv: {
    key: 'MonitorEnv',
    label: '环境监测',
    visible: true,
    updateTime: 3,
  },
  MonitorError: {
    key: 'MonitorError',
    label: '异常监测',
    visible: true,
    updateTime: 4,
  },
  MonitorStatistics: {
    key: 'MonitorStatistics',
    label: '参数监测',
    visible: true,
    updateTime: 5,
  },
  MonitorYawAngle: {
    key: 'MonitorYawAngle',
    label: '偏航角度监测',
    visible: true,
    updateTime: 6,
  },
};

/** 模块类型 */
type IModuleNameType = keyof typeof layoutModulesDefault;
/** 每个模块拥有的 Prop */
type IModuleValueType = {
  key: IModuleNameType;
  label: string;
  visible: boolean;
  updateTime: number;
};
type IModuleType = Record<IModuleNameType, IModuleValueType>;

interface IWindmillStore {
  /** 所有的模块 */
  layoutModules: IModuleType;

  /** 所有模块中可见的模块并按照更新时间排序, 返回的是模块的名称 */
  visibleModules: () => IModuleNameType[];

  /** 根据模块名称切换模块的可见性 */
  onToggleByModuleName: (moduleName: IModuleNameType) => void;
}

/** 大风车模块 store */
export const useWindmillStore = create<IWindmillStore>((set, get) => ({
  layoutModules: JSON.parse(JSON.stringify(layoutModulesDefault)),

  visibleModules: () =>
    Object.values(get().layoutModules)
      .filter((item) => item.visible)
      .sort((a, b) => b.updateTime - a.updateTime)
      .map((item) => item.key),

  onToggleByModuleName: (moduleName: IModuleNameType) => {
    const module = get().layoutModules[moduleName];
    const visible = !module?.visible;

    if (visible && get().visibleModules().length >= 6) {
      return message.warning('至多勾选六个模块');
    }
    set(
      produce((state) => {
        state.layoutModules[moduleName].visible = visible;
        state.layoutModules[moduleName].updateTime = new Date().getTime();
      }),
    );
    return undefined;
  },
}));
