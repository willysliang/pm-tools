/**
 * @ Author: willysliang
 * @ CreateTime: 2024-09-30 16:13:38
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-08 10:41:55
 * @ Description: 图表
 */

import { FC, Fragment, memo, useMemo, lazy } from 'react';
import { Control } from '../turbine-control';
import { useWindmillStore } from '@/store/large-screen/turbine';
import { createBEM } from '@/utils';
import s from './index.module.scss';

/**
 * 加载并缓存模块
 */
const MonitorEnv = lazy(() => import('../monitor-env'));
const MonitorStatistics = lazy(() => import('../monitor-satistics'));
const MonitorError = lazy(() => import('../monitor-error'));
const MonitorActive = lazy(() => import('../monitor-active'));
const MonitorEnergy = lazy(() => import('../monitor-energy'));
const MonitorYawAngle = lazy(() => import('../monitor-yaw-angle'));
const modules = {
  MonitorEnv,
  MonitorStatistics,
  MonitorError,
  MonitorActive,
  MonitorEnergy,
  MonitorYawAngle,
};

/** 页面上的图表 */
export const TurbineChart: FC = memo(() => {
  const NAMESPACE = 'turbine-chart';

  /**
   * 小面板模块的显隐并缓存
   */
  const { visibleModules } = useWindmillStore();
  const showComopnents = useMemo(() => visibleModules(), [visibleModules()]);

  return (
    <Fragment>
      <div className={s[createBEM(`${NAMESPACE}-left`)]}>
        <div className={s[createBEM(`${NAMESPACE}-left`, 'map-panels')]}>
          {showComopnents.slice(0, 3).map((item) => {
            const Comp = modules[item];
            return <Comp key={item} />;
          })}
        </div>
        <div className={s[createBEM(`${NAMESPACE}-left`, 'map-controls')]}>
          <Control />
        </div>
      </div>
      <div className={s[createBEM(`${NAMESPACE}-right`)]}>
        <div className={s[createBEM(`${NAMESPACE}-right`, 'map-panels')]}>
          {showComopnents.slice(3).map((item) => {
            const Comp = modules[item];
            return <Comp key={item} />;
          })}
        </div>
      </div>
    </Fragment>
  );
});

export default TurbineChart;
