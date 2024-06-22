/**
 * @ Author: willysliang
 * @ CreateTime: 2024-06-22 16:24:40
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-06-23 01:39:18
 * @ Description: 用户的菜单栏浮层
 */

import { FC, useEffect, useState } from 'react';
import { AssemblyLine, Info, Logout, SettingConfig } from '@icon-park/react';
import { IconPark } from '@/components/common/IconPark';
import { USER_ROUTE_CONFIGS } from '@/router/routes/userRoutes';
import { useUserStore } from '@/store/user/index';
import { createBEM, cutCNLetter } from '@/utils';
import s from './index.module.scss';
import { IRouteConfig } from '@/router/routes/types';
import { useNavigate } from 'react-router-dom';

export enum SettingTpe {
  USER_ROUTE = 'user-route',
  USER_OPERATE = 'user-operate',
  CONFIG_SETTING = 'config-setting',
}

type ICard = Pick<IRouteConfig, 'icon' | 'path' | 'label' | 'extra' | 'path'>;
interface ISettingItem {
  type: SettingTpe;
  cards: ICard[];
}

export const settingList: ISettingItem[] = [
  {
    type: SettingTpe.USER_ROUTE,
    cards: [
      USER_ROUTE_CONFIGS.ACCOUNT_SETTING,
      USER_ROUTE_CONFIGS.NOTICE_SETTING,
      USER_ROUTE_CONFIGS.PREFERENCE_SETTING,
    ],
  },
  {
    type: SettingTpe.CONFIG_SETTING,
    cards: [
      {
        icon: AssemblyLine,
        label: '配置中心',
        path: 'config',
      },
      {
        icon: SettingConfig,
        label: '管理后台',
        path: 'setting',
      },
    ],
  },
  {
    type: SettingTpe.USER_OPERATE,
    cards: [
      {
        icon: Info,
        label: '关于',
        path: 'info',
      },
      {
        icon: Logout,
        label: '退出登录',
        path: 'logout',
        extra: {
          color: '#ff75a1',
        },
      },
    ],
  },
];

export const AppUserMenu: FC<{ onClose: () => void }> = ({ onClose }) => {
  const namespace = 'app-user-menu';
  const navigate = useNavigate();
  const { userInfo } = useUserStore();

  /** 点击其他地方则关闭浮层 */
  useEffect(() => {
    document.removeEventListener('click', onClose);
    document.addEventListener('click', onClose);

    return () => {
      document.removeEventListener('click', onClose);
    };
  }, []);

  /** 当前激活的card (TODO) */
  const [activeCard, setActiveCard] = useState(
    settingList[Math.floor(Math.random() * settingList.length)].cards[
      Math.floor(Math.random() * 2)
    ],
  );

  /** 点击选择 */
  const handleClickCard = (type: SettingTpe, card: ICard) => {
    setActiveCard(card);

    if (type === SettingTpe.USER_ROUTE) {
      navigate(card.path);
    }

    setTimeout(onClose, 200);
  };

  return (
    <div className={s[namespace]} onClick={(event) => event.stopPropagation()}>
      <div className={s[createBEM(namespace, 'userinfo')]}>
        <div className={s[createBEM(namespace, 'userinfo', 'avatar')]}>
          {userInfo?.avatar ? (
            <img src={userInfo.avatar} alt='用户头像' />
          ) : (
            cutCNLetter(userInfo.username, 1, '')
          )}
        </div>
        <div className={s[createBEM(namespace, 'userinfo', 'username')]}>{userInfo.username}</div>
        {userInfo.description && (
          <div className={s[createBEM(namespace, 'userinfo', 'description')]}>
            {userInfo.description}
          </div>
        )}
      </div>

      {settingList.map((setting, index) => (
        <div className={s[createBEM(namespace, 'card')]} key={`${index}-${setting.type}`}>
          {setting.cards.map((card) => (
            <div
              key={`${setting.type}-${card.path}`}
              className={`${s[createBEM(namespace, 'card', 'item')]} ${activeCard.path === card.path ? s[createBEM(namespace, 'card', 'item-active')] : ''}`}
              style={{ color: card?.extra?.color ?? '#aaa' }}
              onClick={() => handleClickCard(setting.type, card)}
            >
              <IconPark icon={card.icon} size={18} theme='outline' className='mr-2' />
              <span>{card.label}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
