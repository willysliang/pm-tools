/**
 * @ Author: willysliang
 * @ CreateTime: 2024-09-28 12:54:52
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-09-30 09:52:19
 * @ Description: three.js 的封装
 */

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';
import TWEEN from '@tweenjs/tween.js';
import { isFunction } from 'lodash-es';
import { ThreeBase } from './core';
import { useLoading } from '../common/useLoading';

/** three.js 的封装 */
export function useThree() {
  const container = useRef<HTMLElement>();
  const { loading, openLoading, closeLoading } = useLoading(true, 500);
  const scene = useRef<THREE.Scene>();
  const camera = useRef<THREE.Camera>();
  const renderer = useRef<THREE.WebGLRenderer>();
  const CSSRenderer = useRef<CSS2DRenderer>();
  const control = useRef<OrbitControls>();
  const mixers = useRef<Array<THREE.AnimationMixer>>([]);
  const clock = new THREE.Clock();
  const composers = new Map();
  const renderMixins = new Map();

  useEffect(() => {
    const el = container.current as HTMLElement;

    scene.current = ThreeBase.initScene();
    camera.current = ThreeBase.initCamera(el);
    renderer.current = ThreeBase.initRenderer(el);
    CSSRenderer.current = ThreeBase.initCSSRender(el);
    control.current = ThreeBase.initControl(camera.current!, CSSRenderer.current.domElement);
  }, []);

  const render = () => {
    const delta = new THREE.Clock().getDelta();
    renderer.current!.render(scene.current!, camera.current!);
    const mixerUpdateDelta = clock.getDelta();
    mixers.current.forEach((mixer) => mixer.update(mixerUpdateDelta));
    composers.forEach((composer) => composer.render(delta));
    renderMixins.forEach((mixin) => isFunction(mixin) && mixin());
    CSSRenderer.current!.render(scene.current!, camera.current!);
    TWEEN.update();
    requestAnimationFrame(() => render());
  };

  const loadModels = async (tasks: Promise<unknown>[]) => {
    openLoading();
    await Promise.all(tasks);
    closeLoading();
  };

  const loadGLTF = (url: string): Promise<GLTF> => {
    const loader = new GLTFLoader();
    const onCompleted = (object: GLTF, resolve: GLTF) => resolve(object);
    return new Promise<GLTF>((resolve) => {
      loader.load(url, (object: GLTF) => onCompleted(object, resolve));
    });
  };

  const loadAnimate = (
    mesh: THREE.Mesh | THREE.AnimationObjectGroup | THREE.Group,
    animations: Array<THREE.AnimationClip>,
    animationName: string,
  ) => {
    const mixer = new THREE.AnimationMixer(mesh);
    const clip = THREE.AnimationClip.findByName(animations, animationName);
    if (!clip) return undefined;
    const action = mixer.clipAction(clip);
    action.play();
    mixers.current.push(mixer);
    return undefined;
  };

  return {
    container,
    loading,
    scene,
    camera,
    renderer,
    CSSRenderer,
    control,
    mixers,
    clock,
    composers,
    renderMixins,
    render,
    loadGLTF,
    loadAnimate,
    loadModels,
  };
}

export default useThree;
