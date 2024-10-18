/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-09 17:33:26
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-15 09:15:38
 * @ Description: 智慧旅游 - 主体
 */

import { FC, useEffect, useState } from 'react';
import RealTimeAccessChart from '../real-time-access-chart';
import MaleFemaleRatioChart from '../male-female-ratio-chart';
import AgeRatioChart, { type IAgeRatioChartDataProps } from '../age-ratio-chart';
import ChinaMapChart, { type IChinaMapChartDataProps } from '../china-map-chart';
import OverNext30Chart from '../over-next30-chart';
import HotPlateChart, { type IHotChartDataProps } from '../hot-plate-chart';
import AnnualUseChart, { type IAnnualUseChartDataProps } from '../annual-use-chart';
import PlatFromChart, { type IPlatformSourceChartDataProps } from '../platform-source-chart';
import {
  hotDataMock,
  ageDataMock,
  mapDataMock,
  annualDataMock,
  platFromDataMock,
} from './config/mock-data';
import { createBEM } from '@/utils';
import s from './index.module.scss';
import cx from 'classnames';

/**
 * @description 智慧旅游 - 主体
 */
export const WisdomTourismMain: FC = () => {
  const NAMESPACE = 'wisdom-tourism-base';

  /** 已预约人数 */
  const [actualTotal, setActualTotal] = useState<number>(0);
  /** 男性占比 */
  const [manPercentage, setManPercentage] = useState<number>(1);
  /** 热门景点排行数据  */
  const [hotData, setHotData] = useState<IHotChartDataProps[]>([]);
  /** 中国地图数据 */
  const [mapData, setMapData] = useState<IChinaMapChartDataProps[]>([]);
  /** 年龄分布数据 */
  const [ageData, setAgeData] = useState<IAgeRatioChartDataProps[]>([]);
  /** 预约渠道来源数据 */
  const [platFromData, setPlatFromData] = useState<IPlatformSourceChartDataProps[]>([]);
  /** 年度游客量对比 */
  const [annualData, setAnnualData] = useState<IAnnualUseChartDataProps[]>([]);

  /** 初始化数据 */
  const initData = () => {
    setManPercentage(0.6);
    setHotData(hotDataMock);
    setAgeData(ageDataMock);
    setMapData(mapDataMock);
    setPlatFromData(platFromDataMock);
    setAnnualData(annualDataMock);
  };
  useEffect(() => {
    initData();

    const loopTimer = () => {
      const timer = setTimeout(() => {
        setActualTotal((state) => Math.floor(Math.random() * 100) + state);
        loopTimer();
      }, 1000 * 5);

      return timer;
    };

    const timer = loopTimer();
    return () => {
      timer && clearTimeout(timer);
    };
  }, []);

  return (
    <div className={s[createBEM(NAMESPACE)]}>
      <div className={s[createBEM(`${NAMESPACE}-left`)]}>
        <RealTimeAccessChart actualTotal={actualTotal} />
        <MaleFemaleRatioChart man={manPercentage} woman={1 - manPercentage} />
        <AgeRatioChart data={ageData} />
      </div>
      <div className={s[createBEM(`${NAMESPACE}-center`)]}>
        <div className={s[createBEM(`${NAMESPACE}-center-map`)]}>
          <div
            className={cx(
              s[createBEM(`${NAMESPACE}-center-map`, 'header')],
              'font-family-dingtalk',
            )}
          >
            景区实时客流量
          </div>
          <div className={s[createBEM(`${NAMESPACE}-center-map`, 'content')]}>
            <ChinaMapChart data={mapData} />
          </div>
        </div>
        <OverNext30Chart />
      </div>
      <div className={s[createBEM(`${NAMESPACE}-right`)]}>
        <HotPlateChart data={hotData} />
        <AnnualUseChart data={annualData} />
        <PlatFromChart data={platFromData} />
      </div>
    </div>
  );
};

export default WisdomTourismMain;
