/**
 * @ Author: willy
 * @ CreateTime: 2024-06-26 10:40:33
 * @ Modifier: willy
 * @ ModifierTime: 2024-06-26 16:51:55
 * @ Description: 个人资料
 */

import { FC } from 'react';
import s from './PersonalInfo.module.scss';
import { createBEM } from '@/utils';

export const PersonalInfo: FC = () => {
  const namespace = 'personal-info';

  return <div className={s[createBEM(namespace)]}>{/*  */}</div>;
};

export default PersonalInfo;
