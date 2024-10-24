/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-15 08:44:23
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-20 03:04:04
 * @ Description: 统计报告模块
 */

import { FC, memo, useContext } from 'react';
import SmartTourismCard from '../components/smart-tourism-card';
import Module1 from './module1';
import BehaviorAnalysis from './behavior-analysis';
import WorldMap from './world-map';
import Module2 from './module2';
import Module3 from './module3';
import Module4 from './module4';
import Module5 from './module5';
import Module6 from './module6';
import { WisdomTourismContext } from '../..';

/**
 * @description 统计报告模块
 */
export const StatisticsReport: FC = memo(() => {
  const { selectRangeDate } = useContext(WisdomTourismContext);

  return (
    <div className='w-full h-full pt-4'>
      <div className='w-full h-3/5 flex'>
        <SmartTourismCard title='网站访问分析' className='w-[30%] h-full'>
          <Module1 selectRangeDate={selectRangeDate} />
        </SmartTourismCard>
        <div className='w-[39.2%] mx-[0.4%] h-full pt-[42px]'>
          <BehaviorAnalysis />
        </div>
        <div className='w-[30%] h-full flex flex-col justify-between'>
          <SmartTourismCard title='世界地图 - 通讯行为分析' className='w-full h-[55%]'>
            <WorldMap />
          </SmartTourismCard>
          <SmartTourismCard title='用户来源分析' className='w-full h-[40%]'>
            <Module2 />
          </SmartTourismCard>
        </div>
      </div>
      <div className='w-full h-2/5 flex justify-between pt-8'>
        <SmartTourismCard title='金钱交易分析' className='w-[33%] h-full'>
          <Module3 />
        </SmartTourismCard>
        <SmartTourismCard title='旅游地分析' className='w-[18%] h-full'>
          <Module4 selectRangeDate={selectRangeDate} />
        </SmartTourismCard>
        <SmartTourismCard title='用户行为分析' className='w-[18%] h-full'>
          <Module5 />
        </SmartTourismCard>
        <SmartTourismCard title='驻足时长分布分析' className='w-[30%] h-full'>
          <Module6 />
        </SmartTourismCard>
      </div>
    </div>
  );
});

export default StatisticsReport;
