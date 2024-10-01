/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-01 11:20:34
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-01 11:41:42
 * @ Description: 小部件面板
 */

import { FC, memo } from 'react';
import cx from 'classnames';
import s from './index.module.scss';
import { createBEM } from '@/utils';

interface IWidgetPanelProps {
  title: string;
  children: React.ReactNode;
}

/** 小部件面板 */
export const WidgetPanel: FC<IWidgetPanelProps> = memo(({ title, children }) => {
  const NAMESPACE = 'widget-panel';

  const handleEvent = (event: any) => {
    event.stopPropagation();
  };

  return (
    <div
      className={cx(s[createBEM(NAMESPACE)], 'animate animate__bounceIn')}
      onMouseDown={handleEvent}
      onMouseUp={handleEvent}
      onWheel={handleEvent}
      onDoubleClick={handleEvent}
      onClick={handleEvent}
      onMouseEnter={handleEvent}
      onMouseLeave={handleEvent}
    >
      <div className={s[createBEM(NAMESPACE, 'title')]}>{title}</div>
      <div className={s[createBEM(NAMESPACE, 'main')]}>{children}</div>
    </div>
  );
});
