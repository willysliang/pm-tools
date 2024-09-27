/**
 * @ Author: willysliang
 * @ CreateTime: 2024-09-27 11:44:46
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-09-27 15:45:01
 * @ Description: 大屏模块
 */

import { FC } from 'react';
import { Outlet } from 'react-router-dom';

/** 大屏模块 */
export const LargeScreen: FC = () => {
  return (
    <div className='w-full h-full'>
      <Outlet />
    </div>
  );
};

export default LargeScreen;
