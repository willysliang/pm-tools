/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-09 16:22:25
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-15 08:39:30
 * @ Description: 智慧旅游 - 头部
 */

import { FC, memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  EnumSmartTourismSubMenu,
  SMART_TOURISM_ROUTE_CONFIGS,
} from '@/router/routes/dashboardRoutes';
import { createBEM, formatDate } from '@/utils';
import cx from 'classnames';
import s from './index.module.scss';

/**
 * @description 智慧旅游 - 头部
 */
const WisdomTourismHeader: FC = memo(() => {
  const NAMESPACE = 'wisdom-tourism';

  /**
   * 当前时间
   */
  const [today, setToday] = useState<string>(formatDate(new Date(), 'YYYY年MM月DD日 hh:mm:ss'));
  useEffect(() => {
    const timer = setInterval(() => {
      setToday(formatDate(new Date(), 'YYYY年MM月DD日 hh:mm:ss'));
    }, 1000);

    return () => {
      timer && clearInterval(timer);
    };
  }, []);

  /**
   * 路由跳转
   */
  const navigate = useNavigate();
  const handleRouteJump = (type: EnumSmartTourismSubMenu) => {
    navigate(SMART_TOURISM_ROUTE_CONFIGS[type].path);
  };

  return (
    <div className={s[createBEM(`${NAMESPACE}-header`)]}>
      <div className={s[createBEM(`${NAMESPACE}-header`, 'left')]}>
        <div
          className={cx(s[createBEM(`${NAMESPACE}-header`, 'left-btn')], 'font-family-dingtalk')}
          onClick={() => handleRouteJump(EnumSmartTourismSubMenu.TOURIST_ANALYSIS)}
        >
          游客量分析
        </div>
        <div
          className={cx(s[createBEM(`${NAMESPACE}-header`, 'left-btn')], 'font-family-dingtalk')}
          onClick={() => handleRouteJump(EnumSmartTourismSubMenu.CROWD_ANALYSIS)}
        >
          人群分析
        </div>
        <div
          className={cx(s[createBEM(`${NAMESPACE}-header`, 'left-btn')], 'font-family-dingtalk')}
          onClick={() => handleRouteJump(EnumSmartTourismSubMenu.BASE)}
        >
          首页
        </div>
      </div>
      <div className={s[createBEM(`${NAMESPACE}-header`, 'center')]}>
        <span className='font-family-dingtalk'>智慧旅游可视化大数据展示平台</span>
        <div
          className={cx(
            s[createBEM(`${NAMESPACE}-header`, 'center-warning')],
            'font-family-dingtalk',
          )}
        >
          平台高峰预警信息（2条）
        </div>
      </div>
      <div className={s[createBEM(`${NAMESPACE}-header`, 'right')]}>
        <div
          className={cx(s[createBEM(`${NAMESPACE}-header`, 'right-btn')], 'font-family-dingtalk')}
          onClick={() => handleRouteJump(EnumSmartTourismSubMenu.STATISTICS_REPORT)}
        >
          统计报告
        </div>
        <div className='font-family-dingtalk'>当前时间: {today}</div>
      </div>
    </div>
  );
});

export default WisdomTourismHeader;
