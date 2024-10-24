/**
 * @ Author: willy
 * @ CreateTime: 2024-06-20 16:38:37
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-24 16:06:28
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
  const handleSelectMenu = (menu: IRouteConfig, event?: React.MouseEvent<HTMLElement>) => {
    if (event) event.preventDefault();

    setMenu(menu);
    navigate(menu.path);
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

      {menuList.map((item) => (
        <div
          className={`layout-menu__item ${item.key === activeMenu.key ? 'layout-menu__item--active' : ''}`}
          key={item.key}
          title={item.label}
          onClick={() => handleSelectMenu(item)}
        >
          <IconPark
            icon={item.icon}
            size={22}
            theme='filled'
            style={{
              color: `var(${item.key === activeMenu.key ? '--theme-active-color' : '--theme-normal-color'})`,
            }}
          />
        </div>
      ))}
    </div>
  );
};
