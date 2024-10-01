/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-01 10:42:49
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-01 11:46:01
 * @ Description: 基础表格
 */

import { FC, memo, useMemo } from 'react';
import { useAutoscroll } from '../../hooks/useAutoscroll';
import { createBEM } from '@/utils';
import s from './index.module.scss';

interface IBaseTableProps {
  columns: {
    width: number | string;
    title: string;
    dataIndex: string;
  }[];
  data: Record<string, unknown>[];
}

/** 基础表格 */
export const BaseTable: FC<IBaseTableProps> = memo(({ columns, data }) => {
  const NAMESPACE = 'base-table';

  /** 数据源 */
  const dataSource = useMemo(
    () =>
      data.map((item) =>
        columns.map((column) => ({
          content: item[column.dataIndex] as string,
          width: column.width,
        })),
      ),
    [data],
  );

  /** 自动滚动 */
  const { elementRef: tableRef } = useAutoscroll(20);

  return (
    <div className={s[createBEM(NAMESPACE)]}>
      <ul className={s[createBEM(`${NAMESPACE}-header`)]}>
        {columns.map((column, index) => (
          <li
            key={index}
            className={s[createBEM(`${NAMESPACE}-header`, 'column')]}
            style={{ width: column.width }}
          >
            {column.title}
          </li>
        ))}
      </ul>
      <div ref={tableRef} className={s[createBEM(`${NAMESPACE}-body`)]}>
        {dataSource.map((row, index) => (
          <ul key={index} className={s[createBEM(`${NAMESPACE}-body`, 'row')]}>
            {row.map((column, idx) => (
              <li
                key={idx}
                className={s[createBEM(`${NAMESPACE}-body`, 'row-column')]}
                style={{ width: column.width }}
              >
                {column.content}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
});
