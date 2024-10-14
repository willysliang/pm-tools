/**
 * @ Author: willysliang
 * @ CreateTime: 2024-09-20 09:18:04
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-14 14:12:03
 * @ Description: 拖拽组件使用的工具方法
 */

/** 查找符合条件的父节点
 * @param node 当前节点。如果当前节点就符合条件，就会返回当前节点
 * @param target 参数是当前找到的节点，返回一个布尔值，为true代表找到想要的父节点
 * @returns 没找到则返回null，找到了返回Element
 */
export const findParent = (node: Element, target: (nowNode: Element) => boolean) => {
  while (node && !target(node)) {
    if (node.parentElement) {
      node = node.parentElement as Element;
    } else {
      return null;
    }
  }
  return node;
};
