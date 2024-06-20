/**
 * @ Author: willy
 * @ CreateTime: 2024-06-20 17:29:53
 * @ Modifier: willy
 * @ ModifierTime: 2024-06-20 18:16:12
 * @ Description: 头部
 */

import { ReactElement } from 'react';
import { MoreOne } from '@icon-park/react';
import { IconPark } from '@/components/common/IconPark';
import { useAppStore } from '@/store/app/index';
import { useUserStore } from '@/store/user/index';

export const LayoutHeader = (): ReactElement => {
  const { activeMenu } = useAppStore();
  const { userInfo } = useUserStore();

  const handleShowMore = () => {
    console.log('111');
  };

  return (
    <div className='layout-header'>
      <div className='layout-header__left'>
        <div className='layout-header__left--menu-name'>{activeMenu.label}</div>
      </div>
      <div className='layout-header__right'>
        <div className='layout-header__right--avatar' title={`用户: ${userInfo.username}`}>
          <img src={userInfo?.avatar || ''} alt='用户头像' />
        </div>
        <IconPark
          icon={MoreOne}
          size={24}
          theme='filled'
          className='layout-header__right--more'
          onClick={() => handleShowMore()}
        />
      </div>
    </div>
  );
};
