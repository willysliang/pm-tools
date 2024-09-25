/**
 * @ Author: willysliang
 * @ CreateTime: 2024-09-18 10:28:24
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-09-25 14:06:24
 * @ Description: 工时模块
 */

import IntradayWorkHoursRecords from './components/intraday-work-hours-records';
import { FC, memo } from 'react';
import { createBEM } from '@/utils';
import { randomWorkHours, WORK_HOUR_COMPARES } from './config';
import s from './index.module.scss';

/** 工时模块 */
export const WorkingHours: FC = memo(() => {
  const NAMESPACE = 'ui-working-hours';

  /** 工时情况列表 */
  const workhours = randomWorkHours(15);

  return (
    <div className={s[createBEM(NAMESPACE)]}>
      <div className='shrink-0'></div>
      <div className='flex-1 overflow-hidden flex flex-col'>
        <div className={s[createBEM(`${NAMESPACE}-header`)]}>
          <div className='flex-1'></div>
          <div className={s[createBEM(`${NAMESPACE}-header-compares`)]}>
            {WORK_HOUR_COMPARES.map((item) => (
              <div
                className={s[createBEM(`${NAMESPACE}-header-compares`, 'item')]}
                key={item.value}
              >
                <em style={{ backgroundColor: item.style.backgroundColor }}></em>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
          <div className={s[createBEM(`${NAMESPACE}-header`, 'desc')]}>单位: &nbsp;&nbsp;h</div>
        </div>
        <div className='flex-1 w-full flex overflow-x-auto overflow-y-hidden'>
          {workhours.map((workhour, index) => (
            <IntradayWorkHoursRecords key={index} {...workhour} />
          ))}
        </div>
      </div>
    </div>
  );
});

export default WorkingHours;
