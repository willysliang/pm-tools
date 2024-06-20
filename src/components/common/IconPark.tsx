/**
 * @ Author: willysliang
 * @ Create Time: 2023-03-22 11:00:40
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-24 12:49:01
 * @ Description: IconPark 图标
 */

import { ReactElement } from 'react';
import { Icon } from '@icon-park/react/lib/runtime';

interface IIconPark {
  /** icon-park 图标 */
  icon: Icon;
  /** 图标风格：线性、填充、双色、多色 */
  theme?: 'outline' | 'filled' | 'two-tone' | 'multi-color';
  /** 图标大小 */
  size?: number | string;
  spin?: boolean;
  /** 图标填充的颜色 */
  fill?: string | string[];
  /** 端点类型 */
  strokeLinecap?: 'butt' | 'round' | 'square';
  /** 拐点类型 */
  strokeLinejoin?: 'miter' | 'round' | 'bevel';
  /** 线段粗细 */
  strokeWidth?: number;

  /** 事件 */
  onClick?: () => void;

  [key: string]: unknown;
}

export const IconPark = ({ icon: Icon, ...props }: IIconPark): ReactElement => {
  return <Icon {...props} />;
};

export default IconPark;
