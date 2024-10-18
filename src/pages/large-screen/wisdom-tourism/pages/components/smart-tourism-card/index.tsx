/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-15 10:13:21
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-16 14:49:02
 * @ Description: 面板 - 卡片
 */

import { FC, HTMLAttributes, memo } from 'react';
import { createBEM } from '@/utils';
import cx from 'classnames';
import s from './index.module.scss';

interface ISmartTourismCardProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /** 标题 */
  title?: string;
}

/**
 * @description 卡片
 */
export const SmartTourismCard: FC<ISmartTourismCardProps> = memo(
  ({ children, title, className, ...extraProps }) => {
    const NAMESPACE = 'smart-tourism-card';

    return (
      <div className={cx(s[createBEM(NAMESPACE)], className ?? '')} {...extraProps}>
        <div className={createBEM(NAMESPACE, 'horn', 'left-top', s)}></div>
        <div className={createBEM(NAMESPACE, 'horn', 'left-bottom', s)}></div>
        <div className={createBEM(NAMESPACE, 'horn', 'right-top', s)}></div>
        <div className={createBEM(NAMESPACE, 'horn', 'right-bottom', s)}></div>
        {title && (
          <div className={s[createBEM(NAMESPACE, 'title')]}>
            <span>{title}</span>
          </div>
        )}
        {children && children}
      </div>
    );
  },
);

export default SmartTourismCard;
