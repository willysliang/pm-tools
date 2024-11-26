/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-25 17:46:14
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-11-26 09:33:51
 * @ Description: 菜单权限管理
 */

import { FC, memo, useEffect, useMemo, useRef, useState } from 'react';
import {
  Form,
  Input,
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
import EditableCell from './components/editable-cell';
import AddPermission from './components/add-permission';
import { deletePermission, getPermissions, updatePermission } from '@/server/permissions';
import { IPermissionsProps } from '@/server/permissions/types';
import { StatusEnum, StatusMap } from '@/constants/common';

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
    width: 120,
    render: (id) => String(id).padStart(6, '0'),
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
      message.error(res.msg as any);
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

  /**
   * 搜索
   */
  const handleSearch = (val: string) => {
    searchValue.current = val;
    getList(1, pageSize);
  };

  /**
   * 删除
   */
  const handleDelete = async (record: IPermissionsProps, id: IPermissionsProps['id']) => {
    const { code, msg } = await deletePermission(record, id);
    if (code) return message.error(msg);
    message.success(msg);
    getList(1);
  };

  /**
   * 编辑行
   */
  /** 编辑行的表单数据 */
  const [form] = Form.useForm<IPermissionsProps>();
  /** 记录编辑的行 */
  const [editingKey, setEditingKey] = useState<number>(-1);
  /** 判断是否在编辑 */
  const isEditing = (record: IPermissionsProps) => record.id === editingKey;

  /** 触发编辑 */
  const handleEdit = (record: Partial<IPermissionsProps>) => {
    form.setFieldsValue({
      permissionCode: '',
      permissionName: '',
      permissionType: '其他',
      status: StatusEnum.Enable,
      ...record,
    });
    setEditingKey(record.id!);
  };

  /** 取消编辑 */
  const handleCancelEdit = () => {
    setEditingKey(-1);
  };

  /**
   * @function handleUpdate 更新所选项权限的数据
   * @param id 权限id
   */
  const handleUpdate = async (id: number) => {
    try {
      const row = await form.validateFields();
      const newData = [...permissions];
      const index = newData.findIndex((item) => id === item.id);
      if (index > -1) {
        const updateItem = {
          ...newData[index],
          ...row,
        };
        const { code, msg } = await updatePermission(updateItem);
        if (code) return message.error(msg);
        newData.splice(index, 1, updateItem);
        setPermissions(newData);
        setEditingKey(-1);
        message.success(msg);
      } else {
        message.error('没有查询到相应行数据');
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
              <Popconfirm
                title='确定保存?'
                okType='danger'
                okText='确认'
                cancelText='取消'
                cancelButtonProps={{
                  size: 'small',
                }}
                okButtonProps={{
                  size: 'small',
                }}
                onConfirm={() => handleUpdate(record.id!)}
              >
                <Typography.Link type='success'>保存</Typography.Link>
              </Popconfirm>
              <Typography.Link
                type='secondary'
                style={{ marginInlineStart: 8 }}
                onClick={handleCancelEdit}
              >
                取消
              </Typography.Link>
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
                title='确认删除该权限?'
                description='权限删除后不可恢复，删除后会从对应页面中删除'
                okType='danger'
                okText='确认'
                cancelText='取消'
                cancelButtonProps={{
                  size: 'small',
                }}
                okButtonProps={{
                  size: 'small',
                }}
                onConfirm={() => handleDelete(record, record.id)}
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

  /** 合并列，增加可编辑行 */
  const mergeColumns = columns.map((col: any) => {
    if (['id', 'action'].includes(col.dataIndex)) return col;

    return {
      ...col,
      onCell: (record: IPermissionsProps) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <div className='w-full h-full flex flex-col'>
      <AddPermission addSucCallback={getList} />
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
