/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-09 10:53:10
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-14 17:39:26
 * @ Description: wisdom-tourism - 智慧旅游
 */

import { FC, memo } from 'react';
import WisdomTourismHeader from './components/wisdom-tourism-header';
import WisdomTourismMain from './components/wisdom-tourism-main';
import { createBEM } from '@/utils';
import s from './index.module.scss';
import { CreateScaleContainer } from './components/base-scale-container';

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
      <WisdomTourismMain />
    </div>
  );
});

export default memo(() => <>{CreateScaleContainer(WisdomTourism)}</>);
