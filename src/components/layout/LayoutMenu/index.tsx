/**
 * @ Author: willy
 * @ CreateTime: 2024-06-20 16:38:37
 * @ Modifier: willy
 * @ ModifierTime: 2024-06-21 19:46:24
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
      <div className='layout-menu-item'>
        <a
          href='https://react.dev'
          target='_blank'
          onClick={(event) => handleSelectMenu(menuList[0], event)}
        >
          <img src={reactLogo} className='logo animation__spin' alt='React logo' />
        </a>
      </div>

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
