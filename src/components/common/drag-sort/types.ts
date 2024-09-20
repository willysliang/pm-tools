/**
 * @ Author: willysliang
 * @ CreateTime: 2024-09-18 11:22:46
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-09-20 08:43:16
 * @ Description: 拖拽组件的类型声明
 */

import { CSSProperties, ReactNode } from 'react';

/** 基础组件 */
export interface IBaseChildrenProps {
  /** 组件最外层的className */
  className?: string;
  /** 组件最外层的style */
  style?: CSSProperties;
  /** 子组件 */
  children?: ReactNode;
}

/** ItemRender渲染函数的参数 */
export interface IItemProps<T> {
  /** 当前元素 */
  item: T;
  /** 当前索引 */
  index: number;
  /** 可拖拽的盒子，只有在这上面才能拖拽。自由放置位置。提供了一个默认的拖拽图标。可以作为包围盒，将某块内容作为拖拽区域 */
  DragBox: (props: IBaseChildrenProps) => ReactNode;
}

/**拖拽排序组件的props */
export interface IDragSortProps<T> {
  /** 组件最外层的className */
  className?: string;
  /** 组件最外层的style */
  style?: CSSProperties;
  /** 列表，拖拽后会改变里面的顺序 */
  list: T[];
  /** 用作唯一key，在list的元素中的属性名，比如id。必须传递 */
  keyName: keyof T;
  /** 一行个数，默认1 */
  cols?: number;
  /** 元素间距，单位px，默认0 (因为一行默认1) */
  marginX?: number;
  /** 当列表长度变化时，是否需要Flip动画，默认开启 (可能有点略微的动画bug) */
  flipWithListChange?: boolean;
  /** 每个元素的渲染函数 */
  ItemRender: (props: IItemProps<T>) => ReactNode;
  /** 拖拽结束事件，返回排序好的新数组，在里面自己调用setList */
  afterDrag: (list: T[]) => unknown;
}

/** 自定义的元素节点 */
export interface ICustomElement extends Element {
  dataset: DOMStringMap;
}
