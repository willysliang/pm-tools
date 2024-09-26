/**
 * @ Author: willysliang
 * @ CreateTime: 2024-09-05 15:44:06
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-09-06 11:36:47
 * @ Description: 弹窗的使用示例
 */

import { FC, useState } from 'react';
import Dialog, { DIALOG_POSITION_ENUM, IDialogProps } from '@/components/common/dialog';

/** 示例组件 - 弹窗示例 */
export const DialogDemo: FC = () => {
  /** 弹窗的显隐 */
  const [show, setShow] = useState<IDialogProps['show']>(false);

  /** 弹窗的配置项 */
  const dialogOption: Omit<IDialogProps, 'show'> = {
    position: DIALOG_POSITION_ENUM.CENTER,
    isFull: true,
    showMask: true,
    escCloseable: true,
    onClose: () => setShow(false),
    onMask: () => setShow(false),
  };

  return (
    <div>
      <div onClick={() => setShow(true)}>展示弹窗</div>
      {show && (
        <Dialog show={show} {...dialogOption}>
          <div>弹窗内显示的内容</div>
        </Dialog>
      )}
    </div>
  );
};

export default DialogDemo;
