/**
 * @ Author: willy
 * @ CreateTime: 2024-06-20 17:29:53
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-09-27 15:14:20
 * @ Description: 头部
 */

import { FC, ReactElement, useState } from 'react';
import { IconPark } from '@/components/common/IconPark';
import { useAppStore } from '@/store/app';
import { useUserStore } from '@/store/user';
import { AppUserMenu } from './app-user-menu';
import { DashboardMenu } from './dashboard-menu';
import { CreateModal } from '@/hooks';
import { createBEM, cutCNLetter } from '@/utils';

/** 页面大框 - 头部 */
export const LayoutHeader: FC = (): ReactElement => {
  const NAMESPACE = 'layout-header';

  const { activeMenu } = useAppStore();
  const { userInfo } = useUserStore();

  /** 是否展示用户信息菜单栏 */
  const [showAppUserMenu, setShowAppUserMenu] = useState<boolean>(false);
  const handleToggleShowAppUserMenu = (status: boolean) => {
    setShowAppUserMenu(status);
  };

  return (
    <div className={NAMESPACE}>
      {/* 左侧 - 当前路由页面信息 */}
      <div className={createBEM(`${NAMESPACE}-left`)}>
        <IconPark
          icon={activeMenu.icon}
          size={18}
          theme='filled'
          fill='#ffb77d'
          className='mr-2 animation__breath'
        />
        <div className={createBEM(`${NAMESPACE}-left`, 'menu-name')}>{activeMenu.label}</div>
      </div>

      {/* 右侧 */}
      <div className={createBEM(`${NAMESPACE}-right`)}>
        {/* 大屏菜单 */}
        <DashboardMenu />

        {/* 头像 */}
        <div
          className={createBEM(`${NAMESPACE}-right`, 'avatar')}
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

      {/* 用户菜单弹窗 */}
      <CreateModal show={showAppUserMenu}>
        <AppUserMenu onClose={() => handleToggleShowAppUserMenu(false)} />
      </CreateModal>
    </div>
  );
};
