/**
 * @ Author: willy
 * @ CreateTime: 2024-06-21 17:39:57
 * @ Modifier: willy
 * @ ModifierTime: 2024-06-26 10:38:10
 * @ Description: 通用函数 hooks
 */

import ReactDOM from 'react-dom';
import React, { FC } from 'react';
import { IRouteElement } from '@/router/routes/types';

/** 判断是否为 <></> */
export const isFragment = (element: IRouteElement): boolean => {
  return React.isValidElement(element) && element.type === React.Fragment;
};

/**
 * 创建 Model
 * @param {React.ReactNode} [children] 弹窗组件
 * @param {HTMLElement} [to] 要传送的元素节点
 * @returns {React.ReactPortal}
 */
export const CreateModal: FC<{ children?: React.ReactNode; to?: HTMLElement }> = ({
  children,
  to = document.body,
}) => {
  return ReactDOM.createPortal(children, to);
};
