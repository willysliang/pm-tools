/**
 * @ Author: willysliang
 * @ CreateTime: 2024-09-06 11:32:45
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-09-20 14:18:13
 * @ Description: 测试模块
 */

import { FC } from 'react';
import { DialogDemo } from '@comp/dialog/demo';
import { DragSortDemo } from '@comp/common/drag-sort/demo';

const Test: FC = () => {
  return (
    <div className='ui-test'>
      <DialogDemo />
      <DragSortDemo />
    </div>
  );
};

export default Test;
