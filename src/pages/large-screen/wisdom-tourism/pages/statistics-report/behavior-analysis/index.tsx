/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-17 09:52:57
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-18 15:59:12
 * @ Description: 行为分析模块
 */

import { FC, memo, MouseEvent, useEffect, useRef, useState } from 'react';
import images from './images';
import { initSwiperData } from './config';
import { Rate } from 'antd';
import './index.scss';

/**
 * @description 行为分析模块
 */
export const BehaviorAnalysis: FC = memo(() => {
  const [status] = useState<boolean>(false);
  const [opacity, setOpacity] = useState<number>(0);
  const [swiperData, setSwiperData] = useState<typeof initSwiperData>(
    JSON.parse(JSON.stringify(initSwiperData)),
  );

  const timer = useRef<NodeJS.Timeout | null>(null);
  const rid = useRef<number | null>(null);

  const length = useRef<number>(0);
  const frames = useRef<number>(0);
  const index = useRef<number>(1);
  const textBoxRef = useRef<any[]>([]);

  /**
   * 暂存 opacity 的状态，因为 opacity 是量化延迟更新，所以中间变量变更的过程没法有效记录
   */
  const tempOpacity = useRef<number>(0);
  useEffect(() => {
    tempOpacity.current = opacity;
  }, [opacity]);

  /**
   * 开始动画帧
   */
  const handleFrame = () => {
    rid.current && cancelAnimationFrame(rid.current);
    rid.current = requestAnimationFrame(handleFrame);

    let line = document.querySelector('#line_' + index.current) as any;
    line.style.strokeDashoffset = frames.current;
    line.getPointAtLength(length.current - frames.current);
    line.getPointAtLength((length.current - frames.current + 2) % length.current);

    if (index.current > 1) {
      line = document.querySelector('#line_' + (index.current - 1));
      textBoxRef.current[index.current - 2].style.opacity = 0;
      line.style.strokeDashoffset = line.style.strokeDasharray;
    }
    if (index.current === 1) {
      for (let i = 2; i < 8; i++) {
        line = document.querySelector('#line_' + i);
        textBoxRef.current[i - 1].style.opacity = 0;
        line.style.strokeDashoffset = line.style.strokeDasharray;
      }
    }
    textBoxRef.current[index.current - 1].style.opacity = tempOpacity.current;
    setOpacity((oldOpacity) => oldOpacity + 5 / length.current);
    tempOpacity.current += 5 / length.current;
    frames.current -= 5;
    if (frames.current <= -5) {
      rid.current && cancelAnimationFrame(rid.current);
    }
  };

  /**
   * 动画触发
   */
  const handleAnimation = (i: number, notDoAni: boolean) => {
    timer.current && clearTimeout(timer.current);
    rid.current && cancelAnimationFrame(rid.current);

    if (i > swiperData.length) i = 1;

    setSwiperData((oldSwiperData) =>
      oldSwiperData.map((item, idx) => ({
        ...item,
        status: i - 1 === idx,
      })),
    );
    const line = document.querySelector('#line_' + i) as any;
    length.current = line.getTotalLength();
    line.style.strokeDasharray = length.current;
    line.style.strokeDashoffset = length.current;
    frames.current = length.current;
    index.current = i;
    setOpacity(0);
    tempOpacity.current = 0;
    handleFrame();

    if (!notDoAni) {
      timer.current && clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        handleAnimation(i + 1, notDoAni);
      }, 5000);
    }
  };

  /**
   * 鼠标移入
   */
  const handleMouseEnter = (event: MouseEvent) => {
    document.querySelectorAll('.text-box').forEach((item: any) => (item.style.opacity = 0));
    document.querySelectorAll('.swap1').forEach((item: any) => (item.style.strokeDashoffset = 130));
    document.querySelectorAll('.swap2').forEach((item: any) => (item.style.strokeDashoffset = 190));
    document.querySelectorAll('.swap3').forEach((item: any) => (item.style.strokeDashoffset = 240));
    document.querySelectorAll('.swap4').forEach((item: any) => (item.style.strokeDashoffset = 295));

    rid.current && cancelAnimationFrame(rid.current);
    timer.current && clearTimeout(timer.current);
    handleAnimation(
      Number(event.currentTarget.id.substr(event.currentTarget.id.length - 1, 1)),
      true,
    );
  };

  /**
   * 鼠标移出
   */
  const handleMouseLeve = () => {
    timer.current = setTimeout(() => {
      handleAnimation(1, false);
    }, 500);
  };

  /**
   * 离开页面动画初始化
   */
  const handleUnmount = () => {
    document.querySelectorAll('.text-box').forEach((item: any) => (item.style.opacity = 0));
    document.querySelectorAll('.swap1').forEach((item: any) => (item.style.strokeDashoffset = 130));
    document.querySelectorAll('.swap2').forEach((item: any) => (item.style.strokeDashoffset = 190));
    document.querySelectorAll('.swap3').forEach((item: any) => (item.style.strokeDashoffset = 240));
    document.querySelectorAll('.swap4').forEach((item: any) => (item.style.strokeDashoffset = 295));

    timer.current && clearTimeout(timer.current);
    rid.current && cancelAnimationFrame(rid.current);

    setSwiperData((oldSwiperData) =>
      oldSwiperData.map((item) => ({
        ...item,
        status: false,
      })),
    );
  };

  /**
   * 中心图
   */
  const setChart = () => {
    timer.current && clearTimeout(timer.current);
    rid.current && cancelAnimationFrame(rid.current);

    frames.current = 0;
    timer.current = setTimeout(() => {
      handleAnimation(1, false);
    }, 5000);
  };
  useEffect(() => {
    setChart();
    return () => {
      handleUnmount();
    };
  }, []);

  return (
    <div className='behavior-analysis w-full h-full relative'>
      <svg
        className='w-full h-full'
        xmlns='http://www.w3.org/2000/svg'
        version='1.1'
        viewBox='0 0 783 500'
      >
        <image x='5%' y='20' xlinkHref={images.humanIcon} width='90%' height='100%' />
        {!status ? (
          <image
            x='250'
            y='320'
            style={{ opacity }}
            xlinkHref={images.normalBg}
            width='250'
            height='170'
          />
        ) : (
          <image
            className='opacity-0'
            x='220'
            y='110'
            xlinkHref={images.sensitiveBg}
            width='300'
            height='170'
          />
        )}
        {/* <image {...statusConfig} /> */}

        {swiperData.map((item, idx) => (
          <g key={idx}>
            <image
              x={item.image.x}
              y={item.image.y}
              xlinkHref={item.status ? images.sensitiveBg : images.normalBg}
              width='130'
              height='50'
            />
            <foreignObject
              className='cursor-pointer text-[15px]'
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeve}
              x={item.pos.x}
              y={item.pos.y}
              id={'title_' + (idx + 1)}
              width='100'
              height='40'
            >
              <div className='h-full flex justify-center items-center bg-[rgba(0,0,0,0)]'>
                <p
                  className='w-full flex flex-col justify-between items-center bg-[rgba(0,0,0,0)] text-[#a0e8ff] text-[15px]'
                  style={{ color: item.status ? '#FFDBDB' : '' }}
                >
                  <span className='text-[15px] leading-[15px] block mb-[4px]'>{item.title}</span>
                  <Rate onChange={(val) => (item.rate = val)} value={item.rate} disabled></Rate>
                </p>
              </div>
            </foreignObject>
            <foreignObject
              className='text-box opacity-0 text-[#fff] text-[15px] cursor-pointer relative z-10'
              x='250'
              y='320'
              ref={(el) => (textBoxRef.current[idx] = el)}
              width='250'
              height='170'
            >
              <div className='bg-[rgba(0,0,0,0)] h-full flex justify-center'>
                <div className='w-full h-full py-[10px] px-[20px]'>
                  <div className='text-[#fff] text-[16px] font-bold mb-[5px]'>{item.title}</div>
                  <div className='text-[#afe5fb] text-[16px]'>对当前模块{idx + 1}的一些描述...</div>
                </div>
              </div>
            </foreignObject>
            <path
              id={'line_' + (idx + 1)}
              className={item.path.className}
              d={item.path.d}
              stroke='#AFE5FB'
              strokeWidth='2'
              fill='none'
            />
          </g>
        ))}
      </svg>
    </div>
  );
});

export default BehaviorAnalysis;
