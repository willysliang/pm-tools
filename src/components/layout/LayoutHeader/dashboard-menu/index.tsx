/**
 * @ Author: willysliang
 * @ CreateTime: 2024-09-27 15:11:32
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-09-27 15:16:08
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
    ({ path, label }) => ({
      key: path,
      label: <span>{label}</span>,
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
        className='mr-2 cursor-pointer text-[#999999] hover:text-[#8bb1ff]'
      />
    </Dropdown>
  );
});
