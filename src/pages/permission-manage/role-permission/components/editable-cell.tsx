/**
 * @ Author: willysliang
 * @ CreateTime: 2024-11-04 14:54:54
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-11-26 11:41:50
 * @ Description: 可编辑单元格
 */

import { FC, HTMLAttributes, memo, PropsWithChildren } from 'react';
import { Form, Input, Select } from 'antd';
import { StatusMap } from '@/constants/common';
import { IRolesProps } from '@/server/roles/types';
import { useSelectPermission } from '../../hooks/useSelectPermission';

interface EditableCellProps extends HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: string;
  record: IRolesProps;
  index: number;
}

/**
 * @description 可编辑单元格
 */
export const EditableCell: FC<PropsWithChildren<EditableCellProps>> = memo(
  ({ editing, dataIndex, title, children, ...restProps }) => {
    const { permissionList } = useSelectPermission();

    const defaultNode = <Input style={{ textAlign: 'center' }} />;
    const nodeMap: Record<string, JSX.Element> = {
      status: <Select options={Object.values(StatusMap)} />,
      permissionCodes: <Select mode='multiple' options={permissionList} />,
    };

    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {nodeMap[dataIndex] ?? defaultNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  },
);

export default EditableCell;
