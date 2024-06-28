/**
 * @ Author: willy
 * @ CreateTime: 2024-06-21 17:39:57
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-06-28 23:32:52
 * @ Description: 通用函数 hooks
 */

import React, { FC } from 'react';
import { createPortal } from 'react-dom';
import { IRouteElement } from '@/router/routes/types';

/** 判断是否为 <></> */
export const isFragment = (element: IRouteElement): boolean => {
  return React.isValidElement(element) && element.type === React.Fragment;
};

interface ICreateModal {
  /** 弹窗的内容 */
  children?: React.ReactNode;
  /** 是否展示弹窗 */
  show?: boolean;
  /** 需要传送到显示的元素节点 */
  to?: HTMLElement;
}

/**
 * 创建 Model
 * @param {ICreateModal['children']} [children] 弹窗组件
 * @param {ICreateModal['to']} [to] 要传送的元素节点
 * @param {ICreateModal['show']} [show] 是否展示弹窗
 * @returns {React.ReactPortal}
 */
export const CreateModal: FC<ICreateModal> = ({
  children = <></>,
  show = true,
  to = document.body,
}) => {
  if (!show) return <></>;

  return createPortal(children, to);
};
