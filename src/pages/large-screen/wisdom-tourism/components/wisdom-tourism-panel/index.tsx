/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-10 10:36:00
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-14 14:09:43
 * @ Description: wisdom-tourism-panel - 小面板
 */
import { FC, HTMLAttributes, memo, useEffect, useRef, useState } from 'react';
import iconPanelTitle from '@assets/large-screen/wisdom-tourism/panel-title-icon.png';
import { createBEM } from '@/utils';
import s from './index.module.scss';

interface IWisdomTourismPanelProps extends HTMLAttributes<HTMLDivElement> {
  /** 标题 */
  title: string;
  /** 头部插槽 */
  headerSlot?: React.ReactNode;
  /** 主内容 */
  children: React.ReactNode;
}

/**
 * @description 小面板
 */
export const WisdomTourismPanel: FC<IWisdomTourismPanelProps> = memo(
  ({ headerSlot, children, title, ...extraProps }) => {
    const NAMESPACE = 'wisdom-tourism-panel';

    const panelTitleRef = useRef<HTMLSpanElement>(null);
    const [clipPath, setClipPath] = useState<string>(`
      polygon(
        174px 0,
        100% 0,
        100% 100%,
        0 100%,
        0 42px,
        154px 42px,
        174px 0
      )
    `);
    useEffect(() => {
      console.log(panelTitleRef.current?.offsetWidth);
      const width = (panelTitleRef.current?.offsetWidth || 154) + 20;
      setClipPath(`
          polygon(
            ${width}px 0,
            100% 0,
            100% 100%,
            0 100%,
            0 42px,
            ${width - 20}px 42px,
            ${width}px 0
          )
      `);
    }, [title]);

    return (
      <div
        className={s[createBEM(NAMESPACE)]}
        {...extraProps}
        style={{
          ...(extraProps.style || {}),
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          '--wisdom-tourism-panel-clip-path': clipPath,
        }}
      >
        <div className={s[createBEM(NAMESPACE, 'header')]}>
          <div className={s[createBEM(NAMESPACE, 'header-title')]}>
            <span className='font-family-dingtalk' ref={panelTitleRef}>
              {title}
            </span>
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
