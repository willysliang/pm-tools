/**
 * @ Author: willy
 * @ CreateTime: 2024-06-20 17:29:53
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-24 15:55:03
 * @ Description: 头部
 */

import { FC, memo, ReactElement, useState } from 'react';
import { FullScreenOne, GoEnd, GoStart, OffScreenOne } from '@icon-park/react';
import { IconPark } from '@/components/common/IconPark';
import { useAppStore } from '@/store/app';
import { useUserStore } from '@/store/user';
import { AppUserMenu } from './app-user-menu';
import { DashboardMenu } from './dashboard-menu';
import { CreateModal } from '@/hooks';
import { createBEM, cutCNLetter } from '@/utils';
import { useFullScreen } from '../hooks/useFullScreen';
import { useNavigate } from 'react-router-dom';

/** 页面大框 - 头部 */
export const LayoutHeader: FC = memo((): ReactElement => {
  const NAMESPACE = 'layout-header';

  const { activeMenu } = useAppStore();
  const { userInfo } = useUserStore();

  /**
   * 路由前进后退
   */
  const navigate = useNavigate();
  const handleGoBack = () => navigate(-1);
  const handleGoForward = () => navigate(1);

  /** 是否展示用户信息菜单栏 */
  const [showAppUserMenu, setShowAppUserMenu] = useState<boolean>(false);
  const handleToggleShowAppUserMenu = (status: boolean) => {
    setShowAppUserMenu(status);
  };

  /** 全屏功能 */
  const { isFullScreen, toggleFullScreen } = useFullScreen();

  return (
    <div className={NAMESPACE}>
      {/* 左侧 - 路由页面信息 */}
      <div className={createBEM(`${NAMESPACE}-left`)}>
        {/* 前进后退 */}
        <IconPark
          icon={GoStart}
          size={20}
          theme='filled'
          className='mr-1 cursor-pointer text-[#334155] hover:text-[#6e97e8]'
          title='返回上一级页面'
          onClick={handleGoBack}
        />
        <IconPark
          icon={GoEnd}
          size={20}
          theme='filled'
          className='mr-2 cursor-pointer text-[#334155] hover:text-[#6e97e8]'
          title='前进'
          onClick={handleGoForward}
        />

        {/* 当前路由页面信息 */}
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

        {/* 全屏功能 */}
        <IconPark
          icon={isFullScreen ? OffScreenOne : FullScreenOne}
          size={18}
          theme='filled'
          className='mr-4 cursor-pointer text-[#334155] hover:text-[#6e97e8]'
          onClick={() => toggleFullScreen()}
          title={isFullScreen ? '退出全屏' : '全屏'}
        />

        {/* 头像 */}
        <div
          className={createBEM(`${NAMESPACE}-right`, 'avatar')}
          title={userInfo?.username || '未登录'}
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
});
