/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-08 08:46:57
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-08 10:16:52
 * @ Description: 参数监测
 */

import { FC, memo } from 'react';
import { WidgetPanel } from '../widget-panel';
import iconAlarm from '@assets/large-screen/turbine/icon-alarm.png';
import { createBEM } from '@/utils';
import s from './index.module.scss';

/** 参数监测 */
export const MonitorStatistics: FC = memo(() => {
  const NAMESPACE = 'monitor-satistics-rain';

  const rainInfos = [
    { label: '年发电量', value: '1000', unit: 'MWh', type: 'normal' },
    { label: '月发电量', value: '100', unit: 'MWh', type: 'normal' },
    { label: '周发电量', value: '10', unit: 'MWh', type: 'normal' },
    { label: '日发电量', value: '1', unit: 'MWh', type: 'normal', icon: iconAlarm },
    { label: '负荷率', value: '100', unit: '%', type: 'warning', icon: iconAlarm },
    { label: '平均风速', value: '100', unit: 'km/s', type: 'warning', icon: iconAlarm },
    { label: '最大风速', value: '200', unit: 'km/s', type: 'warning', icon: iconAlarm },
    { label: '总功率', value: '1000', unit: 'KVa', type: '', icon: iconAlarm },
  ];

  return (
    <WidgetPanel title='参数监测'>
      <ul className={s[createBEM(NAMESPACE)]}>
        {rainInfos.map(({ type, ...item }, index) => {
          return (
            <li key={index} className={createBEM(`${NAMESPACE}-item`, '', type, s)}>
              {item.icon && (
                <img
                  src={item.icon}
                  className={createBEM(`${NAMESPACE}-item`, 'icon', type, s)}
                  alt=''
                />
              )}
              <span className={createBEM(`${NAMESPACE}-item`, 'label', type, s)}>{item.label}</span>
              <span className={createBEM(`${NAMESPACE}-item`, 'value', type, s)}>{item.value}</span>
              <span className={s[createBEM(`${NAMESPACE}-item`, 'unit', type, s)]}>
                {item.unit}
              </span>
            </li>
          );
        })}
      </ul>
    </WidgetPanel>
  );
});

export default MonitorStatistics;
