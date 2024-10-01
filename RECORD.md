# 提交规范

通过 commitlint + husky 在工作流中进行校验约束，属于通用的规范。通常提交遵循以下模式，提交包含三个部分：Header（第一行），Body 和 Footer。

```txt
// optional 表示可选的意思

<type>(optional scope): <description>

[optional body]

[optional footer(s)]

// 这是一个简单示例

fix: prevent racing of requests


// 这是一个完整示例，包含多段body，和footer

fix(utils: prevent racing of requests

Introduce a request id and a reference to latest request. Dismiss
incoming responses other than from latest request.

Remove timeouts which were used to mitigate the racing issue but are
obsolete now.

Reviewed-by: Z
Refs: #123
```

其中，Header (第一行) 是必需的，Body 和 Footer 可以省略

● type 类型：
○ feat：新增功能
○ fix：bug 修复
○ docs：只更新文档
○ style：不影响代码含义的更改，例如空格，格式化等
○ refactor：既没有修复bug也没有添加功能的代码更改
○ perf：改进性能的代码更改
○ test：添加缺失的测试或者更改现有的测试
○ build：影响构建系统或外部依赖关系的更改，例如 vite，npm 配置的更改
○ ci：Ci 配置文件和脚本的更改，例如 Travis 配置的更改
○ chore：其他不修改 src 或测试文件的更改
○ revert：还原之前的提交
● scope 范围：变更的影响范围，不同项目会有区别，例如 component，page，utils，build
● description 描述：简短的变更描述
● body 描述：更长更完整的变更描述，可以分成多行
● footer 页脚注释：用来详细描述不兼容改动或者关闭issure

# 问题

## 2024年6月22日

问题：在弹窗组件里使用 useEffect 设置 document.addEventListener 的 click 事件初始化会被出发

- 问题原因：因为这个弹窗组件是根据一个按钮的点击事件来进行触发的，在使用变量控制该弹窗组件的显隐时，因为渲染比按钮的事件冒泡触发要快，所以会导致在 useEffect 添加事件时也会被触发。
- 问题来源的文件：src\components\layout\LayoutHeader\app-user-menu\index.tsx
- 解决方案：
  1/ 在 useEffect 中使用 setTimeout 来进行添加事件
  2/ 在父组件的按钮点击事件中使用 event.stopProgation() 来阻止冒泡事件的触发

# 记录

## 2024年10月1日

- feat(views): [large-screen/turbine] 漩涡-大风车模块3D

## 2024年9月27日

- chore: 更新icon及格式化忽略事项
- build: 更改页面 base 路径，及使用 hash 路由模式来适配 base 地址的变更
- fix: 修复构建时校验错误问题
- build: 更新 GitHub CI/CD 构建流程
- feat(views): [large-screen] 添加大屏看板模块入口

## 2024年9月26日

- perf(comp): [DialogPrompt] 优化提示弹窗组件的样式

## 2024年9月25日

- feat(views): [working-hours] 添加工时模块

## 2024年9月23日

- fix(utils): [utils/format] 修复 createBEM 方法在传入 Modify 并使用 CSS module 时样式无法有效使用问题

## 2024年9月20日

- feat(comp): [DragSort] 新增 拖拽排序组件
- perf(layout): 优化页面显示

## 2024年9月6日

- perf(utils): [utils/format] 优化 createBEM 方法
- test(utils): [__test_createBem] 添加测试/期望 createBEM 的处理逻辑及返回
- feat(comp): [Dialog、DialogPrompt] 新增 通用弹窗组件Dialog、业务通用提示弹窗组件DialogPrompt
- perf(layout): 优化页面显示

## 2024年7月11日

- chore: 增加提交规范
- perf: [account/setting] 优化个人账号设置表单样式

## 2024年6月28日

- refactor: 优化弹窗的显隐方式

## 2024年6月26日

- feat: 添加个人资料页入口

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
