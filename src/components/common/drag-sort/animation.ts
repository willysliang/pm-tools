/**
 * @ Author: willysliang
 * @ CreateTime: 2024-09-18 11:28:48
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-09-20 09:16:47
 * @ Description: Flip动画类
 */

/** 位置的类型 */
interface IPosition {
  x: number;
  y: number;
}

/** Flip动画 */
export class Flip {
  /** 正在移动动画的类名 (用作标识) */
  static movingClass = '__flipMoving__';

  /** dom元素 */
  private dom: Element;
  /** 原位置 */
  private firstPosition: IPosition | null = null;
  /** 动画时间 */
  private duration: number;

  constructor(dom: Element, duration = 500) {
    this.dom = dom;
    this.duration = duration;
  }

  /** 获得元素的当前位置信息 */
  private getDomPosition(): IPosition {
    const rect = this.dom.getBoundingClientRect();
    return {
      x: rect.left,
      y: rect.top,
    };
  }

  /** 给原始位置赋值 */
  recordFirst(firstPosition?: IPosition) {
    if (!firstPosition) firstPosition = this.getDomPosition();
    this.firstPosition = { ...firstPosition };
  }

  /** 播放动画 */
  play(callback?: () => unknown) {
    if (!this.firstPosition) {
      throw new Error('请先记录原始位置');
    }

    const lastPositon = this.getDomPosition();
    // 位置变更
    const diff: IPosition = {
      x: lastPositon.x - this.firstPosition.x,
      y: lastPositon.y - this.firstPosition.y,
    };
    if (!diff.x && !diff.y) return;

    this.dom.classList.add(Flip.movingClass);
    this.dom.animate(
      [
        { transform: `translate(${-diff.x}px, ${-diff.y}px)` },
        { transform: `translate(0px, 0px)` },
      ],
      { duration: this.duration },
    );

    setTimeout(() => {
      this.dom.classList.remove(Flip.movingClass);
      callback && callback();
    }, this.duration);
  }
}

/** Flip多元素同时触发 */
export class FlipList {
  /** 正在移动动画的类名 (用作标识) */
  static movingClass = Flip.movingClass;

  /** Flip列表 */
  private flips: Flip[];

  /** Flip多元素同时触发 - 构造函数
   * @param domList 要监听的DOM列表
   * @param duration 动画时长，默认500ms
   */
  constructor(domList: Element[], duration?: number) {
    this.flips = domList.map((k) => new Flip(k, duration));
  }

  /** 记录全部初始位置 */
  recordFirst() {
    this.flips.forEach((flip) => flip.recordFirst());
  }

  /** 播放全部动画 */
  play(callback?: () => unknown) {
    this.flips.forEach((flip) => flip.play(callback));
  }
}
