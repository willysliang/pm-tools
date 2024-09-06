/**
 * @ Author: willysliang
 * @ CreateTime: 2024-09-06 10:11:46
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-09-06 10:12:21
 * @ Description: format 相关的测试方法 - 期望值
 */

import { createBEM } from '../format';

/** 
 * @function __test_createBem 测试 createBEM 
 *
 * 期望结果：
  [
    "",
    "block",
    "block",
    "block__element",
    "block__element",
    "block__element block__element--modify-str-single",
    "block__element",
    "block__element block__element--modify-arr-single",
    "block__element block__element--modify-arr-mul-1 block__element--modify-arr-mul-2"
  ]
 */
export const __test_createBem = () => {
  const testList: Parameters<typeof createBEM>[] = [
    [''],
    ['block'],
    ['block', ''],
    ['block', 'element'],
    ['block', 'element', ''],
    ['block', 'element', 'modify-str-single'],
    ['block', 'element', []],
    ['block', 'element', ['modify-arr-single']],
    ['block', 'element', ['modify-arr-mul-1', 'modify-arr-mul-2']],
  ];
  // eslint-disable-next-line prefer-spread
  return testList.map((test) => createBEM.apply(null, test));
};
__test_createBem();
