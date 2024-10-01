/**
 * @ Author: willysliang
 * @ CreateTime: 2024-09-30 15:28:53
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-01 09:30:18
 * @ Description: 折叠面板
 */

import { FC, memo } from 'react';
import { createBEM } from '@/utils';
import s from './index.module.scss';

interface IBaseCollapseProps {
  title: string;
  children: React.ReactNode;
}

export const BaseCollapse: FC<IBaseCollapseProps> = memo(({ title, children }) => {
  const NAMESPACE = 'base-collapse';

  return (
    <div className={s[createBEM(NAMESPACE)]}>
      <div className={s[createBEM(NAMESPACE, 'header')]}>{title}</div>
      <div className={s[createBEM(NAMESPACE, 'content')]}>{children}</div>
    </div>
  );
});

export default BaseCollapse;
