/**
 * @ Author: willy
 * @ CreateTime: 2024-06-26 10:40:33
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-09-20 15:04:38
 * @ Description: 个人资料
 */

import { FC } from 'react';
import { createBEM } from '@/utils';
import s from './PersonalInfo.module.scss';

export const PersonalInfo: FC = () => {
  const namespace = 'personal-info';

  return <div className={s[createBEM(namespace)]}>{/*  */}</div>;
};

export default PersonalInfo;
