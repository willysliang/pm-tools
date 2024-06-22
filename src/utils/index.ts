/**
 * @ Author: willy
 * @ CreateTime: 2024-06-21 15:28:34
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-06-22 19:35:38
 * @ Description: 工具类入口
 */

export * from './cache';
export * from './format';

/**
 * @method createBEM - 创建 BEM 类名
 * @param {string} block - 块
 * @param {string} [element] - 元素
 * @param {string | string[]} [modifys] - 修饰符
 * @returns {string}
 */
export const createBEM = (block: string, element: string = '', modifys: string | string[] = '') => {
  let bemStr = block;
  if (!element) return bemStr;
  bemStr += `__${element}`;
  if (Array.isArray(modifys)) {
    if (!modifys.length) return bemStr;
    const bemStrs: string[] = [];
    modifys.forEach((modify) => {
      bemStrs.push(`${bemStr}--${modify}`);
    });
    return bemStrs.join(' ');
  } else {
    if (!modifys) return bemStr;
    return `${bemStr}--${modifys}`;
  }
};
