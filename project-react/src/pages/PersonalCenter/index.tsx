import {
  FieldTimeOutlined,
  HistoryOutlined,
  MailOutlined,
  UserOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Col, Row, Tabs, TabsProps, Tag } from 'antd';
import React from 'react';
import BasicInfo from './BasicInfo';
import ModifyPwd from './ModifyPwd';

const rowStyle: React.CSSProperties = {
  marginTop: '10px',
};

const userInfo = {
  username: '李佳音',
  first_name: '李',
  last_name: '佳音',
  email: '123456@qq.com',
  role: 1,
  create_time: '2023-1-14 18:00:00',
  last_login: '2023-1-14 18:00:00',
};

const items: TabsProps['items'] = [
  {
    key: '1',
    label: `基本资料`,
    children: <BasicInfo />,
  },
  {
    key: '2',
    label: `修改密码`,
    children: <ModifyPwd />,
  },
];

const PersonalCenter: React.FC = () => {
  return (
    <PageContainer>
      <Row gutter={15}>
        <Col span={11}>
          <Card title="个人信息">
            <Row style={rowStyle}>
              <Col span={1}>
                <UserOutlined />
              </Col>
              <Col span={5}>
                <span>用户名：</span>
              </Col>
              <Col span={18}>{userInfo.username}</Col>
            </Row>
            <Row style={rowStyle}>
              <Col span={1}>
                <UserOutlined />
              </Col>
              <Col span={5}>
                <span>姓：</span>
              </Col>
              <Col span={18}>{userInfo.first_name}</Col>
            </Row>
            <Row style={rowStyle}>
              <Col span={1}>
                <UserOutlined />
              </Col>
              <Col span={5}>
                <span>名：</span>
              </Col>
              <Col span={18}>{userInfo.last_name}</Col>
            </Row>
            <Row style={rowStyle}>
              <Col span={1}>
                <MailOutlined />
              </Col>
              <Col span={5}>
                <span>邮箱：</span>
              </Col>
              <Col span={18}>{userInfo.email}</Col>
            </Row>
            <Row style={rowStyle}>
              <Col span={1}>
                <UserSwitchOutlined />
              </Col>
              <Col span={5}>
                <span>角色：</span>
              </Col>
              <Col span={18}>
                {userInfo.role === 1 ? (
                  <Tag color="warning">管理员</Tag>
                ) : userInfo.role === 2 ? (
                  <Tag color="processing">公益企业</Tag>
                ) : (
                  <Tag color="success">普通用户</Tag>
                )}
              </Col>
            </Row>
            <Row style={rowStyle}>
              <Col span={1}>
                <HistoryOutlined />
              </Col>
              <Col span={5}>
                <span>创建时间：</span>
              </Col>
              <Col span={18}>{userInfo.create_time}</Col>
            </Row>
            <Row style={rowStyle}>
              <Col span={1}>
                <FieldTimeOutlined />
              </Col>
              <Col span={5}>
                <span>上次登录时间：</span>
              </Col>
              <Col span={18}>{userInfo.last_login}</Col>
            </Row>
          </Card>
        </Col>
        <Col span={13}>
          <Card
            title="基本资料"
            actions={[
              <Button type='primary'>保存</Button>,
              <Button type='primary' danger>关闭</Button>
            ]}
          >
            <Tabs defaultActiveKey="1" items={items} />
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default PersonalCenter;
