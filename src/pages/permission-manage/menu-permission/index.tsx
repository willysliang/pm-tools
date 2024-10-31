/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-25 17:46:14
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-30 17:46:46
 * @ Description: 菜单权限管理
 */

import { FC, memo, useEffect, useMemo, useRef, useState } from 'react';
import {
  Form,
  Input,
  InputNumber,
  message,
  Pagination,
  Popconfirm,
  Table,
  Tag,
  Tooltip,
  Typography,
  type TableProps,
} from 'antd';
import { Delete, Edit } from '@icon-park/react';
import IconPark from '@/components/common/IconPark';
import { getPermissions } from '@/server/permissions';
import { IPermissionsProps } from '@/server/permissions/types';
import { StatusMap } from '@/constants/common';

/**
 * 表格配置
 */
const defaultColumns: TableProps<IPermissionsProps>['columns'] = [
  {
    title: '序号',
    dataIndex: 'id',
    key: 'id',
    align: 'center',
    fixed: 'left',
    width: 100,
  },
  {
    title: '代码编号',
    dataIndex: 'permissionCode',
    key: 'permissionCode',
    align: 'center',
    ellipsis: {
      showTitle: false,
    },
    render: (permissionCode) => (
      <Tooltip placement='topLeft' title={permissionCode}>
        {permissionCode}
      </Tooltip>
    ),
  },
  {
    title: '权限名称',
    dataIndex: 'permissionName',
    key: 'permissionName',
    align: 'center',
    ellipsis: {
      showTitle: false,
    },
    render: (permissionName) => (
      <Tooltip placement='topLeft' title={permissionName}>
        {permissionName}
      </Tooltip>
    ),
  },
  {
    title: '权限类型',
    dataIndex: 'permissionType',
    key: 'permissionType',
    align: 'center',
    width: 150,
    ellipsis: {
      showTitle: false,
    },
    render: (permissionType) => <Tag>{permissionType}</Tag>,
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    align: 'center',
    width: 150,
    ellipsis: {
      showTitle: false,
    },
    render: (status) => <Tag color={StatusMap[status].color}>{StatusMap[status].label}</Tag>,
    sorter: (a, b) => a.status - b.status,
    showSorterTooltip: { target: 'sorter-icon', title: '' },
  },
];

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: IPermissionsProps;
  index: number;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  editing,
  dataIndex,
  title,
  inputType,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

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
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

/**
 * @description 菜单权限管理
 */
export const MenuPermission: FC = memo(() => {
  const [permissions, setPermissions] = useState<IPermissionsProps[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(15);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const searchValue = useRef<string>('');
  const [searchLoading, setSearchLoading] = useState<boolean>(false);

  /** 获取数据 */
  const getList = async (newPage: number = currentPage, newPageSize: number = pageSize) => {
    setSearchLoading(true);
    const res = await getPermissions(searchValue.current, newPage, newPageSize);
    if (res.code) {
      message.error(res.error as any);
      setSearchLoading(false);
      return;
    }
    setPermissions(res.permissions);
    setTotal(res.total);
    setCurrentPage(newPage);
    setPageSize(newPageSize);
    setSearchLoading(false);
  };

  useEffect(() => {
    getList();
  }, []);

  /** 搜索 */
  const handleSearch = (val: string) => {
    searchValue.current = val;
    getList(1, pageSize);
  };

  /**
   * 事件触发
   */
  /** 编辑 */
  // const handleEdit = (id: IPermissionsProps['id']) => {
  //   message.info(`编辑权限 ${id}`);
  // };
  /** 删除 */
  const handleDelete = (id: IPermissionsProps['id']) => {
    message.info(`删除权限 ${id}`);
  };

  /**
   * 编辑行
   */
  const [form] = Form.useForm<IPermissionsProps>();
  const [editingKey, setEditingKey] = useState<number>(-1);
  const isEditing = (record: IPermissionsProps) => record.id === editingKey;
  const handleEdit = (record: Partial<IPermissionsProps>) => {
    form.setFieldsValue({
      permissionCode: '',
      permissionName: '',
      permissionType: '其他',
      ...record,
    });
    setEditingKey(record.id!);
  };

  const cancel = () => {
    setEditingKey(-1);
  };

  const save = async (id: number) => {
    try {
      const row = await form.validateFields();

      const newData = [...permissions];
      const index = newData.findIndex((item) => id === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setPermissions(newData);
        setEditingKey(-1);
      } else {
        newData.push(row);
        setPermissions(newData);
        setEditingKey(-1);
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  /**
   * 表格配置
   */
  const columns: TableProps<IPermissionsProps>['columns'] = useMemo(
    () => [
      ...defaultColumns,
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: 120,
        align: 'center',
        fixed: 'right',
        render: (_, record: IPermissionsProps) => {
          const editable = isEditing(record);

          return editable ? (
            <span>
              <Typography.Link onClick={() => save(record.id!)} style={{ marginInlineEnd: 8 }}>
                保存
              </Typography.Link>
              <Popconfirm title='Sure to cancel?' onConfirm={cancel}>
                <a>取消</a>
              </Popconfirm>
            </span>
          ) : (
            <div className='w-full h-full flex items-center justify-center'>
              <IconPark
                icon={Edit}
                size={16}
                title='编辑'
                className='text-[#5794f7] mr-4 btn'
                onClick={() => handleEdit(record)}
              />
              <Popconfirm
                title='确认删除'
                description='确认删除该权限吗？权限删除后不可回复，删除后会从对应页面中删除'
                okType='danger'
                okText='确认'
                cancelText='取消'
                cancelButtonProps={{
                  size: 'small',
                }}
                okButtonProps={{
                  size: 'small',
                }}
                onConfirm={() => handleDelete(record.id)}
                onOpenChange={() => console.log('open change')}
              >
                <div className='text-[orange] btn'>
                  <IconPark icon={Delete} size={16} title='删除' />
                </div>
              </Popconfirm>
            </div>
          );
        },
      },
    ],
    [editingKey],
  );

  const mergeColumns = columns.map((col: any) => {
    if (col.dataIndex === 'action') return col;

    return {
      ...col,
      onCell: (record: IPermissionsProps) => ({
        record,
        inputType: col.dataIndex === 'status' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <div className='w-full h-full flex flex-col'>
      <Input.Search
        placeholder='搜索编号和名称'
        loading={searchLoading}
        className='p-1'
        onSearch={handleSearch}
      />

      <div className='flex-1 mb-2 overflow-hidden'>
        <Form form={form} component={false}>
          <Table<IPermissionsProps>
            className='w-full h-full overflow-auto not-scrollbar'
            components={{
              body: { cell: EditableCell },
            }}
            columns={mergeColumns}
            dataSource={permissions}
            size='small'
            rowKey='id'
            bordered
            sticky
            showSorterTooltip={{ target: 'sorter-icon' }}
            pagination={false}
          />
        </Form>
      </div>

      <Pagination
        align='end'
        size='small'
        total={total}
        pageSize={pageSize}
        current={currentPage}
        onChange={getList}
      />
    </div>
  );
});
export default MenuPermission;
