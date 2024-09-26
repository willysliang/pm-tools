/**
 * @ Author: willysliang
 * @ CreateTime: 2024-09-05 10:08:15
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-09-05 17:16:34
 * @ Description: Dialog 的类型声明
 */

/** 枚举 - 弹窗的位置 */
export enum DIALOG_POSITION_ENUM {
  'TOP_LEFT' = 'top-left',
  'TOP_CENTER' = 'top-center',
  'TOP_RIGHT' = 'top-right',
  'CENTER' = 'center',
  'BOTTOM_LEFT' = 'bottom-left',
  'BOTTOM_CENTER' = 'bottom-center',
  'BOTTOM_RIGHT' = 'bottom-right',
}

/** 常量 - 弹窗所在位置的 CSS 样式的 地图索引 */
export const POSITION_STYLE_MAP: Record<DIALOG_POSITION_ENUM, React.CSSProperties> = {
  [DIALOG_POSITION_ENUM.TOP_LEFT]: {
    inset: '0px auto auto 0px',
    transform: 'translate(0, 0)',
  },
  [DIALOG_POSITION_ENUM.TOP_CENTER]: {
    inset: '0px 0px auto 50%',
    transform: 'translate(-50%, 0)',
  },
  [DIALOG_POSITION_ENUM.TOP_RIGHT]: {
    inset: '0px 0px 0px auto',
    transform: 'translate(0, 0)',
  },
  [DIALOG_POSITION_ENUM.CENTER]: {
    inset: '50% auto auto 50%',
    transform: 'translate(-50%, -50%)',
  },
  [DIALOG_POSITION_ENUM.BOTTOM_LEFT]: {
    inset: 'auto auto 0px 0px',
    transform: 'translate(0, 0)',
  },
  [DIALOG_POSITION_ENUM.BOTTOM_CENTER]: {
    inset: 'auto auto 0px 50%',
    transform: 'translate(-50, 0)',
  },
  [DIALOG_POSITION_ENUM.BOTTOM_RIGHT]: {
    inset: 'auto 10px 10px auto',
    transform: 'translate(0, 0)',
  },
};

/** 类型 - 弹窗组件的属性 */
export interface IDialogProps {
  /** 弹窗的内容 */
  children?: React.ReactNode;

  /** 是否显示 */
  show: boolean;

  /** 弹窗位置 */
  position?: DIALOG_POSITION_ENUM;

  /** 是否占满屏幕显示 */
  isFull?: boolean;
  /** 显示遮罩层 */
  showMask?: boolean;
  /** 点击遮罩层关闭 */
  maskClosable?: boolean;

  /** 是否点击esc关闭 */
  escCloseable?: boolean;

  /**
   * 事件回调
   */
  /** 遮罩层点击 */
  onMask?: () => void;
  /** 关闭事件回调 */
  onClose?: () => void;
}
