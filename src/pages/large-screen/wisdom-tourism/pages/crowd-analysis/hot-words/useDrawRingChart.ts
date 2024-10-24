/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-23 17:34:26
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-23 17:58:51
 * @ Description: 绘制双重饼图
 */

import { useEffect, useRef } from 'react';

/**
 * @description 绘制双重饼图
 */
export const useDrawRingChart = (title: string, color: string) => {
  const drawRingRef = useRef<HTMLDivElement>(null);

  const handleDrawRing = () => {
    const canvas = document.createElement('canvas');
    drawRingRef.current!.innerHTML = '';
    drawRingRef.current!.appendChild(canvas);
    const context = canvas.getContext('2d')!;
    canvas.width = drawRingRef.current!.offsetWidth;
    canvas.height = drawRingRef.current!.offsetHeight;
    context.lineWidth = 1;
    context.strokeStyle = '#16417F';
    context.save();
    context.beginPath();
    context.arc(canvas.width / 2, canvas.height / 2, canvas.height / 2 - 6, 0, 2 * Math.PI, false);
    context.stroke();
    context.restore();
    context.save();
    context.beginPath();
    context.arc(canvas.width / 2, canvas.height / 2, canvas.height / 2 - 12, 0, 2 * Math.PI, false);
    context.stroke();
    context.restore();
    const percent1 = 60;
    const percent2 = 60;
    const angle1 = percent1 * 3.6 - 90;
    const angle2 = percent2 * 3.6 - 60;
    context.lineWidth = 4;

    context.lineCap = 'round';
    context.save();
    context.strokeStyle = '#035EFF';
    context.beginPath();
    context.arc(
      canvas.width / 2,
      canvas.height / 2,
      canvas.height / 2 - 6,
      -Math.PI / 2,
      (angle1 * Math.PI) / 180,
      false,
    );
    context.stroke();
    context.restore();
    context.save();
    context.beginPath();
    context.strokeStyle = color;
    context.arc(
      canvas.width / 2,
      canvas.height / 2,
      canvas.height / 2 - 12,
      -Math.PI / 6,
      (angle2 * Math.PI) / 180,
      false,
    );
    context.stroke();
    context.restore();
    context.save();
    context.font = '10px Microsoft YaHei';
    context.fillStyle = '#fff';
    const splitTextLen = title.length > 4 ? 25 : 20;
    context.fillText(title, canvas.width / 2 - splitTextLen, canvas.height / 2 + 3);
    context.restore();
  };

  useEffect(() => {
    handleDrawRing();
  }, []);

  return {
    drawRingRef,
  };
};
