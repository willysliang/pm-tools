/**
 * @ Author: willysliang
 * @ CreateTime: 2024-09-27 15:11:32
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-09 22:13:38
 * @ Description: 大屏的路由菜单入口
 */

import { FC, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown, MenuProps } from 'antd';
import { DataSheet } from '@icon-park/react';
import { IconPark } from '@/components/common/IconPark';
import { DASHBOARD_ROUTE_CONFIGS } from '@/router/routes/dashboardRoutes';

/** 大屏路由的菜单 */
export const DashboardMenu: FC = memo(() => {
  /** 菜单列表 */
  const items: MenuProps['items'] = Object.values(DASHBOARD_ROUTE_CONFIGS).map(
    ({ path, label, icon }) => ({
      key: path,
      label: (
        <div className='inline-flex items-center cursor-pointer text-[#334155] hover:text-[#6e97e8]'>
          <IconPark icon={icon} size={22} className='inline-block mr-2' />
          {label}
        </div>
      ),
    }),
  );

  /**
   * 菜单点击
   */
  const navigate = useNavigate();
  const onClick: MenuProps['onClick'] = ({ key }) => {
    navigate(key);
  };

  return (
    <Dropdown menu={{ items, onClick }}>
      <IconPark
        icon={DataSheet}
        size={22}
        className='mr-4 cursor-pointer text-[#334155] hover:text-[#6e97e8]'
        title='大屏菜单'
      />
    </Dropdown>
  );
});
