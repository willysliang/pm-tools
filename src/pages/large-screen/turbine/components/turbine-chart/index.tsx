/**
 * @ Author: willysliang
 * @ CreateTime: 2024-09-30 16:13:38
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-01 11:31:46
 * @ Description: 图表
 */

import { FC, Fragment, memo } from 'react';
import { Control } from '../turbine-control';
import { MonitorActive } from '../monitor-active';
import { createBEM } from '@/utils';
import s from './index.module.scss';

/** 页面上的图表 */
export const TurbineChart: FC = memo(() => {
  const NAMESPACE = 'turbine-chart';

  return (
    <Fragment>
      <div className={s[createBEM(`${NAMESPACE}-left`)]}>
        <div className={s[createBEM(`${NAMESPACE}-left`, 'map-panels')]}>
          <MonitorActive />
        </div>
        <div className={s[createBEM(`${NAMESPACE}-left`, 'map-controls')]}>
          <Control />
        </div>
      </div>
    </Fragment>
  );
});

export default TurbineChart;
