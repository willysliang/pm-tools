/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-29 18:19:44
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-30 11:06:18
 * @ Description: 通用类
 */

/**
 * 状态类别
 */
/** 枚举 - 标签颜色 */
export enum TagColorEnum {
  Magenta = 'magenta',
  Red = 'red',
  Volcano = 'volcano',
  Orange = 'orange',
  Gold = 'gold',
  Lime = 'lime',
  Green = 'green',
  Cyan = 'cyan',
  Blue = 'blue',
  Geekblue = 'geekblue',
  Purple = 'purple',
}

export const TagColorList: TagColorEnum[] = Object.values(TagColorEnum);

/** 枚举 - 状态类型 */
export enum StatusEnum {
  /** 停用 */
  Disable = 0,
  /** 启用 */
  Enable = 1,
}

/** 集合 - 状态类型 */
export const StatusMap: Record<
  number,
  {
    color: TagColorEnum;
    label: string;
    value: StatusEnum;
  }
> = {
  [StatusEnum.Disable]: {
    color: TagColorEnum.Volcano,
    label: '停用',
    value: StatusEnum.Disable,
  },
  [StatusEnum.Enable]: {
    color: TagColorEnum.Green,
    label: '启用',
    value: StatusEnum.Enable,
  },
};
