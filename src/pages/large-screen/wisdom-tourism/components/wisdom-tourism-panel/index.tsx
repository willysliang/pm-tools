/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-10 10:36:00
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-10 16:21:47
 * @ Description: wisdom-tourism-panel - 小面板
 */
import { FC, memo } from 'react';
import iconPanelTitle from '@assets/large-screen/wisdom-tourism/panel-title-icon.png';
import { createBEM } from '@/utils';
import s from './index.module.scss';

interface IWisdomTourismPanelProps {
  /** 标题 */
  title: string;
  /** 头部插槽 */
  headerSlot?: React.ReactNode;
  /** 主内容 */
  children: React.ReactNode;
  /** 扩展的样式 */
  extraStyle?: React.CSSProperties;
}

/**
 * @description 小面板
 */
export const WisdomTourismPanel: FC<IWisdomTourismPanelProps> = memo(
  ({ headerSlot, children, title, extraStyle }) => {
    const NAMESPACE = 'wisdom-tourism-panel';

    return (
      <div className={s[createBEM(NAMESPACE)]} style={extraStyle}>
        <div className={s[createBEM(NAMESPACE, 'header')]}>
          <div className={s[createBEM(NAMESPACE, 'header-title')]}>
            <span className='font-family-dingtalk'>{title}</span>
            <img src={iconPanelTitle} alt='' />
          </div>
          {headerSlot && headerSlot}
        </div>
        <div className={s[createBEM(NAMESPACE, 'main')]}>{children}</div>
      </div>
    );
  },
);

export default WisdomTourismPanel;
