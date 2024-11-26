/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-25 17:46:14
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-11-26 11:40:17
 * @ Description: 角色权限管理
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
import AddRole from './components/add-role';
import iconRoleAdmin from '@assets/business/permission/icon-role-admin.png';
import iconRoleOrdinary from '@assets/business/permission/icon-role-ordinary.png';
import iconRoleReadonly from '@assets/business/permission/icon-role-readonly.png';
import { StatusEnum, StatusMap } from '@/constants/common';
import { IRolesProps, RoleCodeEnum } from '@/server/roles/types';
import { deleteRole, getRoles, updateRole } from '@/server/roles';

/**
 * 默认角色 icon
 */
const iconRoleMap: Record<string, string> = {
  [RoleCodeEnum.Admin]: iconRoleAdmin,
  [RoleCodeEnum.User]: iconRoleOrdinary,
  [RoleCodeEnum.ReadonlyUser]: iconRoleReadonly,
};

/**
 * 表格配置
 */
const defaultColumns: TableProps<IRolesProps>['columns'] = [
  {
    title: '角色',
    dataIndex: 'roleName',
    key: 'roleName',
    ellipsis: {
      showTitle: false,
    },
    render: (roleName, { roleCode }) => (
      <Tooltip placement='topLeft' title={`${roleCode} -:- ${roleName}`}>
        <div className='inline-flex items-center'>
          {iconRoleMap[roleCode] && <img src={iconRoleMap[roleCode]} className='h-4 mr-2' />}
          <span>{roleName}</span>
        </div>
      </Tooltip>
    ),
  },
  {
    title: '编号',
    dataIndex: 'roleCode',
    key: 'roleCode',
    ellipsis: {
      showTitle: false,
    },
  },
  {
    title: '权限',
    dataIndex: 'permissionCodes',
    key: 'permissionCodes',
    ellipsis: {
      showTitle: false,
    },
    render: (permissionCodes) => <span>{permissionCodes.length}&nbsp;项权限</span>,
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
 * @description 角色权限管理
 */
export const RoleRole: FC = memo(() => {
  const [roles, setRoles] = useState<IRolesProps[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(15);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const searchValue = useRef<string>('');
  const [searchLoading, setSearchLoading] = useState<boolean>(false);

  /** 获取数据 */
  const getList = async (newPage: number = currentPage, newPageSize: number = pageSize) => {
    setSearchLoading(true);
    const res = await getRoles(searchValue.current, newPage, newPageSize);
    if (res.code) {
      message.error(res.msg as any);
      setSearchLoading(false);
      return;
    }
    setRoles(res.roles);
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
  const handleDelete = async (record: IRolesProps, id: IRolesProps['id']) => {
    const { code, msg } = await deleteRole(record, id);
    if (code) return message.error(msg);
    message.success(msg);
    getList(1);
  };

  /**
   * 编辑行
   */
  /** 编辑行的表单数据 */
  const [form] = Form.useForm<IRolesProps>();
  /** 记录编辑的行 */
  const [editingKey, setEditingKey] = useState<number>(-1);
  /** 判断是否在编辑 */
  const isEditing = (record: IRolesProps) => record.id === editingKey;

  /** 触发编辑 */
  const handleEdit = (record: Partial<IRolesProps>) => {
    form.setFieldsValue({
      roleCode: '',
      roleName: '',
      permissionCodes: [],
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
      const newData = [...roles];
      const index = newData.findIndex((item) => id === item.id);
      if (index > -1) {
        const updateItem = {
          ...newData[index],
          ...row,
        };
        const { code, msg } = await updateRole(updateItem);
        if (code) return message.error(msg);
        newData.splice(index, 1, updateItem);
        setRoles(newData);
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
  const columns: TableProps<IRolesProps>['columns'] = useMemo(
    () => [
      ...defaultColumns,
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: 120,
        align: 'center',
        fixed: 'right',
        render: (_, record: IRolesProps) => {
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
                title='确认删除该角色吗?'
                description='角色删除后不可恢复，相应角色分配将会重归默认值'
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
      onCell: (record: IRolesProps) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <div className='w-full h-full flex flex-col'>
      <AddRole addSucCallback={getList} />
      <Input.Search
        placeholder='搜索编号和名称'
        loading={searchLoading}
        className='p-1'
        onSearch={handleSearch}
      />

      <div className='flex-1 mb-2 overflow-hidden'>
        <Form form={form} component={false}>
          <Table<IRolesProps>
            className='w-full h-full overflow-auto not-scrollbar'
            components={{
              body: { cell: EditableCell },
            }}
            columns={mergeColumns}
            dataSource={roles}
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
export default RoleRole;
