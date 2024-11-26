/**
 * @ Author: willysliang
 * @ CreateTime: 2024-11-04 16:39:22
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-11-26 15:01:57
 * @ Description: 添加权限
 */

import { FC, memo } from 'react';
import { Button, Form, Input, message, Select } from 'antd';
import { StatusEnum } from '@/constants/common';
import { addRole } from '@/server/roles';
import { IRolesProps } from '@/server/roles/types';
import { useSelectPermission } from '../../hooks/useSelectPermission';

/**
 * @description 添加权限
 */
export const AddPermission: FC<{ addSucCallback?: () => void }> = memo(({ addSucCallback }) => {
  const { permissionList } = useSelectPermission();

  /** 表单配置信息 */
  const formItemConfig = [
    {
      label: '角色编号',
      name: 'roleCode',
      rules: [{ required: true, message: '请输入角色编号' }],
      element: <Input placeholder='请输入角色编号' />,
    },
    {
      label: '角色名称',
      name: 'roleName',
      rules: [{ required: true, message: '请输入角色名称' }],
      element: <Input placeholder='请输入角色名称' />,
    },
    {
      label: '角色权限',
      name: 'permissionCodes',
      rules: [{ required: true, message: '请选择角色权限' }],
      className: 'min-w-[250px]',
      element: <Select mode='multiple' options={permissionList} placeholder='请选择角色权限' />,
    },
  ];

  const [form] = Form.useForm<IRolesProps>();
  const initialValues = {
    permissionCode: '',
    permissionName: '',
    permissionType: '',
    status: StatusEnum.Enable,
  };
  const handleFinish = async (values: IRolesProps) => {
    const sendParams = { ...values, status: StatusEnum.Enable };
    const { code, msg, error } = await addRole(sendParams);
    if (code) return message.error(`${msg}: ${error}`);
    message.success(msg);
    form.resetFields();
    addSucCallback && addSucCallback();
  };

  return (
    <Form
      layout='inline'
      form={form}
      size='small'
      className='px-1 pt-1'
      initialValues={initialValues}
      onFinish={handleFinish}
    >
      {formItemConfig.map(({ element, ...item }, index) => (
        <Form.Item key={index} {...item}>
          {element}
        </Form.Item>
      ))}
      <Form.Item>
        <Button type='primary' htmlType='submit'>
          添加
        </Button>
      </Form.Item>
    </Form>
  );
});

export default AddPermission;
