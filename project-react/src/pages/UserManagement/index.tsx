import { UserAddOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons';
import {
  ActionType,
  PageContainer,
  ProColumns,
  ProDescriptions,
  ProDescriptionsItemProps,
} from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Drawer, message, Tag } from 'antd';
import React, { useRef, useState } from 'react';
import { getUserList, addUser, removeUser } from '@/services/user';
import AddUser from './components/AddUser';

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.UsersListItem) => {
  const hide = message.loading('正在添加...');
  try {
    await addUser({ ...fields });
    hide();
    message.success('添加成功！');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败，请重试!');
    return false;
  }
};

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (id: number) => {
  const hide = message.loading('正在删除');
  if (!id) return true;
  try {
    await removeUser(id);
    hide();
    message.success('删除成功！');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试！');
    return false;
  }
};

const UserList: React.FC = () => {
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.UsersListItem>();
  const [addUserModalVisible, handleAddUserkModalVisible] = useState<boolean>(false);

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
      render: (_, record) => [
        <a
          key="detail"
          onClick={() => {
            setCurrentRow(record);
            setShowDetail(true);
          }}
        >
          查看详情
        </a>,
        <a key="resetPwdd">重置密码</a>,
        <a key="deleteUser">注销用户</a>,
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
        cardBordered
        request={getUserList}
        dateFormatter="string"
        headerTitle="用户列表"
        toolBarRender={() => [
          <Button
            key="out"
            type="primary"
            icon={<UserAddOutlined />}
            onClick={() => handleAddUserkModalVisible(true)}
          >
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
      <AddUser
        onSubmit={async (value) => {
          const success = await handleAdd(value);
          if (success) {
            handleAddUserkModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleAddUserkModalVisible(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        addUserModalVisible={addUserModalVisible}
        values={currentRow || {}}
      ></AddUser>
    </PageContainer>
  );
};

export default UserList;
