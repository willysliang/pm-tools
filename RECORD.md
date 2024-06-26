# 问题

## 2024年6月22日

问题：在弹窗组件里使用 useEffect 设置 document.addEventListener 的 click 事件初始化会被出发

- 问题原因：因为这个弹窗组件是根据一个按钮的点击事件来进行触发的，在使用变量控制该弹窗组件的显隐时，因为渲染比按钮的事件冒泡触发要快，所以会导致在 useEffect 添加事件时也会被触发。
- 问题来源的文件：src\components\layout\LayoutHeader\app-user-menu\index.tsx
- 解决方案：
  1/ 在 useEffect 中使用 setTimeout 来进行添加事件
  2/ 在父组件的按钮点击事件中使用 event.stopProgation() 来阻止冒泡事件的触发

# 记录

## 2024年6月26日

- fix: 增加传送组件，修复深层组件的嵌套弹窗被设置 overflow:hidden 时，弹窗组件无法完全显示

## 2024年6月24日

- feat: 用户-账号设置页

## 2024年6月23日

- feat: 用户嵌套路由及侧边栏

## 2024年6月22日

- feat: 系统404页 & 用户的菜单栏浮层

## 2024年6月21日

- feat: 设置路由

## 2024年6月20日

- feat: 页面大框搭建

## 2024年6月19日

- init: 初始化项目
