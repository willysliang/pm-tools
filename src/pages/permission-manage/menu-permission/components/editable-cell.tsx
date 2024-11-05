/**
 * @ Author: willysliang
 * @ CreateTime: 2024-11-04 14:54:54
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-11-05 10:29:05
 * @ Description: 可编辑单元格
 */

import { FC, HTMLAttributes, PropsWithChildren } from 'react';
import { Form, Input, Select } from 'antd';
import { StatusMap } from '@/constants/common';
import { IPermissionsProps } from '@/server/permissions/types';

interface EditableCellProps extends HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: string;
  record: IPermissionsProps;
  index: number;
}

/**
 * @description 可编辑单元格
 */
export const EditableCell: FC<PropsWithChildren<EditableCellProps>> = ({
  editing,
  dataIndex,
  title,
  children,
  ...restProps
}) => {
  const statusNode = <Select options={Object.values(StatusMap)} />;
  const defaultNode = <Input style={{ textAlign: 'center' }} />;

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
          {dataIndex === 'status' ? statusNode : defaultNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default EditableCell;
