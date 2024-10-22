/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-09 10:53:10
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-20 03:01:40
 * @ Description: wisdom-tourism - 智慧旅游
 */

import { createContext, FC, memo, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import WisdomTourismHeader from './components/wisdom-tourism-header';
import { CreateScaleContainer } from './components/base-scale-container';
import { createBEM, formatDate } from '@/utils';
import s from './index.module.scss';

export const WisdomTourismContext = createContext<{ selectRangeDate: string[] }>({
  selectRangeDate: [],
});

/**
 * @description 智慧旅游
 */
const WisdomTourism: FC<{ scale: number }> = memo(({ scale = 1 }) => {
  const NAMESPACE = 'wisdom-tourism';

  /** 获取时间间隔里面的日期 */
  const getRangeDate = () => {
    const result = [];

    // 获取今天前后7天日期
    for (let i = 0; i < 7; i++) {
      const today = new Date();

      // 今天及之前
      const daysAgo = new Date().getTime() - 1000 * 60 * 60 * 24 * i;
      today.setTime(daysAgo);
      result.unshift(formatDate(today, 'YYYY.MM.DD'));

      // 今天之后
      const daysLater = new Date().getTime() + 1000 * 60 * 60 * 24 * (i + 1);
      today.setTime(daysLater);
      result.push(formatDate(today, 'YYYY.MM.DD'));
    }
    return result;
  };

  /** 选择的时间范围 */
  const selectRangeDate = getRangeDate();

  return (
    <div
      className={s[createBEM(NAMESPACE)]}
      style={{ transform: `translateX(-50%) scale(${scale})` }}
    >
      <WisdomTourismHeader />
      <div className={s[createBEM(NAMESPACE, 'main')]}>
        <WisdomTourismContext.Provider value={{ selectRangeDate }}>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </WisdomTourismContext.Provider>
      </div>
    </div>
  );
});

export default memo(() => <>{CreateScaleContainer(WisdomTourism)}</>);
