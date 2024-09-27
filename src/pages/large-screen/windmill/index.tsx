/**
 * @ Author: willysliang
 * @ CreateTime: 2024-09-27 11:45:17
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-09-27 14:14:05
 * @ Description: 大风车模块
 */

import { FC, memo } from 'react';
import { createBEM } from '@/utils';

/** 大风车模块 */
export const WindMill: FC = memo(() => {
  const NAMESPACE = 'windmill';
  return <div className={createBEM(NAMESPACE)}>的大胆bbb</div>;
});

export default WindMill;
