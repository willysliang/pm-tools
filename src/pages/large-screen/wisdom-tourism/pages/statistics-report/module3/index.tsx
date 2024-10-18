/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-16 15:09:42
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-18 08:48:50
 * @ Description: 模块3
 */

import { FC, memo } from 'react';
import { useChart5 } from './useChart5';
import { useChart6 } from './useChart6';

/**
 * @description 模块3
 */
export const Module3: FC = memo(() => {
  /**
   * 图表5
   */
  const typeList = [
    { label: '月', value: 'month' },
    { label: '日', value: 'day' },
  ];
  const { chartRef: chartRef5, type, onSelectType } = useChart5();

  /**
   * 图表6 - 1
   */
  const chartData61 = {
    data1: [
      {
        value: 70,
        name: '数据1',
        itemStyle: {
          color: '#c0232a',
        },
      },
      {
        value: 60,
        name: '数据2',
        itemStyle: {
          color: '#2870e8',
        },
      },
    ],
    data2: [
      {
        value: 40,
        name: '方式1',
        itemStyle: {
          color: '#c0232a',
        },
      },
      {
        value: 60,
        name: '方式2',
        itemStyle: {
          color: '#2870e8',
        },
      },
    ],
  };
  const { chartRef: chartRef61 } = useChart6('标题', chartData61);

  /**
   * 图表6 - 1
   */
  const chartData62 = {
    data1: [
      {
        value: 80,
        name: '数据1',
        itemStyle: {
          color: '#c0232a',
        },
      },
      {
        value: 60,
        name: '数据2',
        itemStyle: {
          color: '#2870e8',
        },
      },
    ],
    data2: [
      {
        value: 40,
        name: '方式1',
        itemStyle: {
          color: '#c2232a',
        },
      },
      {
        value: 60,
        name: '方式2',
        itemStyle: {
          color: '#fe672c',
        },
      },
      {
        value: 40,
        name: '方式3',
        itemStyle: {
          color: '#a262f2',
        },
      },
      {
        value: 20,
        name: '方式4',
        itemStyle: {
          color: '#2870e8',
        },
      },
      {
        value: 80,
        name: '方式5',
        itemStyle: {
          color: '#feed2c',
        },
      },
    ],
  };
  const { chartRef: chartRef62 } = useChart6('标题', chartData62);

  return (
    <div className='w-full h-full flex flex-wrap pb-1'>
      <div className='w-full h-[55%] relative'>
        <div ref={chartRef5} className='w-full h-full'></div>
        <div className='absolute top-[15px] left-[10px] border border-solid border-[#028bff] rounded-[5px]'>
          {typeList.map((item) => (
            <span
              key={item.value}
              className={`cursor-pointer inline-block px-[8px] py-[1px] text-[#fff] ${type === item.value ? 'bg-[#0454a1]' : ''}`}
              onClick={() => onSelectType(item.value as 'month' | 'day')}
            >
              {item.label}
            </span>
          ))}
        </div>
      </div>
      <div ref={chartRef61} className='w-1/2 h-[45%]'></div>
      <div ref={chartRef62} className='w-1/2 h-[45%]'></div>
    </div>
  );
});

export default Module3;
