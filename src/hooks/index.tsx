/**
 * @ Author: willy
 * @ CreateTime: 2024-06-21 17:39:57
 * @ Modifier: willy
 * @ ModifierTime: 2024-06-21 17:40:49
 * @ Description: 通用函数 hooks
 */

import React from 'react';
import { IRouteElement } from '@/router/routes/types';

/** 判断是否为 <></> */
export const isFragment = (element: IRouteElement): boolean => {
  return React.isValidElement(element) && element.type === React.Fragment;
};
