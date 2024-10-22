/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-21 16:10:45
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-22 09:07:48
 * @ Description: 中心圆饼图
 */

import { FC, memo, useEffect, useRef } from 'react';

/**
 * @description 中心圆饼图
 */
export const CirclePieChart: FC = memo(() => {
  const circlePieRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotRef = useRef<HTMLCanvasElement>(null);

  const circle = {
    x: 250,
    y: 250,
    radius: 218,
  };
  const title = [
    '数据1:456,789',
    '数据2:123,12',
    '数据3:134,23',
    '数据4:234,234',
    '数据5:123,123',
    '数据6:678,123',
  ];

  const warea = useRef<Record<string, any>>({ x: 250, y: 250, max: 700 });
  const dots = useRef<Record<string, any>[]>([]);
  const everyPer = useRef<number>(0);
  const xOffset = useRef<number>(0);

  const animationFrame1 = useRef<number | null>(null);
  const animationFrame2 = useRef<number | null>(null);

  /**
   * @description 绘制点
   */
  const handleDrawDot = () => {
    const dotCanvas = dotRef.current!;
    dotCanvas.width = circlePieRef.current!.offsetWidth;
    dotCanvas.height = circlePieRef.current!.offsetHeight;
    const ctx = dotCanvas.getContext('2d')!;
    ctx.clearRect(0, 0, dotCanvas.width, dotCanvas.height);
    // 将鼠标坐标添加进去，产生一个用于比对距离的点数组
    const ndots = [warea.current].concat(dots.current);
    dots.current.forEach((dot) => {
      // 粒子位移
      dot.x += dot.xa;
      dot.y += dot.ya;

      // 遇到边界将加速度反向
      dot.xa *= dot.x > dotCanvas.width || dot.x < 0 ? -1 : 1;
      dot.ya *= dot.y > dotCanvas.height || dot.y < 0 ? -1 : 1;

      // 绘制点
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(dot.x - 0.5, dot.y - 0.5, 2, 0, 2 * Math.PI, true);
      ctx.closePath();
      ctx.fill();

      // 循环比对粒子间的距离
      for (let i = 0; i < ndots.length; i++) {
        const d2 = ndots[i];
        if (dot === d2 || d2.x === null || d2.y === null) continue;
        const xc = dot.x - d2.x;
        const yc = dot.y - d2.y;

        // 两个粒子之间的距离
        const dis = Math.sqrt(xc * xc + yc * yc);

        // 距离比
        let ratio;
        // 如果两个粒子之间的距离小于粒子对象的max值，则在两个粒子间画线
        if (dis < d2.max) {
          // 计算距离比
          ratio = (d2.max - dis) / d2.max;
          // 画线
          ctx.beginPath();
          ctx.lineWidth = ratio / 2;
          if (d2 === warea.current) {
            ctx.strokeStyle = 'rgba(255,255,255,0)';
          } else {
            // 距离变大 连线颜色变浅
            ctx.strokeStyle = 'rgba(255,255,255,' + (ratio + 0.2) + ')';
          }
          ctx.moveTo(dot.x, dot.y);
          ctx.lineTo(d2.x, d2.y);
          ctx.stroke();
        }
      }

      // 将已经计算过的粒子从数组中删除
      ndots.splice(ndots.indexOf(dot), 1);
    });

    animationFrame1.current = window.requestAnimationFrame(handleDrawDot);
  };

  /**
   * 旋转的文字
   */
  const drawCircularText = (
    s: typeof circle,
    string: string,
    startAngle: number,
    endAngle: number,
    n: number,
    context: CanvasRenderingContext2D,
  ) => {
    let angleDecrement, // 一个文字所占的角度
      angle = parseFloat(String(startAngle)), // 文字的起始角度
      index = 0, // 文字的索引值
      character; // 当前要画的文字

    const radius = s.radius; // 文字环绕的中心圆半径
    const arr = string.split(':');

    context.save();
    context.fillStyle = '#fff';
    context.font = '12px 微软雅黑 ';
    context.textAlign = 'center';
    context.textBaseline = 'middle';

    if (n < 2 || n === 5) {
      // 上三个不需要反转的文字
      while (index < string.length) {
        character = string.charAt(index);

        const maxEndAngle = arr[0].indexOf(character) >= 0 ? (arr[0].length > 6 ? -3 : -1) : 6;
        angleDecrement = (startAngle - endAngle) / (string.length + maxEndAngle);

        context.save();
        context.beginPath();
        context.translate(s.x + Math.cos(angle) * radius, s.y + Math.sin(angle) * radius);
        context.rotate(Math.PI / 2 + angle);
        context.fillText(character, 0, 0);
        angle -= angleDecrement;
        index++;
        context.restore();
      }
    } else {
      // 下面三个需要反转的文字
      while (index < string.length) {
        character = string.split('').reverse().join('').charAt(index); // 字符串反转

        const maxEndAngle = arr[1].indexOf(character) >= 0 ? 6 : arr[0].length > 6 ? -3 : -1;
        angleDecrement = (startAngle - endAngle) / (string.length + maxEndAngle);

        context.save();
        context.beginPath();
        context.translate(s.x + Math.cos(angle) * radius, s.y + Math.sin(angle) * radius);
        context.rotate(-Math.PI / 2 + angle); // 旋转文字
        context.fillText(character, 0, 0);
        angle -= angleDecrement;
        index++;
        context.restore();
      }
    }

    context.restore();
  };

  /**
   * 画中心圆
   */
  const drawCircle = (context: CanvasRenderingContext2D) => {
    context.beginPath();
    context.fillStyle = '#209ADF';
    context.arc(circle.x, circle.y, 120, 0, 2 * Math.PI);
    context.fill();
    context.beginPath();
    context.arc(circle.x, circle.y, 120, 0, 2 * Math.PI);
    context.clip();
  };

  /**
   * 画sin 曲线函数
   */
  const drawSin = (curXOffset: number, ctx: CanvasRenderingContext2D, nowRange: number) => {
    const mW = 240;
    const mH = 240;
    const sX = 0;
    const axisLength = mW; //轴长
    const waveWidth = 0.04; //波浪宽度,数越小越宽
    const waveHeight = 12; //波浪高度,数越大越高
    ctx.save();
    ctx.translate(130, 130);
    const points = []; //用于存放绘制Sin曲线的点
    ctx.beginPath();
    //在整个轴长上取点
    for (let x = sX; x < sX + axisLength; x += 20 / axisLength) {
      //此处坐标(x,y)的取点，依靠公式 “振幅高*sin(x*振幅宽 + 振幅偏移量)”
      const y = -Math.sin((sX + x) * waveWidth + curXOffset);
      const dY = mH * (1 - nowRange / 100);
      points.push([x, dY, dY + y * waveHeight]);
      ctx.lineTo(x, dY + y * waveHeight);
    }
    //封闭路径
    ctx.lineTo(axisLength, mH);
    ctx.lineTo(sX, mH);
    ctx.lineTo(points[0][0], points[0][1]);
    ctx.fillStyle = '#2C50B1';
    ctx.fill();

    ctx.restore();
  };

  /**
   * 中心显示文字
   */
  const drawText = (ctx: CanvasRenderingContext2D, nowRange: number) => {
    ctx.save();
    ctx.translate(130, 130);
    let size = 50;
    ctx.font = size + 'px Microsoft Yahei';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#95EFFF';
    ctx.fillText(nowRange + '%', 120, 120 - size / 2);
    ctx.restore();
    ctx.save();
    size = 25;
    ctx.translate(130, 130);
    ctx.font = size + 'px Microsoft Yahei';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#95EFFF';
    ctx.fillText('平均值', 120, 120 + size);
    ctx.restore();
  };

  const handleDrawPie = (curEveryPer: number, context: CanvasRenderingContext2D) => {
    context.save();
    context.fillStyle = 'rgba(18,55,88,.2)';
    context.beginPath();
    context.arc(circle.x, circle.y, 245, 0, 2 * Math.PI, true);
    context.closePath();
    context.fill();
    context.restore();

    /** 外圆 */
    context.save();
    context.shadowBlur = 50;
    context.shadowColor = '#123959';
    context.fillStyle = '#080D27';
    context.beginPath();
    context.arc(circle.x, circle.y, 235, 0, 2 * Math.PI, true);
    context.closePath();
    context.fill();
    context.restore();

    /** 弧度转换 */
    const rads = (x: number) => (Math.PI * x) / 180;

    for (let i = 0; i < title.length; i++) {
      // 绘制文字
      context.save();
      // 画文字
      drawCircularText(circle, title[i], rads(i * 60 - 110), rads(i * 60 - 65), i, context);
      context.restore();
    }

    // 旋转小球
    const x = 240 * Math.cos(curEveryPer);
    const y = 240 * Math.sin(curEveryPer);
    context.save();
    context.fillStyle = 'rgb(56,252,253)';
    context.shadowBlur = 80;
    context.shadowColor = '#39E9EE';
    context.translate(circle.x, circle.y);
    context.beginPath();
    context.arc(x, y, 5, 0, 2 * Math.PI);
    context.arc(-x, -y, 5, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
    context.restore();
    //
    context.save();
    context.fillStyle = '#153776';
    context.beginPath();
    context.arc(circle.x, circle.y, 200, 0, 2 * Math.PI, true);
    context.closePath();
    context.fill();

    context.fillStyle = '#121535';
    context.beginPath();
    context.arc(circle.x, circle.y, 190, 0, 2 * Math.PI, true);
    context.closePath();
    context.fill();

    //内圆
    const nowRange = 36;
    context.save();

    drawCircle(context);

    drawSin(xOffset.current, context, nowRange);
    drawText(context, nowRange);
    context.restore();
    for (let i = 0; i < 6; i++) {
      //绘制刻度。
      context.save();
      context.translate(circle.x, circle.y);
      context.rotate(-Math.PI / 2 + Math.PI / 6 + (i * Math.PI) / 3); //旋转坐标轴。坐标轴x的正方形从 向上开始算起
      context.beginPath();
      context.moveTo(190, 0);
      context.lineTo(200, 0);
      context.lineWidth = 4;
      context.strokeStyle = '#0A122D';
      context.stroke();
      context.closePath();
      context.restore();
    }
  };

  const handleAct = () => {
    // 清空画布
    const canvas = canvasRef.current!;
    canvas.style.width = circlePieRef.current!.offsetHeight + 'px';
    canvas.style.height = circlePieRef.current!.offsetHeight + 'px';
    const context = canvas.getContext('2d')!;
    context.clearRect(0, 0, canvas.width, canvas.height);
    handleDrawPie(everyPer.current, context);
    animationFrame2.current = window.requestAnimationFrame(handleAct);
    everyPer.current += Math.PI / 180;
    xOffset.current += 0.07; //波浪速度，数越大速度越快
  };

  /**
   * 初始化，挂载触发
   */
  const onMounted = () => {
    // 重置圆点位置的集合
    dots.current = [];

    for (let i = 0; i < 200; i++) {
      // 随机200个运动的圆点
      const x = Math.random() * circlePieRef.current!.offsetWidth; // 随机的x偏移量
      const y = Math.random() * circlePieRef.current!.offsetHeight; // 随机y轴偏移量
      const xa = Math.random() * 2 - 1; // x轴运动速度
      const ya = Math.random() * 2 - 1; // y轴运动速度
      dots.current.push({
        x: x,
        y: y,
        xa: xa,
        ya: ya,
        // 两个圆点之间需要连线的距离
        max: 40,
      });
    }
    handleAct();
    handleDrawDot();
  };
  useEffect(() => {
    onMounted();

    return () => {
      animationFrame1.current && window.cancelAnimationFrame(animationFrame1.current);
      animationFrame2.current && window.cancelAnimationFrame(animationFrame2.current);
    };
  }, []);

  return (
    <div ref={circlePieRef} className='w-full h-full relative'>
      <canvas
        ref={canvasRef}
        width='500'
        height='500'
        className='absolute top-0 left-1/2 -translate-x-1/2'
      ></canvas>
      <canvas ref={dotRef} className='absolute inset-0 bg-[rgba(0,0,0,0)]'></canvas>
    </div>
  );
});

export default CirclePieChart;
