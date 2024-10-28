/**
 * @ Author: willysliang
 * @ CreateTime: 2024-10-25 16:30:36
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-28 10:19:58
 * @ Description: 权限管理 - 相关路由
 */

import { lazy } from 'react';
import { DocumentFolder, EditName, UserToUserTransmission } from '@icon-park/react';
import { IRouteConfigMap } from './types';
import { AppRouteLevelType } from './appRoutes';

/**
PM 系统权限管理通常包含以下几个模块：
1. **用户管理模块**：
    - **用户信息维护**：负责添加、修改、删除用户的基本信息，如用户名、密码、联系方式等，确保用户信息的准确性和完整性。
    - **用户账号状态管理**：可以设置用户账号的状态，如正常、锁定、离职、退休等。处于锁定状态的账号无法登录系统，离职或退休状态的账号也会被限制使用，保证系统的安全性和账号的有效性管理。
    - **用户分组管理**：根据行政关系（部门架构）或业务线（业务架构）等维度对用户进行分组。同一组内的用户通常具有相似的功能需求和权限等级，方便进行批量的权限分配和管理。
2. **角色管理模块**：
    - **角色定义与创建**：基于业务管理需求预先在系统中设定好角色标签，如管理员、普通员工、财务人员、项目经理等。每个角色都有明确的权限范围和职责定义。
    - **角色权限分配**：给不同的角色分配相应的权限，这些权限可以是功能菜单的访问权限、具体操作的执行权限或数据的查看和修改权限等。例如，管理员角色可能拥有系统的全部权限，而普通员工角色只能访问和操作与其工作相关的部分功能。
    - **角色继承**：支持角色权限的继承关系，子角色可以继承父角色的全部或部分权限，并在此基础上增加自己特有的权限。这种方式可以简化权限管理，提高管理效率，尤其适用于层级结构较为复杂的组织。
    - **角色互斥**：对于一些存在风险控制需求的业务流程，设置角色之间的互斥关系。例如，在财务审批流程中，一个用户拥有了审批人的角色，就不能同时拥有审核确认的角色，以防止权力滥用和操作风险。
    - **临时角色管理**：针对特殊群体或临时需求创建临时角色，如来访的客户、临时项目的参与人员等。临时角色的权限可以根据具体情况进行灵活配置，并且有一定的有效期限制，过期后自动失效。
3. **权限管理模块**：
    - **功能菜单权限管理**：从功能菜单的层面划分用户权限，是一种较粗颗粒度的管理方式。用户获得功能菜单的权限后，即可使用该菜单栏下的全部数据查看权限和功能操作权限。例如，某个用户被授予了“项目管理”功能菜单的权限，那么他就可以查看和操作该菜单下的所有项目相关信息。
    - **功能操作权限管理**：相比功能菜单权限更加深入，规定不同角色的用户在进入同一菜单页后可执行的具体操作。比如，在一个文档管理系统中，有的用户只能查看文档，而有的用户可以编辑和删除文档。
    - **数据字段权限管理**：是更细颗粒度的权限拆分，实现不同角色的用户在进入同一菜单页时，可见的数据字段存在差异。例如，在销售管理系统中，销售人员可以看到自己的销售业绩数据，而财务人员看到的是业务工单的费用字段。
    - **接口权限管理**：对系统与外部系统或模块之间的接口调用进行权限控制，确保只有经过授权的用户或角色才能访问和使用相关接口，保障系统的数据安全和接口的正确使用。 
 */

/** 枚举 - 权限管理路由类型 */
export enum PermissionRouteEnum {
  /** 用户权限管理 */
  USER_PERMISSION = 'user-permission',
  /** 角色权限管理 */
  ROLE_PERMISSION = 'role-permission',
  /** 菜单权限管理 */
  MENU_PERMISSION = 'menu-permission',
}

/** 权限管理基础 Path */
const PERMISSION_BASE_PATH = `/${AppRouteLevelType.PERMISSION_MANAGEMENT}`;

/**
 * 懒加载的路由地址
 */
const UserPermission = lazy(() => import('@/pages/permission-manage/user-permission'));
const RolePermission = lazy(() => import('@/pages/permission-manage/user-permission'));
const MenuPermission = lazy(() => import('@/pages/permission-manage/user-permission'));

/** 权限路由集合 */
export const PERMISSION_ROUTE_CONFIGS: IRouteConfigMap<PermissionRouteEnum> = {
  [PermissionRouteEnum.USER_PERMISSION]: {
    label: '用户权限管理',
    path: `${PERMISSION_BASE_PATH}/${PermissionRouteEnum.USER_PERMISSION}`,
    icon: EditName,
    key: 'user-permission',
    element: <UserPermission />,
    meta: {},
  },
  [PermissionRouteEnum.ROLE_PERMISSION]: {
    label: '角色权限管理',
    path: `${PERMISSION_BASE_PATH}/${PermissionRouteEnum.ROLE_PERMISSION}`,
    icon: UserToUserTransmission,
    key: 'role-permission',
    element: <RolePermission />,
    meta: {},
  },
  [PermissionRouteEnum.MENU_PERMISSION]: {
    label: '菜单权限管理',
    path: `${PERMISSION_BASE_PATH}/${PermissionRouteEnum.MENU_PERMISSION}`,
    icon: DocumentFolder,
    key: 'menu-permission',
    element: <MenuPermission />,
    meta: {},
  },
};
