/**
 * @ Author: willysliang
 * @ CreateTime: 2024-06-23 11:04:56
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-09-23 16:54:17
 * @ Description: 账号设置
 */

import { AccountInfoForm } from './AccountInfoForm';
import { UpdatePasswordForm } from './UpdatePasswordForm';
import { createBEM } from '@/utils';
import s from './AccountSetting.module.scss';

const AccountSetting = () => {
  const namespace = 'account-setting';

  return (
    <div className={s[createBEM(namespace)]}>
      <div className={s[createBEM('card')]}>
        <div className={s[createBEM('card', 'label')]}>账号信息</div>
        <AccountInfoForm />
      </div>
      <div className={s[createBEM('card')]}>
        <div className={s[createBEM('card', 'label')]}>修改密码</div>
        <UpdatePasswordForm />
      </div>
    </div>
  );
};

export default AccountSetting;
