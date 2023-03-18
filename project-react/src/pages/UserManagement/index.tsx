import { UserAddOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons';
import {
  ActionType,
  FooterToolbar,
  PageContainer,
  ProColumns,
  ProDescriptions,
  ProDescriptionsItemProps,
} from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Drawer, message, Modal, Tag } from 'antd';
import React, { useRef, useState } from 'react';
import {
  getUserList,
  addUser,
  removeUser,
  updateUser,
  exportUser,
  batchRemoveUser,
  batchExportUser,
} from '@/services/user';
import { download } from '@/services/download';
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

/**
 * @en-US Reset Password node
 * @zh-CN 重置密码节点
 *
 * @param fields
 */
const handleResetPwd = async (id: number) => {
  const hide = message.loading('更新中...');
  try {
    await updateUser(
      {
        password: '123456',
      },
      id,
    );
    hide();

    message.success('重置成功！');
    return true;
  } catch (error) {
    hide();
    message.error('重置失败，请重试!');
    return false;
  }
};

/**
 * Export node
 * @zh-CN 导出节点
 */
const handleExport = async () => {
  const hide = message.loading('正在导出');
  try {
    await exportUser().then(async (downloadId) => {
      await download(downloadId).then((res) => {
        const blob = new Blob([res]);
        const objectURL = URL.createObjectURL(blob);
        let btn = document.createElement('a');
        btn.download = '用户信息表.xls'; //文件类型
        btn.href = objectURL;
        btn.click();
        URL.revokeObjectURL(objectURL);
        btn.remove();
        message.success('下载成功！');
      });
    });
    return true;
  } catch (error) {
    hide();
    message.error('导出失败，请重试！');
    return false;
  }
};

/**
 * Batch delete node
 * @zh-CN 批量删除节点
 * @returns
 */
const handleBatchDelete = async (deleteId: number[]) => {
  const hide = message.loading('正在删除');
  if (!deleteId) return true;
  try {
    await batchRemoveUser(deleteId);
    hide();
    message.success('删除成功！');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试！');
    return false;
  }
};
/**
 * Batch export node
 * @zh-CN 批量导出节点
 * @returns
 */
const handleBatchExport = async (userId: number[]) => {
  const hide = message.loading('正在导出');
  try {
    const params = {
      user_code: userId,
    };
    await batchExportUser(params).then(async (downloadId) => {
      await download(downloadId).then((res) => {
        const blob = new Blob([res]); //注意拿到的是数据流！！
        const objectURL = URL.createObjectURL(blob);
        let btn = document.createElement('a');
        btn.download = '用户信息表.xls'; //文件类型
        btn.href = objectURL;
        btn.click();
        URL.revokeObjectURL(objectURL);
        btn.remove();
        message.success('下载成功！');
      });
    });
    return true;
  } catch (error) {
    hide();
    message.error('导出失败，请重试！');
    return false;
  }
};

const UserList: React.FC = () => {
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.UsersListItem>();
  const [removeModalVisible, handleRemoveModalVisible] = useState<boolean>(false);
  const [resetPwdModalVisible, handleResetPwdModalVisible] = useState<boolean>(false);

  const [addUserModalVisible, handleAddUserkModalVisible] = useState<boolean>(false);
  const [selectedRowsState, setSelectedRows] = useState<API.UsersListItem[]>([]);

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
      // search: false,
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
      // search: false,
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
      width: 250,
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
        <a
          key="resetPwd"
          onClick={() => {
            handleResetPwdModalVisible(true);
            setCurrentRow(record);
          }}
        >
          重置密码
        </a>,
        <a
          key="deleteUser"
          onClick={() => {
            handleRemoveModalVisible(true);
            setCurrentRow(record);
          }}
        >
          注销用户
        </a>,
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
          <Button
            key="out"
            icon={<VerticalAlignBottomOutlined />}
            onClick={async () => {
              await handleExport();
            }}
          >
            导出数据
          </Button>,
        ]}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择 <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> 项 &nbsp;&nbsp;
            </div>
          }
        >
          <Button
            onClick={async () => {
              console.log(selectedRowsState, 'selectedRowState');
              let deleteId: number[] = [];
              selectedRowsState.forEach((item) => {
                deleteId.push(Number(item.id));
              });
              console.log(deleteId, 'deleteId');
              await handleBatchDelete(deleteId);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
          <Button
            type="primary"
            onClick={async () => {
              console.log(selectedRowsState, 'selectedRowState');
              let userId: number[] = [];
              selectedRowsState.forEach((item) => {
                userId.push(Number(item.id));
              });
              console.log(userId, 'deleteId');
              await handleBatchExport(userId);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量导出
          </Button>
        </FooterToolbar>
      )}
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
      <Modal
        title="注销用户信息"
        open={removeModalVisible}
        onOk={async () => {
          const success = await handleRemove(Number(currentRow?.id));
          if (success) {
            handleRemoveModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleRemoveModalVisible(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
      >
        您是否确定要注销用户 <Tag color="volcano">{currentRow?.username}</Tag> &nbsp;的信息吗？
      </Modal>
      <Modal
        title="重置用户密码"
        open={resetPwdModalVisible}
        onOk={async () => {
          const success = await handleResetPwd(Number(currentRow?.id));
          if (success) {
            handleResetPwdModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleResetPwdModalVisible(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
      >
        您是否确定要重置用户 <Tag color="volcano">{currentRow?.username}</Tag> &nbsp;的密码吗？
      </Modal>
    </PageContainer>
  );
};

export default UserList;
