import { UserAddOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons';
import {
  ActionType,
  PageContainer,
  ProColumns,
  ProDescriptions,
  ProDescriptionsItemProps,
} from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Drawer, Tag } from 'antd';
import React, { useRef, useState } from 'react';
import { getUserList } from '@/services/user';

const UserList: React.FC = () => {
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.UsersListItem>();
  const actionRef = useRef<ActionType>();

  const roleValueEnum = {
    manager: {
      color: 'cyan',
      text: '管理员',
    },
    company: {
      color: 'volcano',
      text: '公益企业',
    },
    common: {
      color: 'magenta',
      text: '普通用户',
    },
  };

  const columns: ProColumns<API.UsersListItem>[] = [
    {
      title: '用户Id',
      width: 80,
      dataIndex: 'id',
      search: false,
      align: 'center',
    },
    {
      title: '用户名',
      dataIndex: 'username',
      align: 'center',
      search: false,
    },
    {
      title: '电子邮箱',
      dataIndex: 'email',
      align: 'center',
      search: false,
    },
    {
      title: '角色',
      dataIndex: 'groups',
      align: 'center',
      search: false,
      render: (groups) => {
        for (let i of Array(groups)) {
          const element = roleValueEnum[String(i)];

          return <Tag color={element.color}>{element.text}</Tag>;
        }
      },
    },
    {
      title: '姓',
      dataIndex: 'first_name',
      align: 'center',
      search: false,
    },
    {
      title: '名',
      dataIndex: 'last_name',
      align: 'center',
      search: false,
    },
    {
      title: '上次登录时间',
      dataIndex: 'last_login',
      align: 'center',
      search: false,
    },
    {
      title: '注册时间',
      dataIndex: 'date_joined',
      align: 'center',
      search: false,
    },

    {
      title: '操作',
      width: 300,
      key: 'option',
      align: 'center',
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
      <ProTable<API.UsersListItem, API.PageParams>
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
        }}
        columns={columns}
        actionRef={actionRef}
        request={getUserList}
        dateFormatter="string"
        headerTitle="用户列表"
        toolBarRender={() => [
          <Button key="out" type="primary" icon={<UserAddOutlined />}>
            新建用户
          </Button>,
          <Button key="out" icon={<VerticalAlignBottomOutlined />}>
            导出数据
          </Button>,
        ]}
      />
      <Drawer
        width={500}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={true}
      >
        {currentRow?.username && (
          <ProDescriptions<API.UsersListItem>
            column={1}
            title={currentRow?.username + '的个人信息'}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<API.UsersListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default UserList;
