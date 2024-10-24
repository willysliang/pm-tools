/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-15 08:44:23
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-22 10:35:57
 * @ Description: 游客量分析模块
 */

import { FC, memo, useContext } from 'react';
import SmartTourismCard from '../components/smart-tourism-card';
import Module1 from './module1';
import CirclePieChart from './circle-pie-chart';
import Module2 from './module2';
import Module3 from './module3';
import Module4 from './module4';
import Module5 from './module5';
import Module6 from './module6';
import { WisdomTourismContext } from '../..';
import { ITouristDataProps } from './types';

/**
 * @description 游客量分析模块
 */
export const TouristAnalysis: FC = memo(() => {
  const { selectRangeDate } = useContext(WisdomTourismContext);

  /** 旅游地排行榜 */
  const touristData: ITouristDataProps[] = [
    { address: '北京', frequency: 200, people: 50, profit: 200 },
    { address: '西安', frequency: 12, people: 182, profit: 49 },
    { address: '南京', frequency: 21, people: 234, profit: 70 },
    { address: '桂林', frequency: 54, people: 191, profit: 232 },
    { address: '三亚', frequency: 260, people: 190, profit: 256 },
    { address: '青岛', frequency: 130, people: 30, profit: 76.7 },
    { address: '厦门', frequency: 210, people: 10, profit: 135.6 },
    { address: '丽江', frequency: 213, people: 137, profit: 60 },
    { address: '上海', frequency: 99, people: 63, profit: 140 },
    { address: '广州', frequency: 112, people: 196, profit: 160 },
  ];

  return (
    <div className='h-full w-full pt-4 flex flex-col'>
      <div className='w-full h-[65%] flex justify-between'>
        <div className='w-[30%] h-full'>
          <SmartTourismCard title='模块一分析' className='w-full h-full'>
            <Module1 touristData={touristData} selectRangeDate={selectRangeDate} />
          </SmartTourismCard>
        </div>
        <div className='flex-1 h-full pt-[52px]'>
          <CirclePieChart />
        </div>
        <div className='w-[30%] h-full'>
          <SmartTourismCard title='模块二分析' className='w-full h-full'>
            <Module2 selectRangeDate={selectRangeDate} />
          </SmartTourismCard>
        </div>
      </div>
      <div className='flex-1 w-full pt-8 flex justify-between'>
        <div className='w-[22.8%] h-full'>
          <SmartTourismCard title='模块三分析' className='w-full h-full'>
            <Module3 touristData={touristData} />
          </SmartTourismCard>
        </div>
        <div className='w-[22.8%] h-full'>
          <SmartTourismCard title='模块四分析' className='w-full h-full'>
            <Module4 touristData={touristData} />
          </SmartTourismCard>
        </div>
        <div className='w-[22.8%] h-full'>
          <SmartTourismCard title='模块五分析' className='w-full h-full'>
            <Module5 />
          </SmartTourismCard>
        </div>
        <div className='w-[30%] h-full'>
          <SmartTourismCard title='模块六分析' className='w-full h-full'>
            <Module6 touristData={touristData} />
          </SmartTourismCard>
        </div>
      </div>
    </div>
  );
});

export default TouristAnalysis;
