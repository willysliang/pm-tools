/**
 * @ Author: willysliang
 * @ CreateTime: 2024-09-18 14:49:59
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-09-20 09:31:10
 * @ Description: 拖拽组件
 */

import { DragEventHandler, useEffect, useRef, useState } from 'react';
import { IDragSortProps, IBaseChildrenProps, ICustomElement } from './types';
import { Currency as DragIcon } from '@icon-park/react';
import { FlipList } from './animation';
import { findParent } from './utils';
import s from './index.module.scss';

/** 通用组件 - 拖拽排序组件 */
export function DragSort<T>({
  list,
  ItemRender,
  afterDrag,
  keyName,
  cols = 1,
  marginX = 0,
  flipWithListChange = true,
  className,
  style,
}: IDragSortProps<T>) {
  /** 拖拽时，留在原位置的元素的样式 */
  const movingClass = [s.drag__background];
  /** 拖拽时，留在原位置的子元素的样式 */
  const opacityClass = ['opacity-0'];

  const listRef = useRef<HTMLDivElement>(null);
  /** 记录当前正在拖拽哪个元素 */
  const nowDragItem = useRef<HTMLDivElement>();

  /** 存储flipList动画实例 */
  const flipListRef = useRef<FlipList>();
  /** 是否开启拖拽 （鼠标进入指定区域开启） */
  const [dragOpen, setDragOpen] = useState<boolean>(false);

  /**
   * 动画
   */
  /** 创建记录新的动画记录，并立即记录当前位置 */
  const createNewFlipList = (exceptTarget?: Element) => {
    if (!listRef.current) return;
    // 记录动画(除了指定元素，其他都触发动画)
    const listenChildren = [...listRef.current.children].filter((k) => k !== exceptTarget);
    flipListRef.current = new FlipList(listenChildren, 300);
    flipListRef.current.recordFirst();
  };

  /** 当列表变化时，进行动画 */
  useEffect(() => {
    if (!flipWithListChange) return;
    createNewFlipList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list]);

  /**
   * 拖拽开始
   *  1. 添加拖拽时的样式
   */
  const onDragStart: DragEventHandler<HTMLDivElement> = (e) => {
    if (!listRef.current) return;
    e.stopPropagation(); // 阻止冒泡

    /** 这是当前正在被拖拽的元素 */
    const target = e.target as HTMLDivElement;

    // 设置被拖拽元素“留在原地”的样式。为了防止设置正在拖拽的元素样式，所以用定时器，宏任务更晚执行
    setTimeout(() => {
      target.classList.add(...movingClass); // 设置正被拖动的元素样式
      target.childNodes.forEach((k) => (k as HTMLDivElement).classList?.add(...opacityClass)); // 把子元素都设置为透明，避免影响
    }, 0);

    // 记录元素的位置，用于Flip动画
    createNewFlipList(target);

    // 记录当前拖拽的元素
    nowDragItem.current = target;

    // 设置鼠标样式
    e.dataTransfer.effectAllowed = 'move';
  };

  /**
   * 拖拽进入某个元素
   *  1. 在这里只是DOM变化，数据顺序没有变化
   */
  const onDragEnter: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault(); // 阻止默认行为，默认是不允许元素拖动到人家身上的
    if (!listRef.current || !nowDragItem.current) return;

    /** 孩子数组，每次都会获取最新的 */
    const children = [...listRef.current.children];
    /** 真正会被挪动的元素(当前正悬浮在哪个元素上面) */ // 找到符合条件的父节点
    const realTarget = findParent(e.target as Element, (now) => children.indexOf(now) !== -1);

    /** 边界条件判定 */
    // 拖到自身或者拖到外面
    if (realTarget === listRef.current || realTarget === nowDragItem.current || !realTarget) return;
    // 正在动画的元素，跳过
    if (realTarget.className.includes(FlipList.movingClass)) return;

    // 拿到两个元素的索引，用来判断这俩元素应该怎么移动
    /** 被拖拽元素在孩子数组中的索引（当是光标聚焦子文本并进行拖拽时会为-1） */
    const nowDragtItemIndex = children.indexOf(nowDragItem.current);
    /** 被进入元素在孩子数组中的索引 */
    const enterItemIndex = children.indexOf(realTarget);

    // 当用户选中文字，然后去拖动这个文字时，就会触发 （可以通过禁止选中文字来避免）
    if (enterItemIndex === -1 || nowDragtItemIndex === -1) return;

    // Flip动画 - 记录原始位置
    flipListRef.current?.recordFirst();

    if (nowDragtItemIndex < enterItemIndex) {
      // 向下移动
      listRef.current.insertBefore(nowDragItem.current, realTarget.nextElementSibling);
    } else {
      // 向上移动
      listRef.current.insertBefore(nowDragItem.current, realTarget);
    }

    // Flip动画 - 播放
    flipListRef.current?.play();
  };

  /**
   * 拖拽结束 事件，删除样式
   *  1. 移除拖拽时添加的样式
   *  2. 更新当前的数据列表
   */
  const onDragEnd: DragEventHandler<HTMLDivElement> = (e) => {
    if (!listRef.current) return;
    /** 当前正在被拖拽的元素 */
    const target = e.target as Element;

    target.classList.remove(...movingClass); // 移除拖拽时给拖拽元素添加的样式
    target.childNodes.forEach((k) => (k as Element).classList?.remove(...opacityClass)); // 移除所有子元素的透明样式

    /** 根据设置的 data-target 来列表进行排序，然后回传给外界函数 */
    const ids = [...listRef.current.children].map((k) =>
      String((k as ICustomElement).dataset.target),
    );
    const newList = [...list].sort((a, b) => {
      const aIndex = ids.indexOf(String(a[keyName]));
      const bIndex = ids.indexOf(String(b[keyName]));
      if (aIndex === -1 && bIndex === -1) return 0;
      else if (aIndex === -1) return 1;
      else if (bIndex === -1) return -1;
      else return aIndex - bIndex;
    });

    // 触发父组件传递的回调函数（用于通知父组件更新拖拽后的数据列表）
    afterDrag(newList);

    // 拖拽完成后，再次禁止拖拽
    setDragOpen(false);
  };

  /**
   * 拖拽按钮组件
   * 在鼠标悬浮时可拖拽到指定区域
   */
  const DragBox = ({ className, style, children }: IBaseChildrenProps) => {
    return (
      <div
        style={{ ...style }}
        className={`${'hover:cursor-grabbing'} ${className}`}
        onMouseEnter={() => setDragOpen(true)}
        onMouseLeave={() => setDragOpen(false)}
      >
        {children || <DragIcon size={20} color='#666666' />}
      </div>
    );
  };

  return (
    <div
      // 设置 user-select:none 防止选中子文本进行拖拽
      className={`flex flex-wrap select-none ${className ?? ''}`}
      style={style ?? {}}
      ref={listRef}
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      // 被拖动的对象被拖到其它容器时（因为默认不能拖到其它元素上）
      onDragOver={(e) => e.preventDefault()}
      onDragEnd={onDragEnd}
    >
      {list.map((item, index) => (
        <div
          key={String(item[keyName])}
          data-target={String(item[keyName])}
          style={{
            width: `calc(${100 / cols}% - ${marginX * 2}px)`,
            margin: `4px ${marginX / 2}px`,
          }}
          draggable={dragOpen}
          className='my-1 overflow-hidden'
        >
          {ItemRender({ item, index, DragBox })}
        </div>
      ))}
    </div>
  );
}
export default DragSort;
