import {
  UserAddOutlined,
  VerticalAlignBottomOutlined,
} from '@ant-design/icons';
import {
  PageContainer,
  ProColumns,
  ProDescriptions,
  ProDescriptionsItemProps,
} from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Drawer, Tag } from 'antd';
// import axios from 'axios';
import React, { useState } from 'react';

import { getActivityList } from '@/api/activity';
export type UserTableListItem = {
  key: number;
  id: number;
  username: string;
  password: string;
  role: number;
  email: string,
  last_login: string,
  create_time: string;
};

function getActivityData(){
  getActivityList()
}
const userTableListDataSource: UserTableListItem[] = [
  {
    key: 1,
    id: 1,
    username: '李佳音',
    password: '123',
    role: 1,
    email: '2380343521@qq.com',
    last_login: '2022-1-12 18:00:00',
    create_time: '2023-1-12 16:00:00',
  },
  {
    key: 1,
    id: 1,
    username: '李佳音',
    password: '123',
    role: 2,
    email: '2380343521@qq.com',
    last_login: '2022-1-12 18:00:00',
    create_time: '2023-1-12 16:00:00',
  },
  {
    key: 1,
    id: 1,
    username: '李佳音',
    password: '123',
    role: 3,
    email: '2380343521@qq.com',
    last_login: '2022-1-12 18:00:00',
    create_time: '2023-1-12 16:00:00',
  },
];

const UserList: React.FC = () => {
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<UserTableListItem>();
  const columns: ProColumns<UserTableListItem>[] = [
    {
      title: 'Id',
      width: 80,
      dataIndex: 'id',
      search: false,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: '用户名',
      dataIndex: 'username',
      align: 'center',
      search: false,
    },
    {
      title: '密码',
      dataIndex: 'password',
      search: false,
    },
    {
      title: '角色',
      dataIndex: 'role',
      render: (role) => {
        console.log(role, 'rocord');
        let color;
        let text = '';
        if (role === 1) {
          color = 'warning';
          text = '管理员';
        } else if (role === 2) {
          color = 'processing';
          text = '公益企业';
        } else if (role === 3) {
          color = 'success';
          text = '普通用户';
        }
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: "电子邮箱",
      dataIndex: 'email',
      search: false
    },
    {
      title: "上次登录时间",
      dataIndex: 'last_login',
      search: false
    },

    {
      title: '注册时间',
      dataIndex: 'create_time',
      search: false,
    },
    {
      title: '操作',
      width: 300,
      key: 'option',
      valueType: 'option',
      render: (dom, entity) => [
        <a
          onClick={() => {
            setCurrentRow(entity);
            setShowDetail(true);
          }}
        >
          查看详情
        </a>,
        <a key="link">重置密码</a>,
        <a key="link">注销用户</a>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<UserTableListItem>
        dataSource={userTableListDataSource}
        rowKey="key"
        pagination={{
          showQuickJumper: true,
        }}
        columns={columns}
        dateFormatter="string"
        headerTitle="用户列表"
        toolBarRender={() => [
          <Button key="out" type="primary" onClick={getActivityData} icon={<UserAddOutlined />}>
            新建用户
          </Button>,
          <Button key="out" icon={<VerticalAlignBottomOutlined />}>导出数据</Button>
        ]}
      />
      <Drawer
        width={500}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={true}
      >
        {currentRow?.username && (
          <ProDescriptions<UserTableListItem>
            column={1}
            title={currentRow?.username + '的个人信息'}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<UserTableListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default UserList;
