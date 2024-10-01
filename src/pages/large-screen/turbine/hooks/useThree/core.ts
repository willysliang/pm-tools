/**
 * @ Author: willysliang
 * @ CreateTime: 2024-09-28 12:31:13
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-01 10:20:10
 * @ Description: three.js 的核心类
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';

/** three.js 封装 */
export class ThreeBase {
  static initScene() {
    const scene = new THREE.Scene();
    return scene;
  }

  static initCamera(element: HTMLElement) {
    const fov = 20;
    const near = 0.1;
    const far = 2000;
    const aspect = element.offsetWidth / element.offsetHeight;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 0);
    return camera;
  }

  static initCSSRender(element: HTMLElement) {
    const CSSRenderer = new CSS2DRenderer();
    CSSRenderer.setSize(element.offsetWidth, element.offsetHeight);
    CSSRenderer.domElement.style.position = 'absolute';
    CSSRenderer.domElement.style.top = '0px';
    element.appendChild(CSSRenderer.domElement);
    return CSSRenderer;
  }

  static initRenderer(element: HTMLElement) {
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    // renderer.setClearColor('#000')
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;
    renderer.setSize(element.offsetWidth, element.offsetHeight);
    renderer.localClippingEnabled = true;
    element.appendChild(renderer.domElement);
    return renderer;
  }

  static initControl(camera: THREE.Camera, domElement: HTMLElement) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const control = new OrbitControls(camera, domElement);
    control.target = new THREE.Vector3(0, 0, 0);
    control.update();
    return control;
  }
}
