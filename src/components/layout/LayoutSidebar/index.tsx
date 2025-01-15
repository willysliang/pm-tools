/**
 * @ Author: willysliang
 * @ CreateTime: 2024-06-23 11:26:48
 * @ Modifier: willysliang
 * @ ModifierTime: 2025-01-15 17:29:34
 * @ Description: 二级路由的侧边栏
 */

import { FC, useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import IconPark from '@comp/common/IconPark';
import { IRouteConfig } from '@/router/routes/types';
import { createBEM } from '@/utils';
import cx from 'classnames';
import s from './index.module.scss';

/** 配置列表的约束 */
export type IConfigProps = { label: string; list: IRouteConfig[] };

interface ILayoutSidebarProps {
  configList: IConfigProps[];
  onUpdateActiveRoute?: (card: IRouteConfig) => void;
  children?: React.ReactNode;
}

/**
 * @description 二级路由的侧边栏
 */
export const LayoutSidebar: FC<ILayoutSidebarProps> = ({
  configList,
  onUpdateActiveRoute,
  children,
}) => {
  const NAMESPACE = 'layout-sidebar';

  const location = useLocation();
  const navigate = useNavigate();

  /** 配置列表扁平化 */
  const configListFlat = useMemo<IRouteConfig[]>(
    () => configList.reduce((prev: IRouteConfig[], cur) => prev.concat(cur.list), []),
    [configList],
  );

  /** 记录活跃的 card */
  const [activeCard, setActiveCard] = useState<IRouteConfig>(configListFlat[0]);

  /** 根据路由变化来更新活跃的 card */
  useEffect(() => {
    const card = configListFlat.find((item) => item.path === location.pathname);

    // 如果活跃的路由，则重定向到第一个配置项路由
    if (!card) {
      navigate(configListFlat[0].path);
      return;
    }
    setActiveCard(card!);
    onUpdateActiveRoute && onUpdateActiveRoute(card!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configListFlat, location.pathname, onUpdateActiveRoute]);

  /** 切换 card */
  const handleClickCard = (card: IRouteConfig) => {
    if (activeCard.path === card.path) return;
    navigate(card.path);
  };

  return (
    <div className={s[createBEM(NAMESPACE)]}>
      {children ??
        configList!.map((config, index) => (
          <div className={s[createBEM(`${NAMESPACE}-card`)]} key={index}>
            {config.label && (
              <div className={s[createBEM(`${NAMESPACE}-card`, 'label')]}>{config.label}</div>
            )}
            {config.list.map((item) => (
              <div
                className={cx(
                  s[createBEM(`${NAMESPACE}-card`, 'label')],
                  s[createBEM(`${NAMESPACE}-card`, 'item')],
                  activeCard?.path === item.path
                    ? createBEM(`${NAMESPACE}-card`, 'item', 'active', s)
                    : '',
                )}
                key={`${index}-${item.key}`}
                onClick={() => handleClickCard(item)}
              >
                <IconPark icon={item.icon} size={12} className='mr-1' />
                {item.label}
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default LayoutSidebar;
