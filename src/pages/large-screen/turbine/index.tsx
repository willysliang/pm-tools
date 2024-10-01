/**
 * @ Author: willysliang
 * @ CreateTime: 2024-09-27 11:45:17
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-01 09:21:53
 * @ Description: 漩涡-大风车模块
 */

import { createContext, FC, memo } from 'react';
import { TurbineChart } from './components/turbine-chart';
import { createBEM } from '@/utils';
import { useTurbine } from './hooks/useTurbine';
import cx from 'classnames';
import s from './turbine.module.scss';

export const TurbineActionsContext = createContext({
  equipmentComposeAnimation: () => {},
  equipmentDecomposeAnimation: () => {},
});

/** 漩涡大风车模块 */
export const Turbine: FC = memo(() => {
  const NAMESPACE = 'turbine';

  const { container, equipmentComposeAnimation, equipmentDecomposeAnimation } = useTurbine();

  return (
    <div className={cx(s[createBEM(NAMESPACE)], 'font-family-dingtalk')}>
      <div className={s[createBEM(NAMESPACE, 'header')]}>大型风力发电机监控平台</div>
      <div ref={container} className={s[createBEM(NAMESPACE, 'content')]}></div>
      <TurbineActionsContext.Provider
        value={{ equipmentComposeAnimation, equipmentDecomposeAnimation }}
      >
        <TurbineChart />
      </TurbineActionsContext.Provider>
    </div>
  );
});

export default Turbine;
