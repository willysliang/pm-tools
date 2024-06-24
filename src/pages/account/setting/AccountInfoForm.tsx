/**
 * @ Author: willy
 * @ CreateTime: 2024-06-24 20:11:42
 * @ Modifier: willy
 * @ ModifierTime: 2024-06-24 20:54:30
 * @ Description: 账号信息表单
 */

import { FC } from 'react';
import { Button, Form, Input, Space, message } from 'antd';
import type { Rule, FormProps } from 'antd/es/form';
import { useUserStore, IUserInfo } from '@/store/user';

export const AccountInfoForm: FC = () => {
  interface IFormConfig {
    label: string;
    name: keyof IUserInfo;
    rules: Rule[];
    placeholder: string;
    btnText: string;
  }

  const [accountInfoForm] = Form.useForm();
  const { userInfo, setUserInfo } = useUserStore();

  /** 初始化信息 */
  const initialValues: Record<string, unknown> = {
    username: '',
    email: '',
    phone: '',
  };

  /** 表单配置 */
  const accountInfoFormConfig: IFormConfig[] = [
    {
      label: '用户名',
      name: 'username',
      rules: [{ required: true, message: 'Please input your username!' }],
      placeholder: '输入新的用户名',
      btnText: '修改',
    },
    {
      label: '邮箱',
      name: 'email',
      rules: [{ required: true, message: 'Please input your email!' }],
      placeholder: '输入新的邮箱',
      btnText: '重新绑定',
    },
    {
      label: '手机号',
      name: 'phone',
      rules: [{ required: true, message: 'Please input your phone!' }],
      placeholder: '输入新的手机号',
      btnText: '修改',
    },
  ];

  /** 提示消息 */
  const [messageApi, contextHolder] = message.useMessage();

  /** 更新单个信息 */
  const onUpdateField = (field: string) => {
    const getFieldError = accountInfoForm.getFieldError(field);
    if (getFieldError.length) return;
    setUserInfo({
      [field]: accountInfoForm.getFieldValue(field),
    });
    accountInfoForm.setFieldValue(field, initialValues[field]);
    messageApi.open({
      type: 'success',
      content: '更新信息成功',
    });
  };

  /** 提交成功 */
  const onFinish: FormProps['onFinish'] = (values) => {
    setUserInfo(values);
    accountInfoForm.resetFields();
    messageApi.open({
      type: 'success',
      content: '保存信息成功',
    });
  };

  /** 提交失败 */
  const onFinishFailed: FormProps['onFinishFailed'] = (errorInfo) => {
    messageApi.open({
      type: 'error',
      content: errorInfo.errorFields[0].errors[0],
    });
  };

  return (
    <>
      {contextHolder}
      <Form
        name='accountInfo'
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        style={{ maxWidth: '100%' }}
        initialValues={initialValues}
        form={accountInfoForm}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        {accountInfoFormConfig.map((item, index) => (
          <Form.Item key={index} label={item.label}>
            <Space className='block'>
              <div className='block w-full mb-2 h-8 leading-8'>{userInfo[item.name]}</div>
              <div className='flex justify-between w-full'>
                <Form.Item noStyle name={item.name} rules={item.rules}>
                  <Input placeholder={item.placeholder} />
                </Form.Item>
                <Button
                  type='primary'
                  className='w-28 ml-4'
                  onClick={() => onUpdateField(item.name)}
                >
                  {item.btnText}
                </Button>
              </div>
            </Space>
          </Form.Item>
        ))}
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit'>
            保存
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AccountInfoForm;
