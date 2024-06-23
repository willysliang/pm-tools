/**
 * @ Author: willysliang
 * @ CreateTime: 2024-06-23 11:26:48
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-06-24 00:19:59
 * @ Description: 二级路由的侧边栏
 */

import { FC, useState } from 'react';
import { createBEM } from '@/utils';
import { IRouteConfig } from '@/router/routes/types';
import cx from 'classnames';
import s from './index.module.scss';

export type IConfigList = { label: string; list: IRouteConfig[] }[];

export const LayoutSidebar: FC<{ configList?: IConfigList; children?: React.ReactNode }> = ({
  configList,
  children,
}) => {
  const namespace = 'layout-sidebar';

  // TODO
  const [activeCard, setActiveCard] = useState<IRouteConfig>(configList![0].list[0]);
  const handleClickCard = (card: IRouteConfig) => {
    if (activeCard.key === card.key) return;
    setActiveCard(card);
  };

  return (
    <div className={s[createBEM(namespace)]}>
      {children
        ? children
        : configList!.map((config, index) => (
            <div className={s[createBEM(namespace, 'card')]} key={index}>
              <div className={s[createBEM(namespace, 'card', 'label')]}>{config.label}</div>
              {config.list.map((item) => (
                <div
                  className={cx(
                    s[createBEM(namespace, 'card', 'label')],
                    s[createBEM(namespace, 'card', 'item')],
                    {
                      [s[createBEM(namespace, 'card', 'item-active')]]:
                        activeCard?.key === item.key,
                    },
                  )}
                  key={`${index}-${item.key}`}
                  onClick={() => handleClickCard(item)}
                >
                  {item.label}
                </div>
              ))}
            </div>
          ))}
    </div>
  );
};

export default LayoutSidebar;
