/**
 * @ Author: willysliang
 * @ CreateTime: 2024-09-29 11:09:14
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-09-29 16:34:35
 * @ Description: 常量
 */

export const MODEL_SCALES = [0.0001 * 3, 0.0001 * 3, 0.0001 * 3];
export const MODEL_URL = {
  SKELETON: `${import.meta.env.VITE_API_DOMAIN}/models/turbine.glb`,
  PLANE: `${import.meta.env.VITE_API_DOMAIN}/models/plane.glb`,
  EQUIPMENT: `${import.meta.env.VITE_API_DOMAIN}/models/equipment.glb`,
};

export const MODEL_SKELETON_ENUM = {
  WireframeMaterial: '线框材质',
  ColorMaterial: '颜色材质',
};

export const MODEL_EQUIPMENT_ENUM = {
  PRINCIPAL_AXIS: '主轴',
  YAWMOTOR: '偏航电机',
  DYNAMO: '发电机',
  VARIABLE_PADDLE_SYSTEM: '变桨系统',
  CONTROL_CABINET: '控制柜',
  OIL_COOLING_PLANT: '油冷装置',
  ROTOR: '转子',
  AIR_COOLING_PLANT: '风冷装置',
  GEARBOX: '齿轮箱',
};

export const MODEL_EQUIPMENT_POSITION_PARAMS_ENUM = {
  [MODEL_EQUIPMENT_ENUM.PRINCIPAL_AXIS]: {
    COMPOSE: { x: 20437.78515625, y: 8650, z: 0 },
    DECOMPOSE: { x: 20437.78515625, y: 8650, z: 400 },
  },
  [MODEL_EQUIPMENT_ENUM.YAWMOTOR]: {
    COMPOSE: { x: 20437.78515625, y: 8650, z: 0 },
    DECOMPOSE: { x: 21000, y: 8650, z: 100 },
  },
  [MODEL_EQUIPMENT_ENUM.DYNAMO]: {
    COMPOSE: { x: 20437.78515625, y: 8650, z: 0 },
    DECOMPOSE: { x: 20437.78515625, y: 8650, z: -200 },
  },
  [MODEL_EQUIPMENT_ENUM.VARIABLE_PADDLE_SYSTEM]: {
    COMPOSE: { x: 2519.07958984375, y: 29288.677734375, z: 0 },
    DECOMPOSE: { x: 2519.07958984375, y: 29288.677734375, z: 1000 },
  },
  [MODEL_EQUIPMENT_ENUM.CONTROL_CABINET]: {
    COMPOSE: { x: 20437.78515625, y: 8650, z: 0 },
    DECOMPOSE: { x: 20800, y: 8650, z: 0 },
  },
  [MODEL_EQUIPMENT_ENUM.OIL_COOLING_PLANT]: {
    COMPOSE: { x: 20437.78515625, y: 8650, z: 0 },
    DECOMPOSE: { x: 20437.78515625, y: 8850, z: 0 },
  },
  [MODEL_EQUIPMENT_ENUM.ROTOR]: {
    COMPOSE: { x: 20437.78515625, y: 8650, z: 0 },
    DECOMPOSE: { x: 20437.78515625, y: 8650, z: 700 },
  },
  [MODEL_EQUIPMENT_ENUM.AIR_COOLING_PLANT]: {
    COMPOSE: { x: 20437.78515625, y: 8650, z: 0 },
    DECOMPOSE: { x: 20000, y: 8850, z: 0 },
  },
  [MODEL_EQUIPMENT_ENUM.GEARBOX]: {
    COMPOSE: { x: 20437.78515625, y: 8650, z: 0 },
    DECOMPOSE: { x: 20437.78515625, y: 8650, z: 100 },
  },
};
