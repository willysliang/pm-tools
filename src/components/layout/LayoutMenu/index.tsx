/**
 * @ Author: willy
 * @ CreateTime: 2024-06-20 16:38:37
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-29 17:03:18
 * @ Description: 菜单栏
 */

import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconPark } from '@/components/common/IconPark';
import { useAppStore } from '@/store/app/index';
import { IRouteConfig } from '@/router/routes/types';
import reactLogo from '@assets/react.svg';

export const LayoutMenu = (): ReactElement => {
  const { menuList, activeMenu, setMenu } = useAppStore();

  const navigate = useNavigate();

  /** 选择菜单项 */
  const handleSelectMenu = (menu: IRouteConfig, event?: React.MouseEvent<HTMLElement>) => {
    if (event) event.preventDefault();

    setMenu(menu);
    navigate(menu.path);
  };

  /**
   * @function isActiveMenu 当前菜单项是否活跃
   * @description 如果跟活跃的路由的key值相同，或者活跃的路由 path 是菜单路由的子路由，则认为该菜单项是活跃的
   */
  const isActiveMenu = (menu: IRouteConfig) => {
    const isActive = activeMenu.key === menu.key || activeMenu.path.includes(menu.path + '/');
    return isActive;
  };

  return (
    <div className='layout-menu'>
      <a
        className='layout-menu-item'
        href='https://willysliang.github.io/pm-tools/'
        target='_blank'
        title='线上演示地址'
      >
        <img src={reactLogo} className='logo animation__spin' alt='React logo' />
      </a>

      {menuList.map((menu) => (
        <div
          className={`layout-menu__item ${isActiveMenu(menu) ? 'layout-menu__item--active' : ''}`}
          key={menu.key}
          title={menu.label}
          onClick={() => handleSelectMenu(menu)}
        >
          <IconPark
            icon={menu.icon}
            size={22}
            theme='filled'
            style={{
              color: `var(${isActiveMenu(menu) ? '--theme-active-color' : '--theme-normal-color'})`,
            }}
          />
        </div>
      ))}
    </div>
  );
};
