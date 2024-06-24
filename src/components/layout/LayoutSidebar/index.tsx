/**
 * @ Author: willysliang
 * @ CreateTime: 2024-06-23 11:26:48
 * @ Modifier: willy
 * @ ModifierTime: 2024-06-24 11:07:57
 * @ Description: 二级路由的侧边栏
 */

import { FC, useState, useEffect } from 'react';
import { createBEM } from '@/utils';
import { IRouteConfig } from '@/router/routes/types';
import cx from 'classnames';
import s from './index.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';

/** 配置列表的约束 */
export type IConfigList = { label: string; list: IRouteConfig[] }[];

export const LayoutSidebar: FC<{
  configList?: IConfigList;
  onUpdateActiveRoute?: (card: IRouteConfig) => void;
  children?: React.ReactNode;
}> = ({ configList, onUpdateActiveRoute, children }) => {
  const namespace = 'layout-sidebar';

  const location = useLocation();
  const navigate = useNavigate();

  /** 配置列表扁平化 */
  const configListFlat: IRouteConfig[] = [];
  configList?.forEach((item) => configListFlat.push(...item.list));

  /** 记录活跃的 card */
  const [activeCard, setActiveCard] = useState<IRouteConfig>(configList![0].list[0]);

  /** 根据路由变化来更新活跃的 card */
  useEffect(() => {
    const path = location.pathname;
    const card = configListFlat.find((item) => item.path === path);
    setActiveCard(card!);
    typeof onUpdateActiveRoute === 'function' && onUpdateActiveRoute(card!);
  }, [location]);

  /** 切换 card */
  const handleClickCard = (card: IRouteConfig) => {
    if (activeCard.path === card.path) return;
    navigate(card.path);
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
                        activeCard?.path === item.path,
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
