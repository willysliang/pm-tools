/**
 * @ Author: willysliang
 * @ CreateTime: 2024-09-30 11:43:33
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-01 09:30:11
 * @ Description: 单选框
 */

import { FC, memo } from 'react';
import { createBEM } from '@/utils';
import s from './index.module.scss';

interface IBaseCheckboxProps {
  /** 值 */
  value: boolean;
  /** 文案 */
  label: string;

  /** 切换 label 时触发 */
  onChange?: (value: boolean) => void;
}

/** 单选框 */
export const BaseCheckbox: FC<IBaseCheckboxProps> = memo(({ label, value, onChange }) => {
  const NAMESPACE = 'base-checkbox';

  const handleClick = () => {
    onChange && onChange(!value);
  };

  return (
    <div className={s[createBEM(NAMESPACE)]} onClick={handleClick}>
      <div className={s[createBEM(NAMESPACE, 'trigger')]}>
        <div
          className={createBEM(NAMESPACE, 'trigger', ['inner', value ? 'inner-active' : ''], s)}
        ></div>
      </div>
      <div className={s[createBEM(NAMESPACE, 'label')]}>{label}</div>
    </div>
  );
});

export default BaseCheckbox;
