/**
 * @ Author: willy
 * @ CreateTime: 2024-06-24 20:53:58
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-07-11 18:35:15
 * @ Description: 更新密码表单
 */

import { Button, Form, Input, message, Space } from 'antd';
import type { Rule, FormProps } from 'antd/es/form';
import { useUserStore } from '@/store/user';

/** 更新密码表单 */
export const UpdatePasswordForm = () => {
  interface IFormConfig {
    label: string;
    name: string;
    rules: Rule[];
    placeholder: string;
    autoComplete: 'current-password' | 'new-password' | 'new-password-confirm';
  }

  const [accountInfoForm] = Form.useForm();
  const { userInfo, setUserInfo } = useUserStore();

  /** 初始化信息 */
  const initialValues = {
    oldPassword: '',
    password: '',
    confirmPassword: '',
  } as const;

  /** 表单配置 */
  const accountInfoFormConfig: IFormConfig[] = [
    {
      label: '旧密码',
      name: 'oldPassword',
      rules: [{ required: true, message: '请输入旧密码!' }],
      placeholder: '输入旧密码',
      autoComplete: 'current-password',
    },
    {
      label: '新密码',
      name: 'password',
      rules: [{ required: true, message: '请输入新密码!' }],
      placeholder: '输入新密码',
      autoComplete: 'new-password',
    },
    {
      label: '确认新密码',
      name: 'confirmPassword',
      rules: [{ required: true, message: '请再次输入新密码!' }],
      placeholder: '再次输入新密码',
      autoComplete: 'new-password',
    },
  ];

  /** 提示消息 */
  const [messageApi, contextHolder] = message.useMessage();

  /** 提交成功 */
  const onFinish: FormProps['onFinish'] = (values) => {
    const { oldPassword, password, confirmPassword } = values;
    const errorMsg = {
      1: '旧密码错误',
      2: '新密码与旧密码相同',
      3: '新密码与确认密码不一致',
    };
    let code = 0;
    if (oldPassword === userInfo.password) code = 1;
    else if (oldPassword === password) code = 2;
    else if (password !== confirmPassword) code = 3;
    if (code) {
      messageApi.open({
        type: 'error',
        content: errorMsg?.[code as keyof typeof errorMsg] ?? '未知错误',
      });
      return;
    }
    setUserInfo({ password });
    accountInfoForm.resetFields();
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
        name='updatePassword'
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        style={{ maxWidth: '100%' }}
        initialValues={initialValues}
        form={accountInfoForm}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Form.Item className='hidden'>
          <input
            type='text'
            name='username'
            autoComplete='username'
            value={userInfo.username}
            readOnly
          />
        </Form.Item>
        {accountInfoFormConfig.map(({ placeholder, autoComplete, label, ...formProps }, index) => (
          <Form.Item key={index} label={label}>
            <Space className='block'>
              <div className='flex justify-between w-full'>
                <Form.Item key={index} noStyle {...formProps}>
                  <Input.Password
                    placeholder={placeholder}
                    className='max-w-sm'
                    autoComplete={autoComplete}
                  />
                </Form.Item>
              </div>
            </Space>
          </Form.Item>
        ))}
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit'>
            确定
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default UpdatePasswordForm;
