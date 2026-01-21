# 中国常用服务电话指南 - Vue3版本

这是一个基于Vue 3框架构建的中国常用服务电话指南网站，提供紧急救援、政务服务、快递物流等常用电话号码查询服务。

## 功能特性

- 🚨 紧急救援电话（110、119、120、122等）
- 🏛️ 政务服务热线（12345、12315、12333等）
- 📦 快递物流服务电话
- 📍 紧急定位助手（GPS坐标获取）
- 🔍 智能搜索功能
- 📱 响应式设计，支持移动端
- 🎨 现代化UI设计，使用Tailwind CSS

## 技术栈

- **前端框架**: Vue 3 + Composition API
- **路由管理**: Vue Router 4
- **构建工具**: Vite
- **样式框架**: Tailwind CSS
- **图标库**: Font Awesome 6
- **字体**: Noto Sans SC（中文字体）

## 项目结构

```
src/
├── assets/          # 静态资源
│   └── styles/      # 样式文件
├── components/      # Vue组件
│   ├── PhoneCard.vue        # 电话卡片组件
│   └── ServiceCategory.vue  # 服务类别组件
├── router/          # 路由配置
│   └── index.js
├── views/           # 页面组件
│   └── HomePage.vue # 主页组件
├── App.vue          # 根组件
└── main.js          # 入口文件
```

## 安装与运行

### 1. 安装依赖

```bash
npm install
```

### 2. 开发模式运行

```bash
npm run dev
```

访问 http://localhost:3000 查看应用

### 3. 构建生产版本

```bash
npm run build
```

### 4. 预览生产版本

```bash
npm run preview
```

## 主要组件说明

### HomePage.vue
主页面组件，包含：
- 顶部导航和搜索栏
- 紧急救援电话区
- 紧急定位助手
- 政务服务热线
- 其他服务类别

### PhoneCard.vue
电话卡片组件，显示：
- 电话号码
- 服务名称
- 服务描述
- 拨打/短信按钮

### ServiceCategory.vue
服务类别组件，用于组织不同类型的服务电话

## 数据管理

应用使用Vue 3的响应式系统管理数据：
- `emergencyPhones`: 紧急救援电话数据
- `governmentPhones`: 政务服务电话数据
- `serviceCategories`: 服务类别数据
- `searchQuery`: 搜索查询状态
- `locationData`: 地理位置数据

## 搜索功能

支持按电话号码、服务名称、关键词进行搜索，搜索结果实时过滤显示。

## 地理位置功能

使用浏览器Geolocation API获取用户当前位置坐标，用于紧急情况下精确报警。

## 浏览器兼容性

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 注意事项

- 紧急定位功能需要用户授权地理位置权限
- 部分功能（如短信报警）在移动端体验更佳
- 建议在HTTPS环境下使用地理位置功能

## 贡献

欢迎提交Issue和Pull Request来改进项目。

## 许可证

MIT License