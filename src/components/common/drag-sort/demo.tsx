/**
 * @ Author: willysliang
 * @ CreateTime: 2024-09-20 09:13:06
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-09-20 09:35:56
 * @ Description: 拖拽排序的使用示例
 */

import { FC, memo, useRef, useState } from 'react';
import { Button, InputNumber } from 'antd';
import DragSort from './index.tsx';

/** 示例组件 - 拖拽排序组件示例 */
export const DragSortDemo: FC = () => {
  interface IItem {
    id: string;
  }

  /** 当前列表 */
  const [list, setList] = useState<IItem[]>([
    { id: `0---${Date.now() + 1}` },
    { id: `1---${Date.now() + 9}` },
  ]);
  /** 每行个数 */
  const [cols, setCols] = useState(2);

  /**创建一个新的元素 */
  const createNewItem = () => {
    const uid = Date.now();
    setList((old) =>
      old.concat([
        {
          id: `${list.length}---${uid}`,
        },
      ]),
    );
  };

  const renderCount = useRef(0);
  // 更新渲染计数
  renderCount.current += 1;

  return (
    <div className='p-2 w-full h-full'>
      <Button type='primary' onClick={createNewItem}>
        点我添加
      </Button>
      &nbsp; &nbsp; 渲染次数: {renderCount.current}&nbsp; 一行个数：
      <InputNumber value={cols} min={1} onChange={(v) => setCols(v!)} />
      <DragSort
        list={list}
        keyName={'id'}
        className='w-full flex flex-wrap'
        cols={cols}
        marginX={10}
        afterDrag={(list) => setList(list)}
        ItemRender={({ item, index, DragBox }) => {
          return (
            <div className='h-full flex items-center border rounded-sm p-2 gap-1 bg-white'>
              <DragBox className='w-full'>
                <div>序号：{index}</div>
                <div>ID:{item.id}</div>
              </DragBox>
            </div>
          );
        }}
      />
    </div>
  );
};

export default memo(DragSortDemo);
