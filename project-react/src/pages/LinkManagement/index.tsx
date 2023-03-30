import { PlusOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons';
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
  getLinkList,
  addLink,
  removeLink,
  updateLink,
  exportLink,
  batchRemoveLink,
  batchExportLink,
} from '@/services/link';
import { download } from '@/services/download';
import AddLink, { LinkValueType } from './components/AddLink';
import UpdateLink from './components/UpdateLink';

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.LinkListItem) => {
  const hide = message.loading('正在添加...');
  try {
    await addLink({ ...fields });
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
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: LinkValueType) => {
  const hide = message.loading('更新中...');
  try {
    await updateLink(
      {
        id: fields.id,
        link_name: fields.link_name,
        link_address: fields.link_name,
      },
      fields.id,
    );
    hide();

    message.success('更新成功！');
    return true;
  } catch (error) {
    hide();
    message.error('更新失败，请重试!');
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
    await removeLink(id);
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
 * Export node
 * @zh-CN 导出节点
 */
const handleExport = async () => {
  const hide = message.loading('正在导出');
  try {
    await exportLink().then(async (downloadId) => {
      await download(downloadId).then((res) => {
        const blob = new Blob([res]);
        const objectURL = URL.createObjectURL(blob);
        let btn = document.createElement('a');
        btn.download = '友情链接信息表.xls'; //文件类型
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
    await batchRemoveLink(deleteId);
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
const handleBatchExport = async (linkId: number[]) => {
  const hide = message.loading('正在导出');
  try {
    const params = {
      link_code: linkId,
    };
    await batchExportLink(params).then(async (downloadId) => {
      await download(downloadId).then((res) => {
        const blob = new Blob([res]); //注意拿到的是数据流！！
        const objectURL = URL.createObjectURL(blob);
        let btn = document.createElement('a');
        btn.download = '友情链接信息表.xls'; //文件类型
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

const LinkList: React.FC = () => {
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.LinkListItem>();
  const [removeModalVisible, handleRemoveModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  const [addLinkModalVisible, handleAddLinkModalVisible] = useState<boolean>(false);
  const [selectedRowsState, setSelectedRows] = useState<API.UsersListItem[]>([]);

  const actionRef = useRef<ActionType>();

  const columns: ProColumns<API.LinkListItem>[] = [
    {
      title: 'Id',
      width: 80,
      dataIndex: 'id',
      align: 'center',
    },
    {
      title: '链接名称',
      dataIndex: 'link_name',
      align: 'center',
    },
    {
      title: '链接地址',
      dataIndex: 'link_address',
      align: 'center',
      render: (_, record) => (
        <a
          onClick={() => {
            window.open(record.link_address);
          }}
        >
          {_}
        </a>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      align: 'center',
    },
    {
      title: '更新时间',
      dataIndex: 'update_time',
      align: 'center',
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
          key="updateLink"
          onClick={() => {
            handleUpdateModalVisible(true);
            setCurrentRow(record);
          }}
        >
          编辑
        </a>,
        <a
          key="deleteLink"
          onClick={() => {
            handleRemoveModalVisible(true);
            setCurrentRow(record);
          }}
        >
          删除
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
        search={false}
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={getLinkList}
        dateFormatter="string"
        headerTitle="友情链接列表"
        toolBarRender={() => [
          <Button
            key="out"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => handleAddLinkModalVisible(true)}
          >
            新建友情链接
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
        {currentRow?.link_name && (
          <ProDescriptions<API.UsersListItem>
            column={1}
            title={currentRow?.link_name + '的链接信息'}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<API.LinkListItem>[]}
          />
        )}
      </Drawer>
      <AddLink
        onSubmit={async (value) => {
          const success = await handleAdd(value);
          if (success) {
            handleAddLinkModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleAddLinkModalVisible(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        addLinkModalVisible={addLinkModalVisible}
        values={currentRow || {}}
      ></AddLink>
      <UpdateLink
        onSubmit={async (value) => {
          if (currentRow === undefined) {
            const success = await handleUpdate(value);
            if (success) {
              handleUpdateModalVisible(false);
              setCurrentRow(undefined);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          } else {
            const success = await handleUpdate(value);
            if (success) {
              handleUpdateModalVisible(false);
              setCurrentRow(undefined);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        updateModalVisible={updateModalVisible}
        values={currentRow || {}}
      />
      <Modal
        title="删除友情链接信息"
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
        您是否确定要删除 <Tag color="volcano">{currentRow?.link_name}</Tag> &nbsp;的友情链接吗？
      </Modal>
    </PageContainer>
  );
};

export default LinkList;
