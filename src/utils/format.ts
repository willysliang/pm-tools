/**
 * @ Author: willysliang
 * @ CreateTime: 2024-06-22 16:13:05
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-09-23 17:40:16
 * @ Description: 格式化
 */

/**
 * @method createBEM - 创建 BEM 类名
 * @param {string} block - 块
 * @param {string} [element] - 元素
 * @param {string | string[]} [modifys] - 修饰符
 * @param {any} [style] - 导入的 css 样式文件模块
 * @returns {string | string[]}
 *
 * @description
 *  问题1: 如果传入多个 modifys，则按理会返回一个数组，但是因为 CSS module 只能引入单个类名
 *      - 如 createBEM('block', 'element', 'modify') 会返回 block__element block__element--modify
 *        但 import s from 'style.module.scss' 后，s[createBEM('block', 'element', 'modify')] 则不能正确找到样式
 *        因而需要做额外处理: getBEM().split(' ').map((bem) => style[bem.trim()]).join(' ')
 *
 */
export const createBEM = (
  block: string,
  element: string = '',
  modifys: string | string[] = '',
  style?: any,
): string => {
  const getBEM = () => {
    let bemStr = block;

    if (element === '' && modifys === '') return block;
    if (element !== '') bemStr += `__${element}`;
    if (modifys === '') return bemStr;

    if (Array.isArray(modifys)) {
      if (!modifys.length) return bemStr;
      const bemStrs: string[] = [bemStr];
      modifys.forEach((modify) => {
        bemStrs.push(`${bemStr}--${modify}`);
      });
      return bemStrs.join(' ');
    }
    return `${bemStr} ${bemStr}--${modifys}`;
  };

  if (!style) return getBEM();

  /** 对传入 modify，并使用 CSS module 时做额外处理 */
  const bems = getBEM().split(' ');
  return bems.map((bem) => style[bem.trim()]).join(' ');
};

/**
 * @description 时间日期格式化
 * @param {Date | string} timestamp 时间戳
 * @param {string} formatRegTxt 时间格式化正则
 * @returns {string} 格式化后的时间字符串
 */
export const formatDate = (
  timestamp: Date | string = new Date(),
  formatRegTxt = 'YYYY-MM-DD hh:mm:ss',
) => {
  /** 边界判断，非时间则直接返回 */
  const typeIsDate = timestamp instanceof Date;
  if (!typeIsDate) return timestamp;

  /** 长度未满，前面补零 */
  const padZero = (txt: number | string = '', num = 2, pad = '0'): string => {
    return String(txt).padStart(num, pad);
  };

  /** 时间转化 */
  const date = new Date(timestamp);
  const year = date.getFullYear().toString();
  const month = padZero(date.getMonth() + 1);
  const day = padZero(date.getDate());
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  const seconds = padZero(date.getSeconds());

  /** 时间转化的 map 表 */
  const formatRegMap: Record<string, string> = {
    'Y+': year,
    'M+': month,
    'D+': day,
    'h+': hours,
    'm+': minutes,
    's+': seconds,
  };

  /** 根据提供的格式化字符串来进行替换内容 */
  for (const k in formatRegMap) {
    if (new RegExp(k).test(formatRegTxt)) {
      formatRegTxt = formatRegTxt.replace(new RegExp(k), formatRegMap[k]);
    }
  }

  /** 周转换 */
  const weeks = ['\u65e5', '\u4e00', '\u4e8c', '\u4e09', '\u56db', '\u4e94', '\u516d'];
  if (/(E+)/.test(formatRegTxt)) {
    formatRegTxt = formatRegTxt.replace(RegExp.$1, weeks[date.getDay()]);
  }
  return formatRegTxt;
};

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
