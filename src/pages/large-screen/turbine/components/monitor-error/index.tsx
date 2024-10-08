/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-08 09:22:53
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-08 10:16:43
 * @ Description: 异常监测
 */

import { FC, memo } from 'react';
import { WidgetPanel } from '../widget-panel';
import { BaseTable } from '../base-table';

/** 异常监测 */
export const MonitorError: FC = memo(() => {
  const columns = [
    {
      title: '监测项目',
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
      time: '2023/04/03 12:00',
      status: '可疑',
    },
    {
      name: '发动机',
      time: '2023/04/03 12:00',
      status: '可疑',
    },
    {
      name: '齿轮箱',
      time: '2023/04/03 12:00',
      status: '可疑',
    },
    {
      name: '变桨系统',
      time: '2023/04/03 12:00',
      status: '可疑',
    },
    {
      name: '主轴',
      time: '2023/04/03 12:00',
      status: '可疑',
    },
    {
      name: '传送带',
      time: '2023/04/03 12:00',
      status: '可疑',
    },
    {
      name: '叶片',
      time: '2023/04/03 12:00',
      status: '可疑',
    },
    {
      name: '发电机',
      time: '2023/04/03 12:00',
      status: '可疑',
    },
  ];

  return (
    <WidgetPanel title='异常监测'>
      <BaseTable columns={columns} data={dataSource} />
    </WidgetPanel>
  );
});

export default MonitorError;
