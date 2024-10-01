/**
 * @ Author: willysliang
 * @ CreateTime: 2024-09-28 17:00:59
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-09-29 16:23:15
 * @ Description: loading 状态
 */

import { useRef } from 'react';

/** loading 态 */
export const useLoading = (defaultValue = false, delay = 0) => {
  const loading = useRef<boolean>(defaultValue);

  let timer = 0;

  const openLoading = () => {
    loading.current = true;
    timer = window.setTimeout(() => {
      timer = new Date().getTime();
    });
  };

  const closeLoading = () => {
    const now = new Date().getTime();
    const diff = now - timer;
    if (diff < delay)
      return setTimeout(() => {
        loading.current = false;
      }, delay - diff);
  };

  return {
    loading,
    openLoading,
    closeLoading,
  };
};
