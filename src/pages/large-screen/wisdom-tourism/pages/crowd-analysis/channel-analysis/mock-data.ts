/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-23 15:24:14
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-23 15:43:46
 * @ Description: 模拟数据
 */

import type { IChartDataProps } from './useChart1';
import type { IUserRankChartDataProps } from './useUserRankChart';

/** 渠道分布分析 - 横向柱状图数据 */
export const channelDistributionData: IChartDataProps[] = [
  {
    subtitle: '675人（2345次/4533元）',
    top: '23%',
    data: { name: '数据1', value: 45, color: '#0E4CFF' },
  },
  {
    subtitle: '675人（2345次/4533元）',
    top: '39%',
    data: { name: '数据2', value: 60, color: '#B405FD' },
  },
  {
    subtitle: '675人（2345次/4533元）',
    top: '56%',
    data: { name: '数据3', value: 12, color: '#FE9900' },
  },
  {
    subtitle: '675人（2345次/4533元）',
    top: '72%',
    data: { name: '数据4', value: 24, color: '#FF6600' },
  },
  {
    subtitle: '675人（2345次/4533元）',
    top: '88%',
    data: { name: '数据5', value: 21, color: '#7F05FD' },
  },
];

/** 前三渠道统计数据 */
export const top3ChannelData: IChartDataProps[] = [
  {
    subtitle: '675人（2345次/4533元）',
    top: '29%',
    data: { name: '数据1', value: 45, color: '#0E4CFF' },
  },
  {
    subtitle: '675人（2345次/4533元）',
    top: '54%',
    data: { name: '数据2', value: 60, color: '#FE9900' },
  },
  {
    subtitle: '675人（2345次/4533元）',
    top: '78%',
    data: { name: '数据3', value: 12, color: '#7F05FD' },
  },
];

/** 关注用户排名数据 */
export const userRankData: IUserRankChartDataProps[] = [
  {
    top: '16%',
    color: '14,73,245',
    data: [
      { name: '王立国', value: 10 },
      { name: '李建国', value: 9 },
      { name: '董年月', value: 8 },
      { name: '高树安', value: 7 },
      { name: '李白', value: 6 },
      { name: '杜甫', value: 5 },
      { name: '刘禹锡', value: 4 },
      { name: '苏东坡', value: 3 },
      { name: '杜牧', value: 2 },
      { name: '李白', value: 1 },
    ],
  },
  {
    top: '34%',
    color: '170,6,243',
    data: [
      { name: '王立国', value: 10 },
      { name: '李建国', value: 9 },
      { name: '董年月', value: 8 },
      { name: '高树安', value: 7 },
      { name: '李白', value: 6 },
      { name: '杜甫', value: 5 },
      { name: '刘禹锡', value: 4 },
      { name: '苏东坡', value: 3 },
      { name: '杜牧', value: 2 },
      { name: '李白', value: 1 },
    ],
  },
  {
    top: '50%',
    color: '254,153,0',
    data: [
      { name: '王立国', value: 10 },
      { name: '李建国', value: 9 },
      { name: '董年月', value: 8 },
      { name: '高树安', value: 7 },
      { name: '李白', value: 6 },
      { name: '杜甫', value: 5 },
      { name: '刘禹锡', value: 4 },
      { name: '苏东坡', value: 3 },
      { name: '杜牧', value: 2 },
      { name: '李白', value: 1 },
    ],
  },
  {
    top: '68%',
    color: '255,102,0',
    data: [
      { name: '王立国', value: 10 },
      { name: '李建国', value: 9 },
      { name: '董年月', value: 8 },
      { name: '高树安', value: 7 },
      { name: '李白', value: 6 },
      { name: '杜甫', value: 5 },
      { name: '刘禹锡', value: 4 },
      { name: '苏东坡', value: 3 },
      { name: '杜牧', value: 2 },
      { name: '李白', value: 1 },
    ],
  },
  {
    top: '85%',
    color: '127,5,253',
    data: [
      { name: '王立国', value: 10 },
      { name: '李建国', value: 9 },
      { name: '董年月', value: 8 },
      { name: '高树安', value: 7 },
      { name: '李白', value: 6 },
      { name: '杜甫', value: 5 },
      { name: '刘禹锡', value: 4 },
      { name: '苏东坡', value: 3 },
      { name: '杜牧', value: 2 },
      { name: '李白', value: 1 },
    ],
  },
];

/** 重点关注用户排名 */
export const userRankData2: IUserRankChartDataProps[] = [
  {
    top: '30%',
    color: '14,73,245',
    data: [
      { name: '王立国', value: 10 },
      { name: '李建国', value: 9 },
      { name: '董年月', value: 8 },
      { name: '高树安', value: 7 },
      { name: '李白', value: 6 },
      { name: '杜甫', value: 5 },
      { name: '刘禹锡', value: 4 },
      { name: '苏东坡', value: 3 },
      { name: '杜牧', value: 2 },
      { name: '李白', value: 1 },
    ],
  },
  {
    top: '57%',
    color: '254,153,0',
    data: [
      { name: '王立国', value: 10 },
      { name: '李建国', value: 9 },
      { name: '董年月', value: 8 },
      { name: '高树安', value: 7 },
      { name: '李白', value: 6 },
      { name: '杜甫', value: 5 },
      { name: '刘禹锡', value: 4 },
      { name: '苏东坡', value: 3 },
      { name: '杜牧', value: 2 },
      { name: '李白', value: 1 },
    ],
  },
  {
    top: '83%',
    color: '127,5,253',
    data: [
      { name: '王立国', value: 10 },
      { name: '李建国', value: 9 },
      { name: '董年月', value: 8 },
      { name: '高树安', value: 7 },
      { name: '李白', value: 6 },
      { name: '杜甫', value: 5 },
      { name: '刘禹锡', value: 4 },
      { name: '苏东坡', value: 3 },
      { name: '杜牧', value: 2 },
      { name: '李白', value: 1 },
    ],
  },
];

