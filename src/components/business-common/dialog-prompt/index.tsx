/**
 * @ Author: willysliang
 * @ CreateTime: 2024-09-05 15:44:06
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-09-06 11:25:27
 * @ Description: 业务通用组件 - 提示弹窗
 */

import { FC } from 'react';
import Dialog, { DIALOG_POSITION_ENUM, IDialogProps } from '@comp/dialog';
import { useAppStore } from '@/store/app/index';
import { createBEM } from '@/utils';
import s from './index.module.scss';

/** 业务通用组件 - 提示弹窗 */
export const DialogPrompt: FC = () => {
  /** 提示弹窗的命名空间 */
  const namespace = 'dialog-prompt';

  const { dialogPromptConfig, setDialogPrompt } = useAppStore();
  const show = dialogPromptConfig.show;
  const handleClose = () => setDialogPrompt(false);

  const defaultInfo = {
    title: '新版本功能',
    tags: ['v5.129.0', 'New'],
    secondTitle: '新增需求跟踪矩阵',
    descList: ['主要更新内容：', '1. 新增需求跟踪矩阵<br/>2. 关联空间组件升级<br/>3. 产品细节优化'],
  };
  const info = Object.assign({}, defaultInfo, dialogPromptConfig.info);

  /** 弹窗的配置项 */
  const dialogOption: Omit<IDialogProps, 'show'> = {
    position: DIALOG_POSITION_ENUM.BOTTOM_RIGHT,
    isFull: false,
    showMask: true,
    escCloseable: false,
    onClose: handleClose,
    onMask: handleClose,
  };

  return (
    <>
      {show && (
        <Dialog show={show} {...dialogOption}>
          <div className={s[createBEM(namespace)]}>
            <div className={s[createBEM(namespace, 'close')]} onClick={handleClose}>
              x
            </div>
            <div className={s[createBEM(namespace, 'title')]}>
              <span>{info.title}</span>
            </div>
            <div className={s[createBEM(namespace, 'tags')]}>
              {info.tags.map((tag, idx) => (
                <span key={idx}>{tag}</span>
              ))}
            </div>
            <div className={s[createBEM(namespace, 'second-title')]} title={info.secondTitle}>
              {info.secondTitle}
            </div>
            {info.descList.map((desc, idx) => (
              <div
                key={idx}
                className={s[createBEM(namespace, 'desc')]}
                dangerouslySetInnerHTML={{ __html: desc }}
              ></div>
            ))}
            <div className={s[createBEM(namespace, 'more-btn')]}>查看更多</div>
          </div>
        </Dialog>
      )}
    </>
  );
};

export default DialogPrompt;
