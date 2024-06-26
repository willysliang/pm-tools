/**
 * @ Author: willy
 * @ CreateTime: 2024-06-20 17:29:53
 * @ Modifier: willy
 * @ ModifierTime: 2024-06-26 10:30:11
 * @ Description: 头部
 */

import { ReactElement, useState } from 'react';
import { IconPark } from '@/components/common/IconPark';
import { useAppStore } from '@/store/app/index';
import { useUserStore } from '@/store/user/index';
import { AppUserMenu } from './app-user-menu';
import { cutCNLetter } from '@/utils';
import { CreateModal } from '@/hooks/index';

export const LayoutHeader = (): ReactElement => {
  const { activeMenu } = useAppStore();
  const { userInfo } = useUserStore();

  /** 是否展示用户信息菜单栏 */
  const [showAppUserMenu, setShowAppUserMenu] = useState<boolean>(false);
  const handleToggleShowAppUserMenu = (status: boolean) => {
    setShowAppUserMenu(status);
  };

  return (
    <div className='layout-header'>
      <div className='layout-header__left'>
        <IconPark icon={activeMenu.icon} size={18} theme='filled' fill='#ffb77d' className='mr-2' />
        <div className='layout-header__left--menu-name'>{activeMenu.label}</div>
      </div>
      <div className='layout-header__right'>
        <div
          className='layout-header__right--avatar'
          onClick={(event) => {
            event.stopPropagation();
            handleToggleShowAppUserMenu(true);
          }}
        >
          {userInfo?.avatar ? (
            <img src={userInfo.avatar} alt='用户头像' />
          ) : (
            cutCNLetter(userInfo.username, 1, '')
          )}
        </div>
      </div>

      {showAppUserMenu && (
        <CreateModal>
          <AppUserMenu onClose={() => handleToggleShowAppUserMenu(false)} />
        </CreateModal>
      )}
    </div>
  );
};
