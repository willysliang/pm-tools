/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-09 17:33:26
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-10 17:47:20
 * @ Description: 智慧旅游 - 主体
 */

import { FC, memo } from 'react';
import RealTimeAccessChart from '../real-time-access-chart';
import { createBEM } from '@/utils';
import s from '../../index.module.scss';

/**
 * @description 智慧旅游 - 主体
 */
export const WisdomTourismMain: FC = memo(() => {
  const NAMESPACE = 'wisdom-tourism-main';

  return (
    <div className={s[createBEM(NAMESPACE)]}>
      <RealTimeAccessChart actualTotal={216908} />
    </div>
  );
});

export default WisdomTourismMain;
