/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-09 10:53:10
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-15 08:59:01
 * @ Description: wisdom-tourism - 智慧旅游
 */

import { FC, memo, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import WisdomTourismHeader from './components/wisdom-tourism-header';
import { CreateScaleContainer } from './components/base-scale-container';
import { createBEM } from '@/utils';
import s from './index.module.scss';

/**
 * @description 智慧旅游
 */
const WisdomTourism: FC<{ scale: number }> = memo(({ scale = 1 }) => {
  const NAMESPACE = 'wisdom-tourism';

  return (
    <div
      className={s[createBEM(NAMESPACE)]}
      style={{ transform: `translateX(-50%) scale(${scale})` }}
    >
      <WisdomTourismHeader />
      <div className={s[createBEM(NAMESPACE, 'main')]}>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
});

export default memo(() => <>{CreateScaleContainer(WisdomTourism)}</>);
