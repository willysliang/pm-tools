/**
 * @ Author: willysliang
 * @ CreateTime: 2024-09-27 11:44:46
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-09-30 14:58:47
 * @ Description: 大屏模块
 */

import { FC, memo } from 'react';
import { Outlet } from 'react-router-dom';

/** 大屏模块 */
export const LargeScreen: FC = memo(() => {
  return (
    <div className='w-full h-full'>
      <Outlet />
    </div>
  );
});

export default LargeScreen;
