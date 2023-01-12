import {
  ColumnHeightOutlined,
  PlusOutlined,
  SearchOutlined,
  SettingOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Table, Tag, Space, Button, Upload, Popconfirm, Tooltip } from 'antd';
const { Column } = Table;

import React from 'react';
const dataSource = [
  {
    key: '1',
    id: '1',
    username: 'admin',
    password: '123',
    role: '普通用户',
    createTime: '2022-1-12 14:00:00',
  },
  {
    key: '1',
    id: '1',
    username: 'admin',
    password: '123',
    role: '普通用户',
    createTime: '2022-1-12 14:00:00',
  },
  {
    key: '1',
    id: '1',
    username: 'admin',
    password: '123',
    role: '公益企业',
    createTime: '2022-1-12 14:00:00',
  },
  {
    key: '1',
    id: '1',
    username: 'admin',
    password: '123',
    role: '管理员',
    createTime: '2022-1-12 14:00:00',
  },
];

const UserManagement: React.FC = () => {
  return (
    <PageContainer>
      <Card>
        <Space>
          <Button type="primary" icon={<PlusOutlined />}>
            添加用户
          </Button>

          <Tooltip title="刷新">
            <Button icon={<SearchOutlined />} />
          </Tooltip>

          <Tooltip title="密度">
            <Button icon={<ColumnHeightOutlined />}></Button>
          </Tooltip>

          <Tooltip title="列设置">
            <Button icon={<SettingOutlined />}></Button>
          </Tooltip>
        </Space>

        <Table dataSource={dataSource}>
          <Column title="Id" dataIndex="id" key="id" />
          <Column title="用户名" dataIndex="username" key="username" />
          <Column title="密码" dataIndex="password" key="password" />
          <Column
            title="用户角色"
            dataIndex="role"
            key="role"
            render={(role: string, record: any) => (
              <>
                {record.role === '管理员' ? (
                  <Tag color="volcano" key="role">
                    {role}
                  </Tag>
                ) : record.role === '公益企业' ? (
                  <Tag color="blue" key="role">
                    {role}
                  </Tag>
                ) : (
                  <Tag color="green" key="role">
                    {role}
                  </Tag>
                )}
              </>
            )}
          />
          <Column title="注册时间" dataIndex="createTime" key="createTime" />

          <Column
            title="操作"
            key="action"
            render={(_: any) => (
              <Space size="middle">
                <a>重置密码</a>
                <a>注销用户</a>
              </Space>
            )}
          />
        </Table>
      </Card>
    </PageContainer>
  );
};

export default UserManagement;
