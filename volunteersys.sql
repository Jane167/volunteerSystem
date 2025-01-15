/*
 Navicat Premium Data Transfer

 Source Server         : mysqlConnect
 Source Server Type    : MySQL
 Source Server Version : 50737
 Source Host           : localhost:3306
 Source Schema         : volunteersys

 Target Server Type    : MySQL
 Target Server Version : 50737
 File Encoding         : 65001

 Date: 15/01/2025 14:24:26
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for activity
-- ----------------------------
DROP TABLE IF EXISTS `activity`;
CREATE TABLE `activity`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `desc` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `publish_company_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `address` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `start_date` date NOT NULL,
  `start_time` time(6) NOT NULL,
  `demand` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `need_person_num` int(11) NOT NULL,
  `apply_person_num` int(11) NOT NULL,
  `pass_person_num` int(11) NOT NULL,
  `create_time` datetime(6) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of activity
-- ----------------------------
INSERT INTO `activity` VALUES (1, '校园志愿活动', '校园志愿活动招募令', '陕西国际商贸学院志愿者协会', '陕西省咸阳市', '2023-04-22', '16:20:00.000000', '年龄不限', 10, 3, 2, '2022-11-07 23:53:24.000000');
INSERT INTO `activity` VALUES (2, '我爱地球志愿活动', '保护地球，从我做起，北京奥林匹克公园内捡拾垃圾。', '北京志愿者协会', '北京', '2023-04-20', '13:40:00.000000', '有经验者优先', 20, 2, 0, '2022-11-07 15:58:26.708405');
INSERT INTO `activity` VALUES (3, '清明节祭扫活动', '为继承和发扬革命传统，振奋民族精神，切实做好安全保障和宣传引导工作，创造安全、文明、和谐的祭祀环境，让居民群众在缅怀英烈、追思纪念、享受当今美好生活的同时弘扬新时代祭祀风尚。社区联合社会工作服务中心开展以“文明祭祀，春暖清明”为主题的清明节祭扫活动。', '社会工作服务中心', '陕西省渭南市', '2023-04-05', '08:40:00.000000', '热爱公益', 15, 1, 0, '2023-01-31 04:03:28.499050');
INSERT INTO `activity` VALUES (4, '文化宣传志愿服务项目', '志愿服务文化宣传 志愿服务网站、微信、微博等新媒体运维 志愿服务项目文案及新闻稿撰写 志愿服务宣传文案图文编辑 志愿服务视频拍摄及剪辑', '志愿者协会', '陕西省西安市', '2023-04-28', '09:00:00.000000', '1.熟悉微信公众号编辑流程，能够熟练使用编辑软件并完成推送 2.每周能够至少完成两篇微信推文编发推送，每周至少保证上岗一日，约2-4小时线上工作时长', 10, 2, 1, '2023-02-01 08:32:52.898665');
INSERT INTO `activity` VALUES (5, '学雷锋公益活动', '学习雷锋精神，争做时代新榜样', '长安区志愿者协会', '陕西省西安市长安区', '2023-04-18', '12:00:00.000000', '有奉献精神。', 12, 2, 1, '2023-03-19 13:09:52.942226');
INSERT INTO `activity` VALUES (6, '交通指挥志愿服务', '为进一步弘扬中华民族传统美德，培育和践行社会主义核心价值观，引导支队广大团员及青年民辅警积极投身于精神文明建设中，结合公安交管工作实际，交警支队团总支组织广大团员及青年民辅警以“争创文明典范 共建志愿之城”为主题开展交通指挥志愿服务。', '交警队志愿者协会', '西安市', '2025-01-15', '15:00:00.000000', '有经验者优先', 50, 1, 1, '2023-04-07 09:06:06.089756');
INSERT INTO `activity` VALUES (7, '光盘行动志愿服务', '我校青年志愿者联合会在校团委统一部署下积极响应“光盘行动”倡议号召，面向全校同学发起志愿服务招募、宣传，组织志愿者在餐厅一层开展光盘行动志愿活动。', '陕西国际商贸学院志愿者协会', '陕西国际商贸学院', '2025-01-15', '14:00:00.000000', '有经验者优先', 10, 0, 0, '2023-04-18 12:28:59.329494');

-- ----------------------------
-- Table structure for apply
-- ----------------------------
DROP TABLE IF EXISTS `apply`;
CREATE TABLE `apply`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `age` int(11) NOT NULL,
  `sex` int(11) NOT NULL,
  `address` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `tel` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `apply_status` int(11) NOT NULL,
  `apply_time` datetime(6) NOT NULL,
  `belonging_activity_id` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `apply_belonging_activity_id_7215f03c_fk_activity_id`(`belonging_activity_id`) USING BTREE,
  CONSTRAINT `apply_belonging_activity_id_7215f03c_fk_activity_id` FOREIGN KEY (`belonging_activity_id`) REFERENCES `activity` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of apply
-- ----------------------------
INSERT INTO `apply` VALUES (2, '张海鹏', 20, 1, '西安市长安区', '17612931234', 1, '2023-04-19 10:13:03.000000', 1);
INSERT INTO `apply` VALUES (3, '李佳音', 18, 0, '渭南市临渭区', '12345678910', 2, '2023-04-13 11:12:39.000000', 2);
INSERT INTO `apply` VALUES (4, '秦洋', 11, 2, '咸阳市秦都区', '17612937572', 1, '2023-04-21 13:11:01.000000', 5);
INSERT INTO `apply` VALUES (5, '高丽', 22, 1, '西安市莲湖区', '13488888888', 1, '2023-04-12 07:25:18.000000', 4);
INSERT INTO `apply` VALUES (6, '陆伟', 19, 2, '渭南市华州区', '18966666666', 0, '2023-04-22 13:26:57.000000', 3);
INSERT INTO `apply` VALUES (7, '王敏', 21, 2, '咸阳市渭城区', '17655555555', 2, '2023-04-19 22:27:29.000000', 2);
INSERT INTO `apply` VALUES (8, '潘静', 23, 1, '西安市未央区', '15699999999', 1, '2023-04-16 11:28:01.000000', 1);
INSERT INTO `apply` VALUES (9, '宋芳', 20, 2, '宝鸡市陈仓区', '19211111111', 0, '2023-04-19 09:45:49.000000', 4);
INSERT INTO `apply` VALUES (10, '胡秀兰', 17, 2, '延安市宝塔区', '13577777777', 0, '2023-04-19 12:46:25.000000', 5);
INSERT INTO `apply` VALUES (11, '薛明', 21, 1, '西安市雁塔区', '13412340000', 0, '2023-04-11 14:47:10.000000', 1);
INSERT INTO `apply` VALUES (12, '曾涛', 18, 2, '渭南市高新区', '17612937572', 1, '2023-04-18 12:25:27.782545', 6);

-- ----------------------------
-- Table structure for apply_applystatus
-- ----------------------------
DROP TABLE IF EXISTS `apply_applystatus`;
CREATE TABLE `apply_applystatus`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of apply_applystatus
-- ----------------------------

-- ----------------------------
-- Table structure for auth_group
-- ----------------------------
DROP TABLE IF EXISTS `auth_group`;
CREATE TABLE `auth_group`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of auth_group
-- ----------------------------
INSERT INTO `auth_group` VALUES (3, 'common');
INSERT INTO `auth_group` VALUES (2, 'company');
INSERT INTO `auth_group` VALUES (1, 'manager');

-- ----------------------------
-- Table structure for auth_group_permissions
-- ----------------------------
DROP TABLE IF EXISTS `auth_group_permissions`;
CREATE TABLE `auth_group_permissions`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `auth_group_permissions_group_id_permission_id_0cd325b0_uniq`(`group_id`, `permission_id`) USING BTREE,
  INDEX `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm`(`permission_id`) USING BTREE,
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of auth_group_permissions
-- ----------------------------

-- ----------------------------
-- Table structure for auth_permission
-- ----------------------------
DROP TABLE IF EXISTS `auth_permission`;
CREATE TABLE `auth_permission`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `auth_permission_content_type_id_codename_01ab375a_uniq`(`content_type_id`, `codename`) USING BTREE,
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 41 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of auth_permission
-- ----------------------------
INSERT INTO `auth_permission` VALUES (1, 'Can add log entry', 1, 'add_logentry');
INSERT INTO `auth_permission` VALUES (2, 'Can change log entry', 1, 'change_logentry');
INSERT INTO `auth_permission` VALUES (3, 'Can delete log entry', 1, 'delete_logentry');
INSERT INTO `auth_permission` VALUES (4, 'Can view log entry', 1, 'view_logentry');
INSERT INTO `auth_permission` VALUES (5, 'Can add permission', 2, 'add_permission');
INSERT INTO `auth_permission` VALUES (6, 'Can change permission', 2, 'change_permission');
INSERT INTO `auth_permission` VALUES (7, 'Can delete permission', 2, 'delete_permission');
INSERT INTO `auth_permission` VALUES (8, 'Can view permission', 2, 'view_permission');
INSERT INTO `auth_permission` VALUES (9, 'Can add group', 3, 'add_group');
INSERT INTO `auth_permission` VALUES (10, 'Can change group', 3, 'change_group');
INSERT INTO `auth_permission` VALUES (11, 'Can delete group', 3, 'delete_group');
INSERT INTO `auth_permission` VALUES (12, 'Can view group', 3, 'view_group');
INSERT INTO `auth_permission` VALUES (13, 'Can add user', 4, 'add_user');
INSERT INTO `auth_permission` VALUES (14, 'Can change user', 4, 'change_user');
INSERT INTO `auth_permission` VALUES (15, 'Can delete user', 4, 'delete_user');
INSERT INTO `auth_permission` VALUES (16, 'Can view user', 4, 'view_user');
INSERT INTO `auth_permission` VALUES (17, 'Can add content type', 5, 'add_contenttype');
INSERT INTO `auth_permission` VALUES (18, 'Can change content type', 5, 'change_contenttype');
INSERT INTO `auth_permission` VALUES (19, 'Can delete content type', 5, 'delete_contenttype');
INSERT INTO `auth_permission` VALUES (20, 'Can view content type', 5, 'view_contenttype');
INSERT INTO `auth_permission` VALUES (21, 'Can add session', 6, 'add_session');
INSERT INTO `auth_permission` VALUES (22, 'Can change session', 6, 'change_session');
INSERT INTO `auth_permission` VALUES (23, 'Can delete session', 6, 'delete_session');
INSERT INTO `auth_permission` VALUES (24, 'Can view session', 6, 'view_session');
INSERT INTO `auth_permission` VALUES (25, 'Can add 志愿者公益活动列表', 7, 'add_activity');
INSERT INTO `auth_permission` VALUES (26, 'Can change 志愿者公益活动列表', 7, 'change_activity');
INSERT INTO `auth_permission` VALUES (27, 'Can delete 志愿者公益活动列表', 7, 'delete_activity');
INSERT INTO `auth_permission` VALUES (28, 'Can view 志愿者公益活动列表', 7, 'view_activity');
INSERT INTO `auth_permission` VALUES (29, 'Can add apply status', 8, 'add_applystatus');
INSERT INTO `auth_permission` VALUES (30, 'Can change apply status', 8, 'change_applystatus');
INSERT INTO `auth_permission` VALUES (31, 'Can delete apply status', 8, 'delete_applystatus');
INSERT INTO `auth_permission` VALUES (32, 'Can view apply status', 8, 'view_applystatus');
INSERT INTO `auth_permission` VALUES (33, 'Can add 报名信息表', 9, 'add_apply');
INSERT INTO `auth_permission` VALUES (34, 'Can change 报名信息表', 9, 'change_apply');
INSERT INTO `auth_permission` VALUES (35, 'Can delete 报名信息表', 9, 'delete_apply');
INSERT INTO `auth_permission` VALUES (36, 'Can view 报名信息表', 9, 'view_apply');
INSERT INTO `auth_permission` VALUES (37, 'Can add 友情链接列表', 10, 'add_link');
INSERT INTO `auth_permission` VALUES (38, 'Can change 友情链接列表', 10, 'change_link');
INSERT INTO `auth_permission` VALUES (39, 'Can delete 友情链接列表', 10, 'delete_link');
INSERT INTO `auth_permission` VALUES (40, 'Can view 友情链接列表', 10, 'view_link');

-- ----------------------------
-- Table structure for auth_user
-- ----------------------------
DROP TABLE IF EXISTS `auth_user`;
CREATE TABLE `auth_user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `last_login` datetime(6) NULL DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `first_name` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `last_name` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `email` varchar(254) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `username`(`username`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of auth_user
-- ----------------------------
INSERT INTO `auth_user` VALUES (7, 'pbkdf2_sha256$150000$eB47cB1vFqmz$/nz812mhEzK5XRGLcDvM0nQnJy7Sb8/GvjBqmzxEZc8=', '2023-04-12 19:33:00.000000', 0, 'jiayin', 'Li', 'Jiayin', '2480243521@qq.com', 0, 1, '2023-04-11 19:34:00.000000');
INSERT INTO `auth_user` VALUES (8, 'pbkdf2_sha256$150000$by9So9p3YFtu$KDBvPkes4zwScJWGFlEC9ajjEuHWgAvVQf+9EDBOjjQ=', '2023-04-06 19:35:00.000000', 0, 'admin', '李', '佳音', '2480243521@qq.com', 0, 1, '2023-04-03 19:35:00.000000');
INSERT INTO `auth_user` VALUES (9, 'pbkdf2_sha256$150000$Tjfc1rx7M3Gj$3vCjm1YwJqn1Pw7ktTLmPH+MCdvJyyeVcwkxMVWfQ0A=', '2023-04-19 11:44:52.000000', 0, 'company1', '秦', '洋', '2480243521@qq.com', 0, 1, '2023-04-04 10:36:55.000000');
INSERT INTO `auth_user` VALUES (10, 'pbkdf2_sha256$150000$vOPkzQXr98ro$f5KVN8I44ONpunMpFSISw7cefRKu/sVbsfuK1tRsnVE=', '2023-04-14 11:44:57.000000', 0, 'user1', '张', '海鹏', '2480243521@qq.com', 0, 1, '2023-04-09 13:41:24.000000');
INSERT INTO `auth_user` VALUES (11, 'pbkdf2_sha256$150000$gEEzzVo1Eqcw$J1yo+HZvRBINSsHNyr/C6lN+0tmXjZjhxbiEDDeVr58=', '2023-04-18 13:45:03.000000', 0, 'user2', '曾', '涛', 'user1@qq.com', 0, 1, '2023-04-10 07:20:44.000000');
INSERT INTO `auth_user` VALUES (12, 'pbkdf2_sha256$150000$883m4Aio4iIr$vFxCmg2pySyiRU/x5ZiuFr3Ew1XLONxLWGzS/+J0/iQ=', '2023-04-17 14:45:11.000000', 0, 'user3', '王', '敏', 'user2@qq.com', 0, 1, '2023-04-12 09:21:29.000000');
INSERT INTO `auth_user` VALUES (13, 'pbkdf2_sha256$150000$ghS5s6XGf5ED$EzfS4x5LQnz0rlFllE3ZGyR2qkx5J9ly4WQDxnoOWe4=', '2023-04-15 10:45:26.000000', 0, 'company2', '胡', '秀兰', 'company2@qq.com', 0, 1, '2023-04-15 21:21:50.000000');
INSERT INTO `auth_user` VALUES (14, 'pbkdf2_sha256$150000$e6eJaIn3Ynh8$uzAn1cMv4LPikEykAN+BQu18FFw9nfty2YgrinAhtyk=', '2023-04-09 08:45:32.000000', 0, 'user4', '薛', '明', 'user4@qq.com', 0, 1, '2023-04-08 08:22:13.000000');

-- ----------------------------
-- Table structure for auth_user_groups
-- ----------------------------
DROP TABLE IF EXISTS `auth_user_groups`;
CREATE TABLE `auth_user_groups`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `auth_user_groups_user_id_group_id_94350c0c_uniq`(`user_id`, `group_id`) USING BTREE,
  INDEX `auth_user_groups_group_id_97559544_fk_auth_group_id`(`group_id`) USING BTREE,
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of auth_user_groups
-- ----------------------------
INSERT INTO `auth_user_groups` VALUES (14, 7, 2);
INSERT INTO `auth_user_groups` VALUES (7, 8, 1);
INSERT INTO `auth_user_groups` VALUES (8, 9, 2);
INSERT INTO `auth_user_groups` VALUES (9, 10, 3);
INSERT INTO `auth_user_groups` VALUES (10, 11, 3);
INSERT INTO `auth_user_groups` VALUES (11, 12, 3);
INSERT INTO `auth_user_groups` VALUES (12, 13, 2);
INSERT INTO `auth_user_groups` VALUES (13, 14, 3);

-- ----------------------------
-- Table structure for auth_user_user_permissions
-- ----------------------------
DROP TABLE IF EXISTS `auth_user_user_permissions`;
CREATE TABLE `auth_user_user_permissions`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq`(`user_id`, `permission_id`) USING BTREE,
  INDEX `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm`(`permission_id`) USING BTREE,
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of auth_user_user_permissions
-- ----------------------------

-- ----------------------------
-- Table structure for django_admin_log
-- ----------------------------
DROP TABLE IF EXISTS `django_admin_log`;
CREATE TABLE `django_admin_log`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `object_repr` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `action_flag` smallint(5) UNSIGNED NOT NULL,
  `change_message` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `content_type_id` int(11) NULL DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `django_admin_log_content_type_id_c4bce8eb_fk_django_co`(`content_type_id`) USING BTREE,
  INDEX `django_admin_log_user_id_c564eba6_fk_auth_user_id`(`user_id`) USING BTREE,
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of django_admin_log
-- ----------------------------

-- ----------------------------
-- Table structure for django_content_type
-- ----------------------------
DROP TABLE IF EXISTS `django_content_type`;
CREATE TABLE `django_content_type`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `model` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `django_content_type_app_label_model_76bd3d3b_uniq`(`app_label`, `model`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of django_content_type
-- ----------------------------
INSERT INTO `django_content_type` VALUES (7, 'activity', 'activity');
INSERT INTO `django_content_type` VALUES (1, 'admin', 'logentry');
INSERT INTO `django_content_type` VALUES (9, 'apply', 'apply');
INSERT INTO `django_content_type` VALUES (8, 'apply', 'applystatus');
INSERT INTO `django_content_type` VALUES (3, 'auth', 'group');
INSERT INTO `django_content_type` VALUES (2, 'auth', 'permission');
INSERT INTO `django_content_type` VALUES (4, 'auth', 'user');
INSERT INTO `django_content_type` VALUES (5, 'contenttypes', 'contenttype');
INSERT INTO `django_content_type` VALUES (10, 'link', 'link');
INSERT INTO `django_content_type` VALUES (6, 'sessions', 'session');

-- ----------------------------
-- Table structure for django_migrations
-- ----------------------------
DROP TABLE IF EXISTS `django_migrations`;
CREATE TABLE `django_migrations`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 26 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of django_migrations
-- ----------------------------
INSERT INTO `django_migrations` VALUES (1, 'activity', '0001_initial', '2022-11-07 15:33:58.349329');
INSERT INTO `django_migrations` VALUES (2, 'contenttypes', '0001_initial', '2022-11-07 15:33:58.409256');
INSERT INTO `django_migrations` VALUES (3, 'auth', '0001_initial', '2022-11-07 15:33:58.544623');
INSERT INTO `django_migrations` VALUES (4, 'admin', '0001_initial', '2022-11-07 15:33:58.888141');
INSERT INTO `django_migrations` VALUES (5, 'admin', '0002_logentry_remove_auto_add', '2022-11-07 15:33:58.966142');
INSERT INTO `django_migrations` VALUES (6, 'admin', '0003_logentry_add_action_flag_choices', '2022-11-07 15:33:58.980987');
INSERT INTO `django_migrations` VALUES (7, 'contenttypes', '0002_remove_content_type_name', '2022-11-07 15:33:59.080126');
INSERT INTO `django_migrations` VALUES (8, 'auth', '0002_alter_permission_name_max_length', '2022-11-07 15:33:59.150863');
INSERT INTO `django_migrations` VALUES (9, 'auth', '0003_alter_user_email_max_length', '2022-11-07 15:33:59.221568');
INSERT INTO `django_migrations` VALUES (10, 'auth', '0004_alter_user_username_opts', '2022-11-07 15:33:59.252431');
INSERT INTO `django_migrations` VALUES (11, 'auth', '0005_alter_user_last_login_null', '2022-11-07 15:33:59.326652');
INSERT INTO `django_migrations` VALUES (12, 'auth', '0006_require_contenttypes_0002', '2022-11-07 15:33:59.335654');
INSERT INTO `django_migrations` VALUES (13, 'auth', '0007_alter_validators_add_error_messages', '2022-11-07 15:33:59.362654');
INSERT INTO `django_migrations` VALUES (14, 'auth', '0008_alter_user_username_max_length', '2022-11-07 15:33:59.431646');
INSERT INTO `django_migrations` VALUES (15, 'auth', '0009_alter_user_last_name_max_length', '2022-11-07 15:33:59.502647');
INSERT INTO `django_migrations` VALUES (16, 'auth', '0010_alter_group_name_max_length', '2022-11-07 15:33:59.596304');
INSERT INTO `django_migrations` VALUES (17, 'auth', '0011_update_proxy_permissions', '2022-11-07 15:33:59.621304');
INSERT INTO `django_migrations` VALUES (18, 'sessions', '0001_initial', '2022-11-07 15:33:59.648300');
INSERT INTO `django_migrations` VALUES (19, 'activity', '0002_auto_20221107_2356', '2022-11-07 15:57:08.012413');
INSERT INTO `django_migrations` VALUES (20, 'apply', '0001_initial', '2022-11-08 02:31:56.310929');
INSERT INTO `django_migrations` VALUES (21, 'apply', '0002_auto_20221108_1134', '2022-11-08 03:34:16.238757');
INSERT INTO `django_migrations` VALUES (22, 'apply', '0003_auto_20221111_1705', '2022-11-11 09:05:32.335714');
INSERT INTO `django_migrations` VALUES (23, 'activity', '0003_auto_20230117_1705', '2023-01-17 09:05:29.846619');
INSERT INTO `django_migrations` VALUES (24, 'apply', '0002_auto_20230329_1210', '2023-03-29 04:11:30.737134');
INSERT INTO `django_migrations` VALUES (25, 'link', '0001_initial', '2023-03-29 04:24:24.014528');

-- ----------------------------
-- Table structure for django_session
-- ----------------------------
DROP TABLE IF EXISTS `django_session`;
CREATE TABLE `django_session`  (
  `session_key` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `session_data` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`) USING BTREE,
  INDEX `django_session_expire_date_a5c62663`(`expire_date`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of django_session
-- ----------------------------
INSERT INTO `django_session` VALUES ('6dwe95gtpr8qsm9s6i0yuba85yv71q57', 'Y2NhNDMwM2FiYWRjZWM1NWU3OTVlMDc4YThmMTlhOTlkMjNlYjAxNTp7Il9hdXRoX3VzZXJfaWQiOiIyIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJkYTc2NmZmNWE1NTM3ZWFhYjcyMDdjY2ZlMGY1MGE1NjJjZWI3ZTYyIn0=', '2022-12-16 09:01:57.887732');
INSERT INTO `django_session` VALUES ('v74d2xe6olsi17whej22d8ab0x3jkk81', 'Y2NhNDMwM2FiYWRjZWM1NWU3OTVlMDc4YThmMTlhOTlkMjNlYjAxNTp7Il9hdXRoX3VzZXJfaWQiOiIyIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJkYTc2NmZmNWE1NTM3ZWFhYjcyMDdjY2ZlMGY1MGE1NjJjZWI3ZTYyIn0=', '2022-12-15 15:39:57.254153');

-- ----------------------------
-- Table structure for link
-- ----------------------------
DROP TABLE IF EXISTS `link`;
CREATE TABLE `link`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `link_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `link_address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `create_time` datetime(6) NOT NULL,
  `update_time` datetime(6) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of link
-- ----------------------------
INSERT INTO `link` VALUES (1, 'Gitee', 'https://gitee.com', '2023-04-06 10:25:21.000000', '2023-04-19 15:25:21.000000');
INSERT INTO `link` VALUES (3, 'Github', 'https://github.com/', '2023-04-09 14:57:48.000000', '2023-04-18 13:57:48.000000');
INSERT INTO `link` VALUES (4, 'Ant Design Pro', 'Ant Design Pro', '2023-04-06 04:18:23.292864', '2023-04-19 03:49:44.674424');
INSERT INTO `link` VALUES (5, 'ProComponents', 'https://procomponents.ant.design', '2023-04-06 04:18:56.933764', '2023-04-06 04:18:56.933764');
INSERT INTO `link` VALUES (6, 'UmiJS', 'https://umijs.org/', '2023-04-06 04:19:24.626991', '2023-04-06 04:19:24.626991');

SET FOREIGN_KEY_CHECKS = 1;
