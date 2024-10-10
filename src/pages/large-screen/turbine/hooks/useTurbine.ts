/**
 * @ Author: willysliang
 * @ CreateTime: 2024-09-27 20:19:12
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-09 15:01:11
 * @ Description: 涡轮机
 */

import * as THREE from 'three';
import { useThree } from './useThree';
import { forEach, size } from 'lodash';
import { v4 as uuid } from 'uuid';
import { animation } from '../utils/common';
import {
  MODEL_SCALES,
  MODEL_URL,
  MODEL_SKELETON_ENUM,
  MODEL_EQUIPMENT_POSITION_PARAMS_ENUM,
} from '../utils/constants';
import { useEffect, useRef } from 'react';

/** 涡轮机 - threejs 绘制 */
export const useTurbine = () => {
  const turbine = new THREE.Group();

  const loading = useRef<boolean>(false);
  const modelSkeleton = useRef<THREE.Object3D>();
  const modelPlane = useRef<THREE.Object3D>();
  const modelEquipment = useRef<THREE.Object3D>();

  /** threejs 的封装调用 */
  const {
    container,
    scene,
    camera,
    control,
    renderMixins,
    loadGLTF,
    loadModels,
    loadAnimate,
    render,
  } = useThree();

  /** 加载灯光 */
  const loadLights = () => {
    const LIGHT_LIST = [
      [100, 100, 100],
      [-100, 100, 100],
      [100, -100, 100],
      [100, 100, -100],
    ];
    forEach(LIGHT_LIST, ([x, y, z]) => {
      const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
      directionalLight.position.set(x, y, z);
      scene.current?.add(directionalLight);
    });
  };

  /** 加载风机骨架 */
  const loadTurbineSkeleton = async () => {
    const { scene: object, animations } = await loadGLTF(MODEL_URL.SKELETON);
    object.scale.set(MODEL_SCALES[0], MODEL_SCALES[1], MODEL_SCALES[2]);
    object.position.set(0, 0, 0);
    loadAnimate(object, animations, animations[0].name);
    object.name = 'skeleton';
    modelSkeleton.current = object;
    turbine.add(object);
  };

  /** 加载风机平台 */
  const loadTurbinePlane = async () => {
    const { scene: object } = await loadGLTF(MODEL_URL.PLANE);
    object.scale.set(MODEL_SCALES[0], MODEL_SCALES[1], MODEL_SCALES[2]);
    object.position.set(0, 0, 0);
    object.name = 'plane';
    modelPlane.current = object;
    turbine.add(object);
  };

  /** 加载风机设备 */
  const loadTurbineEquipments = async () => {
    const { scene: object } = await loadGLTF(MODEL_URL.EQUIPMENT);
    object.scale.set(MODEL_SCALES[0], MODEL_SCALES[1], MODEL_SCALES[2]);
    object.name = 'equipment';
    modelEquipment.current = object;
    turbine.add(object);
  };

  /** 风机骨架消隐动画 */
  const skeletonAnimation = () => {
    const shellModel = modelSkeleton.current?.getObjectByName(MODEL_SKELETON_ENUM.ColorMaterial);
    const clippingPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 3.5);
    shellModel?.traverse((mesh) => {
      if (!(mesh instanceof THREE.Mesh)) return undefined;
      mesh.material = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 1,
        roughness: 0.7,
      });
      // 白色外壳消隐效果
      mesh.material.clippingPlanes = [clippingPlane];
      return undefined;
    });
    const uid = uuid();
    renderMixins.set(uid, () => {
      if (clippingPlane.constant <= -0.1) {
        modelSkeleton.current?.remove(shellModel!);
        renderMixins.delete(uid);
      }
      clippingPlane.constant -= 0.01;
    });
  };

  /** 风机平台动画 */
  const planeAnimation = () => {
    const texture = (modelPlane.current?.children[0] as any)?.material?.map;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    const uid = uuid();
    renderMixins.set(uid, () => {
      const count = texture.repeat.y;
      if (count <= 10) {
        texture.repeat.x += 0.01;
        texture.repeat.y += 0.02;
      } else {
        texture.repeat.x = 0;
        texture.repeat.y = 0;
      }
    });
  };

  /** 地面和风机骨架消隐藏 */
  const groundAndSkeletonHideAnimation = () => {
    const clippingPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 3.5);
    modelSkeleton.current?.traverse((mesh) => {
      if (!(mesh instanceof THREE.Mesh)) return undefined;
      mesh.material.clippingPlanes = [clippingPlane];
      return undefined;
    });
    modelPlane.current?.traverse((mesh) => {
      if (!(mesh instanceof THREE.Mesh)) return undefined;
      mesh.material.clippingPlanes = [clippingPlane];
      return undefined;
    });
    const uid = uuid();
    renderMixins.set(uid, () => {
      if (clippingPlane.constant <= -0.1) renderMixins.delete(uid);
      clippingPlane.constant -= 0.04;
    });
  };

  /** 地面和风机骨架显示 */
  const groundAndSkeletonShowAnimation = () => {
    const clippingPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), -0.1);
    modelSkeleton.current?.traverse((mesh) => {
      if (!(mesh instanceof THREE.Mesh)) return undefined;
      mesh.material.clippingPlanes = [clippingPlane];
      return undefined;
    });
    modelPlane.current?.traverse((mesh) => {
      if (!(mesh instanceof THREE.Mesh)) return undefined;
      mesh.material.clippingPlanes = [clippingPlane];
      return undefined;
    });
    const uid = uuid();
    renderMixins.set(uid, () => {
      if (clippingPlane.constant >= 3.5) renderMixins.delete(uid);
      clippingPlane.constant += 0.04;
    });
  };

  /** 设备分解动画 */
  const equipmentDecomposeAnimation = async () => {
    groundAndSkeletonHideAnimation();
    modelEquipment.current?.updateMatrixWorld();
    modelEquipment.current?.children.forEach((child: THREE.Object3D) => {
      const params = MODEL_EQUIPMENT_POSITION_PARAMS_ENUM[child.name];
      animation({
        from: child.position,
        to: params.DECOMPOSE,
        duration: 2 * 1000,
        onUpdate: (position) => {
          child.position.set(position.x, position.y, position.z);
        },
      });
    });
  };

  /** 设备合成动画 */
  const equipmentComposeAnimation = async () => {
    groundAndSkeletonShowAnimation();
    modelEquipment.current?.children.forEach((child: THREE.Object3D) => {
      const params = MODEL_EQUIPMENT_POSITION_PARAMS_ENUM[child.name];
      animation({
        from: child.position,
        to: params.COMPOSE,
        duration: 2 * 1000,
        onUpdate: (position) => {
          child.position.set(position.x, position.y, position.z);
        },
      });
    });
  };

  /**
   * 风机设备点击事件
   */
  let equipmentList: THREE.Mesh[] = [];

  const handler = (event: MouseEvent) => {
    const el = container.current as HTMLDivElement;
    const mouse = new THREE.Vector2(
      (event.clientX / el.offsetWidth) * 2 - 1,
      -(event.clientY / el.offsetHeight) * 2 + 1,
    );
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera.current!);
    const intersects = raycaster.intersectObject(modelEquipment.current!, true);
    if (size(intersects) <= 0) return undefined;
    const equipment = <any>intersects[0].object;
    if (!equipment) return undefined;
    equipmentList.forEach((child: any) => {
      child.material.emissive.setHex(child.currentHex);
    });
    equipment.currentHex = equipment.currentHex ?? equipment.material.emissive.getHex();
    equipment.material.emissive.setHex(0xff0000);
    return undefined;
  };

  const onEquipmentClick = () => {
    equipmentList = [];
    modelEquipment.current?.traverse((mesh) => {
      if (!(mesh instanceof THREE.Mesh)) return undefined;
      const { material } = mesh;
      mesh.material = material.clone();
      equipmentList.push(mesh);
      return undefined;
    });

    document.removeEventListener('click', handler);
    document.addEventListener('click', handler);
  };

  /**
   * 挂载
   */
  useEffect(() => {
    const load = async () => {
      loading.current = true;
      scene.current?.add(turbine);
      camera.current?.position.set(-1, 3.5, 2);
      control.current?.target.set(0, 2.6, 0);
      control.current?.update();
      loadLights();
      await loadModels([loadTurbineSkeleton(), loadTurbinePlane(), loadTurbineEquipments()]);
      loading.current = false;
      // 当全部模型加载时完毕触发
      render();
      onEquipmentClick();
      skeletonAnimation();
      planeAnimation();
    };

    load();

    return () => {
      document.removeEventListener('click', handler);
    };
  }, []);

  return {
    container,
    loading,
    turbine,
    equipmentDecomposeAnimation,
    equipmentComposeAnimation,
  };
};
