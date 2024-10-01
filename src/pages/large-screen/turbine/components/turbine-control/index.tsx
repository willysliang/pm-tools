/**
 * @ Author: willysliang
 * @ CreateTime: 2024-09-30 15:39:47
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-01 09:30:33
 * @ Description: 操纵区
 */

import { FC, Fragment, memo, useContext, useState } from 'react';
import { BaseCollapse } from '../base-collaspse';
import { BaseCheckbox } from '../base-checkbox';
import { useWindmillStore } from '@/store/large-screen/turbine';
import { TurbineActionsContext } from '../../index';

/** 漩涡 - 操纵区 */
export const Control: FC = memo(() => {
  /**
   * @description: 面板控制
   */
  const { layoutModules, onToggleByModuleName } = useWindmillStore();

  /**
   * @description: 风机控制
   */
  const [checked, setChecked] = useState<boolean>(false);
  const { equipmentComposeAnimation, equipmentDecomposeAnimation } =
    useContext(TurbineActionsContext);
  const ontoggle = (status: boolean) => {
    setChecked(status);
    status ? equipmentDecomposeAnimation() : equipmentComposeAnimation();
  };

  return (
    <Fragment>
      <BaseCollapse title='面板控制'>
        {Object.values(layoutModules).map(({ key, label, visible }) => (
          <BaseCheckbox
            key={key}
            label={label}
            value={visible}
            onChange={() => onToggleByModuleName(key)}
          />
        ))}
      </BaseCollapse>
      <BaseCollapse title='风机控制'>
        <BaseCheckbox value={checked} label='风机拆解' onChange={ontoggle} />
      </BaseCollapse>
    </Fragment>
  );
});

export default Control;
