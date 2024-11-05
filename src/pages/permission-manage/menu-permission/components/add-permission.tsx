/**
 * @ Author: willysliang
 * @ CreateTime: 2024-11-04 16:39:22
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-11-05 10:08:02
 * @ Description: 添加权限
 */

import { FC, memo } from 'react';
import { Button, Form, Input, message } from 'antd';
import { StatusEnum } from '@/constants/common';
import { addPermission } from '@/server/permissions';
import { IPermissionsProps } from '@/server/permissions/types';

/**
 * @description 添加权限
 */
export const AddPermission: FC<{ addSucCallback?: () => void }> = memo(({ addSucCallback }) => {
  const formItemConfig = [
    {
      label: '代码编号',
      name: 'permissionCode',
      placeholder: '请输入代码编号',
      rules: [{ required: true, message: '请输入代码编号' }],
    },
    {
      label: '权限名称',
      name: 'permissionName',
      placeholder: '请输入权限名称',
      rules: [{ required: true, message: '请输入权限名称' }],
    },
    {
      label: '权限类型',
      name: 'permissionType',
      placeholder: '请输入权限类型',
      rules: [{ required: true, message: '请输入权限类型' }],
    },
  ];

  const [form] = Form.useForm<IPermissionsProps>();
  const initialValues = {
    permissionCode: '',
    permissionName: '',
    permissionType: '',
    status: StatusEnum.Enable,
  };
  const handleFinish = async (values: IPermissionsProps) => {
    const sendParams = { ...values, status: StatusEnum.Enable };
    const { code, msg, error } = await addPermission(sendParams);
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
      {formItemConfig.map(({ placeholder, ...item }, index) => (
        <Form.Item key={index} {...item}>
          <Input placeholder={placeholder} />
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
