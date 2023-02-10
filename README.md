# 基于 DRF + React的疫情防控社区志愿者管理系统

## 系统简介

基于Django + React的疫情防控社区志愿者管理系统的设计与实现是采用Python，Html、JavaScript等语言，Django框架、DRF框架、React框架、Ant Design 组件库、Umi、Ant Design Charts、Ant Design Pro、MYSQL数据库，基于B/S结构进行设计开发。系统主要包括三大功能模块，即管理员功能模块、普通用户功能模块、公益企业功能模块。系统功能齐全，实现了对志愿者以及疫情防控公益活动管理的系统化、科学化，既可以提高服务质量，又大大的促进了管理系统的发展。

- 前端采用React、Ant Design Pro、Pro Components。
- 后端采用DRF（Django REST Framework）、Django。
- 权限认证使用DRF自带的权限认证，支持不用角色用户登录。
- 数据库采用MySQL5.7。

## 功能介绍

### 公益企业用户功能

- 登录
- 活动管理：主要对公益活动信息进行添加、删除、修改、查询、统计等操作。
- 报名管理：主要对志愿者的报名信息进行审核操作。
- 个人中心：修改个人基本信息和密码。

### 管理员用户功能

- 登录
- 活动管理：主要对公益活动信息进行统计、汇总操作。
- 报名管理：主要对志愿者的报名信息进行统计、汇总操作。
- 用户管理：主要对系统用户信息进行添加、删除、修改、查询、汇总统计等操作，同时对忘记密码的用户进行重置密码操作，对违规用户进行注销账号操作等。
- 权限管理：主要对系统不同角色用户进行权限分配。
- 个人中心：修改个人基本信息和密码。

### 普通用户功能

- 登录
- 活动列表展示：主要是对各个公益企业发布的公益活动进行查看及报名参加。
- 报名列表展示：主要是查看自己的报名信息，审核状态等。
- 个人中心：修改个人基本信息和密码。

## 目录结构

前端项目位于project-react文件夹内。

后端项目位于project-drf文件夹内。

SQL文件位于volunteersys.sql，需要使用MySQl5.7.x版本。

## 技术介绍

**前端**：React + umi + Ant Design Pro + Ant Design + Pro Components + AntV 

**后端**：DRF + Django + swagger + MySQL

## 快速开始

### 后端project-drf

```python shell
# install requirements
pip install -r requirements.txt

# database migrations
python manage.py makemigrations
python manage.py migrate

# runserver at 127.0.0.1:80
python manage.py runserver 80
```

### 前端project-react

```shell
# 安装依赖
yarn
# 添加依赖
yarn add xxx
# 启动服务
yarn start
```

