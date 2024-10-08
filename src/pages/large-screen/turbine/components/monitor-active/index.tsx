/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-01 11:19:31
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-08 10:17:13
 * @ Description: 活动检测
 */

import { FC, memo } from 'react';
import { WidgetPanel } from '../widget-panel';
import { BaseTable } from '../base-table';

export const MonitorActive: FC = memo(() => {
  const columns = [
    {
      title: '部件名称',
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
      name: '发动机',
      time: '2024/09/02 12:00',
      status: '正常',
    },
    {
      name: '齿轮箱',
      time: '2024/09/02 12:00',
      status: '正常',
    },
    {
      name: '变桨系统',
      time: '2024/09/02 12:00',
      status: '正常',
    },
    {
      name: '主轴',
      time: '2024/09/02 12:00',
      status: '正常',
    },
    {
      name: '叶片',
      time: '2024/09/02 12:00',
      status: '正常',
    },
    {
      name: '偏航角度',
      time: '2024/09/02 12:00',
      status: '正常',
    },
    {
      name: '发动机',
      time: '2024/09/02 12:00',
      status: '正常',
    },
    {
      name: '齿轮箱',
      time: '2024/09/02 12:00',
      status: '正常',
    },
    {
      name: '变桨系统',
      time: '2024/09/02 12:00',
      status: '正常',
    },
    {
      name: '主轴',
      time: '2024/09/02 12:00',
      status: '正常',
    },
    {
      name: '叶片',
      time: '2024/09/02 12:00',
      status: '正常',
    },
    {
      name: '偏航角度',
      time: '2024/09/02 12:00',
      status: '正常',
    },
  ];

  return (
    <WidgetPanel title='活动检测'>
      <BaseTable columns={columns} data={dataSource} />
    </WidgetPanel>
  );
});

export default MonitorActive;
