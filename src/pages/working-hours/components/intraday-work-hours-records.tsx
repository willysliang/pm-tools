/**
 * @ Author: willysliang
 * @ CreateTime: 2024-09-24 17:17:19
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-09-25 14:25:22
 * @ Description: 工时情况对照表
 */

import { CSSProperties, FC, Fragment, memo } from 'react';
import { createBEM, formatDate } from '@/utils';
import { WORK_HOUR_COMPARES } from '../config';
import cx from 'classnames';
import s from '../index.module.scss';

interface IIntradayWorkHoursRecordsProps {
  ts: number;
  records: {
    start: string;
    end: string;
    duration: number;
  }[];
}

/** 当天的工时记录情况 */
export const IntradayWorkHoursRecords: FC<IIntradayWorkHoursRecordsProps> = memo(
  ({ ts, records }) => {
    const NAMESPACE = 'intraday-working-hours';

    /** 当天 */
    const day = new Date(new Date(ts).setHours(0, 0, 0, 0));
    /** 当天是否为今天 */
    const isToday = +day === new Date().setHours(0, 0, 0, 0);

    /** 当天工时总和 */
    const totalDuration = records.reduce((prev, cur) => prev + Number(cur.duration), 0).toFixed(1);

    /** 当天工时总和的 div 的样式 */
    const totalDurationStyle = (): CSSProperties => {
      const result: CSSProperties = {};
      const val = Number(totalDuration);
      // 边界条件
      if (val <= 0) return result;
      WORK_HOUR_COMPARES.forEach((item) => {
        if (val >= item.min && val < item.max) {
          Object.assign(result, item.style);
        }
      });

      return result;
    };

    return (
      <div className={s[createBEM(NAMESPACE)]}>
        <div className={cx(s[createBEM(NAMESPACE, 'box')], createBEM(NAMESPACE, 'header', '', s))}>
          <span className={createBEM(NAMESPACE, 'header', ['week', isToday ? 'active' : ''], s)}>
            {formatDate(day, '周E')}
          </span>
          <span className={createBEM(NAMESPACE, 'header', ['date', isToday ? 'active' : ''], s)}>
            {formatDate(day, 'MM/DD')}
          </span>
        </div>
        <div className={cx(s[createBEM(NAMESPACE, 'working')])}>
          {records.map((record, index) => (
            <Fragment key={index}>
              {record.duration > 0 && (
                <div
                  className={cx(s[createBEM(NAMESPACE, 'box')], s[createBEM(NAMESPACE, 'hours')])}
                >
                  {record.duration}
                </div>
              )}
            </Fragment>
          ))}
        </div>

        <div
          className={cx(s[createBEM(NAMESPACE, 'box')], createBEM(NAMESPACE, 'total'))}
          style={totalDurationStyle()}
        >
          {totalDuration}
        </div>
      </div>
    );
  },
);

export default IntradayWorkHoursRecords;
