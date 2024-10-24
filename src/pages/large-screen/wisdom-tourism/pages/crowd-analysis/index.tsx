/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-15 08:44:23
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-24 09:59:50
 * @ Description: 人群分析模块
 */

import { FC, memo } from 'react';
import SmartTourismCard from '../components/smart-tourism-card';
import ChannelAnalysis from './channel-analysis';
import WebcastsRisk from './webcasts-risk';
import DeviceSafeRisk from './device-safe-risk';
import HotWords from './hot-words';
import ProportionAnalysis from './proportion-analysis';
import ChinaMapDataStatistics from './china-map-data-statistics';

/**
 * @description 人群分析模块
 */
export const CrowdAnalysis: FC = memo(() => {
  return (
    <div className='h-full w-full pt-4 flex'>
      <div className='w-[30%] h-full'>
        <SmartTourismCard title='渠道分析' className='w-full h-full'>
          <ChannelAnalysis />
        </SmartTourismCard>
      </div>
      <div className='flex-1 h-full pt-[52px] px-[6px] flex flex-col'>
        <div className='flex-1 w-full'>
          <ChinaMapDataStatistics />
        </div>
        <SmartTourismCard title='占比分析' className='w-full h-[40%]'>
          <ProportionAnalysis />
        </SmartTourismCard>
      </div>
      <div className='w-[30%] h-full flex flex-col justify-between'>
        <SmartTourismCard title='网播风险分析' className='w-full h-[29%]'>
          <WebcastsRisk />
        </SmartTourismCard>
        <SmartTourismCard title='设备安全性风险分析' className='w-full h-[29%]'>
          <DeviceSafeRisk />
        </SmartTourismCard>
        <SmartTourismCard title='舆论、心里风险分析' className='w-full h-[39%]'>
          <HotWords />
        </SmartTourismCard>
      </div>
    </div>
  );
});

export default CrowdAnalysis;
