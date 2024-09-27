/**
 * @ Author: willysliang
 * @ CreateTime: 2024-09-24 17:18:01
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-09-25 14:07:21
 * @ Description: 工时常量 | 配置
 */

/** 工时情况对照表 */
export const WORK_HOUR_COMPARES = [
  {
    label: '标准',
    value: 'standard',
    min: 0,
    max: 5.5,
    style: {
      backgroundColor: 'rgba(115, 216, 151, 0.37)',
      color: '#333',
    },
  },
  {
    label: '饱和',
    value: 'saturation',
    min: 5.5,
    max: 7,
    style: {
      backgroundColor: '#73d897',
      color: '#fff',
    },
  },
  {
    label: '超荷',
    value: 'overtime',
    min: 7,
    max: 24,
    style: {
      backgroundColor: '#ff7575',
      color: '#fff',
    },
  },
];

/** 随机生成工时数据 */
export const randomWorkHours = (randomLen: number = 14) => {
  const getRandomDuration = (num = 15) => Math.floor(Math.random() * num) / 10;

  const workhours = Array.from({ length: randomLen }).map((_, i) => {
    const ts =
      new Date().setHours(0, 0, 0, 0) + (i - Math.floor(randomLen / 2)) * 24 * 60 * 60 * 1000;

    const records = [
      { start: '08:00', end: '09:00', duration: getRandomDuration(10) },
      { start: '09:00', end: '10:30', duration: getRandomDuration(15) },
      { start: '11:00', end: '12:30', duration: getRandomDuration(15) },
      { start: '14:00', end: '16:00', duration: getRandomDuration(20) },
      { start: '16:00', end: '18:00', duration: getRandomDuration(20) },
      { start: '18:00', end: '20:00', duration: getRandomDuration(20) },
    ];

    return {
      ts,
      records,
    };
  });

  return workhours;
};
