/**
 * @ Author: willy
 * @ CreateTime: 2024-06-19 20:46:46
 * @ Modifier: willy
 * @ ModifierTime: 2024-06-20 10:11:37
 * @ Description: 任务相关的枚举类
 */

/** 任务的状态类型 */
export enum TaskStatusType {
  /** 未开始 */
  UN_STARTED = 'UN_STARTED',
  /** 进行中 */
  IN_PROGRESS = 'IN_PROGRESS',
  /** 已完成 */
  FINISHED = 'FINISHED',
}

/** 任务的状态集 */
export const taskStatus = {
  [TaskStatusType.UN_STARTED]: {
    label: '未开始',
    value: TaskStatusType.UN_STARTED,
  },
  [TaskStatusType.IN_PROGRESS]: {
    label: '进行中',
    value: TaskStatusType.IN_PROGRESS,
  },
  [TaskStatusType.FINISHED]: {
    label: '已完成',
    value: TaskStatusType.FINISHED,
  },
};
