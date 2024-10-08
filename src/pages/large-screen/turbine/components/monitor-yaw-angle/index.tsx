/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-08 08:39:56
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-08 10:17:01
 * @ Description: 偏航角度监测
 */

import { FC, memo } from 'react';
import { WidgetPanel } from '../widget-panel';
import { BaseTable } from '../base-table';

/** 偏航角度监测 */
export const MonitorYawAngle: FC = memo(() => {
  const columns = [
    {
      title: '偏航方向',
      dataIndex: 'name',
      width: '25%',
    },
    {
      title: '监测时间',
      dataIndex: 'time',
      width: '55%',
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: '20%',
    },
  ];
  const dataSource = [
    {
      name: '向西48°',
      time: '2023/04/02 12:00',
      status: '正常',
    },
    {
      name: '向西38°',
      time: '2023/04/02 12:00',
      status: '正常',
    },
    {
      name: '向西28°',
      time: '2023/04/02 12:00',
      status: '正常',
    },
    {
      name: '向西18°',
      time: '2023/04/02 12:00',
      status: '正常',
    },
    {
      name: '向西8°',
      time: '2023/04/02 12:00',
      status: '正常',
    },
    {
      name: '向东8°',
      time: '2023/04/02 12:00',
      status: '正常',
    },
    {
      name: '向东18°',
      time: '2023/04/02 12:00',
      status: '正常',
    },
    {
      name: '向东28°',
      time: '2023/04/02 12:00',
      status: '正常',
    },
    {
      name: '向东38°',
      time: '2023/04/02 12:00',
      status: '正常',
    },
    {
      name: '向东48°',
      time: '2023/04/02 12:00',
      status: '正常',
    },
  ];

  return (
    <WidgetPanel title='偏航角度监测'>
      <BaseTable columns={columns} data={dataSource} />
    </WidgetPanel>
  );
});

export default MonitorYawAngle;
