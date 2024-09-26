/**
 * @ Author: willysliang
 * @ CreateTime: 2024-09-05 09:41:24
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-09-06 08:48:32
 * @ Description: 弹窗
 */

import { FC, useEffect } from 'react';
import { createBEM } from '@/utils';
import { CreateModal } from '@/hooks';
import { DIALOG_POSITION_ENUM, POSITION_STYLE_MAP, type IDialogProps } from './types';
import cx from 'classnames';
import './index.scss';

/** 暴露 type 文件 */
export * from './types';

/** 通用组件 - Dialog 弹窗 */
export const Dialog: FC<IDialogProps> = ({
  children = <></>,
  show,
  position = DIALOG_POSITION_ENUM.BOTTOM_CENTER,

  isFull = true,
  showMask,
  maskClosable = true,
  escCloseable = false,

  onMask,
  onClose,
}) => {
  const namespace = 'dialog';

  /** 关闭弹窗 */
  const handleCloseDialog = () => onClose && onClose();

  /** 遮罩层点击 */
  const handleClickMask = () => {
    onMask && onMask();
    if (isFull && maskClosable) handleCloseDialog();
  };

  /**
   * 按 ESC 键关闭弹窗
   */
  const handleESCkeyDown = (event: KeyboardEvent): void => {
    if (['Esc', 'Escape'].includes(event.key)) handleCloseDialog();
  };
  useEffect(() => {
    if (escCloseable) {
      window.addEventListener('keydown', handleESCkeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleESCkeyDown);
    };
  });

  return (
    show && (
      <CreateModal show={true}>
        <div className={cx(createBEM(namespace), createBEM(namespace, '', isFull ? 'full' : ''))}>
          {/* 背景遮罩层 */}
          {isFull && showMask && (
            <div className={createBEM(namespace, 'mask')} onClick={handleClickMask}></div>
          )}

          {/* 弹窗内容 */}
          <div className={createBEM(namespace, 'container')} style={POSITION_STYLE_MAP[position]}>
            {children}
          </div>
        </div>
      </CreateModal>
    )
  );
};

export default Dialog;