/**
 * 饼图数据
 */
/** 饼图数据1 */
export const pieData1 = [
  {
    value: 60,
    name: '分类1',
    itemStyle: {
      color: '#1456FE',
    },
  },
  {
    value: 20,
    name: '分类2',
    itemStyle: {
      color: '#00CCFF',
    },
  },
  {
    value: 80,
    name: '分类3',
    itemStyle: {
      color: '#142AFE',
    },
  },
  {
    value: 40,
    name: '分类4',
    itemStyle: {
      color: '#1493FE',
    },
  },
  {
    value: 40,
    name: '分类5',
    itemStyle: {
      color: '#252448',
    },
  },
];

/** 饼图数据2 */
export const pieData2 = [
  {
    value: 60,
    name: '分类1',
    itemStyle: {
      color: '#142AFE',
    },
  },
  {
    value: 20,
    name: '分类2',
    itemStyle: {
      color: '#1493FE',
    },
  },
  {
    value: 80,
    name: '分类3',
    itemStyle: {
      color: '#252448',
    },
  },
  {
    value: 40,
    name: '分类4',
    itemStyle: {
      color: '#00CCFF',
    },
  },
  {
    value: 40,
    name: '分类5',
    itemStyle: {
      color: '#1456FE',
    },
  },
];

/** 饼图数据3 */
export const pieData3 = [
  {
    value: 60,
    name: '分类1',
    itemStyle: {
      color: '#1493FE',
    },
  },
  {
    value: 20,
    name: '分类2',
    itemStyle: {
      color: '#142AFE',
    },
  },
  {
    value: 80,
    name: '分类3',
    itemStyle: {
      color: '#1456FE',
    },
  },
  {
    value: 40,
    name: '分类4',
    itemStyle: {
      color: '#00CCFF',
    },
  },
  {
    value: 40,
    name: '分类5',
    itemStyle: {
      color: '#252448',
    },
  },
];

/**
 * 散点图数据集合
 */
export const scatterData1 = [
  [172.7, 105.2],
  [153.4, 42],
];
export const scatterData2 = [
  [162.8, 58.0],
  [167.0, 59.8],
  [60.0, 54.8],
  [160.0, 43.2],
  [168.9, 60.5],
  [158.2, 46.4],
  [156.0, 64.4],
  [160.0, 48.8],
  [67.1, 62.2],
  [158.0, 55.5],
  [122.6, 57.8],
  [26.0, 54.6],
  [162.1, 59.2],
  [133.4, 52.7],
  [59.8, 53.2],
  [70.5, 64.5],
  [159.2, 51.8],
  [57.5, 56.0],
  [61.3, 63.6],
  [132.6, 63.2],
  [60.0, 59.5],
  [168.9, 56.8],
  [65.1, 64.1],
  [132.6, 50.0],
  [165.1, 72.3],
  [66.4, 55.0],
  [60.0, 55.9],
  [52.4, 60.4],
  [140.2, 69.1],
  [12.6, 84.5],
  [70.2, 55.9],
  [158.8, 55.5],
  [112.7, 69.5],
  [67.6, 76.4],
  [162.6, 61.4],
  [87.6, 65.9],
  [56.2, 58.6],
  [175.2, 66.8],
  [72.1, 56.6],
  [162.6, 58.6],
  [90.0, 55.9],
  [165.1, 59.1],
  [102.9, 81.8],
  [66.4, 70.7],
  [125.1, 56.8],
  [102.7, 75.9],
  [101.3, 57.3],
  [167.6, 55.0],
  [65.1, 65.5],
  [157.5, 48.6],
  [63.8, 58.6],
  [67.6, 63.6],
  [65.1, 55.2],
];
export const scatterData3 = [
  [161.2, 2.6],
  [127.5, 59.0],
  [159.5, 49.2],
  [17.0, 63.0],
  [155.8, 53.6],
  [170.0, 59.0],
  [19.1, 47.6],
  [166.0, 69.8],
  [116.2, 66.8],
  [160.2, 75.2],
  [172.5, 55.2],
  [110.9, 54.2],
  [12.9, 62.5],
  [153.4, 42.0],
  [110.0, 50.0],
  [10.2, 49.8],
  [88.2, 49.2],
  [175.0, 73.2],
  [157.0, 47.8],
  [67.6, 68.8],
  [159.5, 50.6],
  [175.0, 82.5],
  [86.8, 57.2],
  [96.5, 87.8],
  [90.2, 72.8],
  [174.0, 54.5],
  [173.0, 59.8],
  [179.9, 67.3],
  [110.5, 67.8],
  [60.0, 47.0],
  [154.4, 46.2],
  [82.0, 55.0],
  [86.5, 83.0],
  [10.0, 54.4],
  [52.0, 45.8],
  [162.1, 53.6],
  [170.0, 73.2],
  [60.2, 52.1],
  [121.3, 67.9],
  [116.4, 56.6],
];
