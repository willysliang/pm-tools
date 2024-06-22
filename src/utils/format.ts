/**
 * @ Author: willysliang
 * @ CreateTime: 2024-06-22 16:13:05
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-06-22 16:13:12
 * @ Description: 格式化
 */

/**
 * @description 中文裁字
 * @param {string} str
 * @param {number} n
 * @param {number|string} format
 * @returns {string} 裁切后的字符串
 *
 * @test cutCNLetter('超六个字溢出', 6) // 超六个字溢出
 * @test cutCNLetter('超六个字溢出了', 6) // 超六个字溢出...
 */
export const cutCNLetter = (str: string, n: number = 10, format: number | string = '...') => {
  // eslint-disable-next-line no-control-regex
  const r = /[^\x00-\xff]/g;
  const m = Math.floor(n);
  let curr, last;
  str = '' + str;
  if (str.replace(r, 'mm').length <= n) {
    return str;
  }
  for (let i = m; i < str.length; i++) {
    curr = str.substr(0, i);
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    last = last || curr;
    if (curr.replace(r, 'mm').length > n) {
      return last + format;
    } else {
      last = curr;
    }
  }
  return str;
};
