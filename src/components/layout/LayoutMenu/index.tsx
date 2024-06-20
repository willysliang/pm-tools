/**
 * @ Author: willy
 * @ CreateTime: 2024-06-20 16:38:37
 * @ Modifier: willy
 * @ ModifierTime: 2024-06-20 18:33:18
 * @ Description: 菜单栏
 */

import { ReactElement } from 'react';
import { IconPark } from '@/components/common/IconPark';
import { useAppStore } from '@/store/app/index';
import reactLogo from '@assets/react.svg';

export const LayoutMenu = (): ReactElement => {
  const { menuList, activeMenu, setMenu } = useAppStore();

  return (
    <div className='layout-menu'>
      <div className='layout-menu-item'>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo animation__spin' alt='React logo' />
        </a>
      </div>

      {menuList.map((item) => (
        <div
          className={`layout-menu__item ${item.key === activeMenu.key ? 'layout-menu__item--active' : ''}`}
          key={item.key}
          title={item.label}
          onClick={() => setMenu(item)}
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
