import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
  ManOutlined,
  QuestionCircleOutlined,
  VerticalAlignBottomOutlined,
  WomanOutlined,
} from '@ant-design/icons';
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
  getApplyList,
  updateApply,
  removeApply,
  exportApply,
  batchRemoveApply,
  batchExportApply,
} from '@/services/apply';
import { download } from '@/services/download';
import type { ApplyFormValueType } from '@/pages/ApplyTableList/components/UpdateForm';
import type { CheckApplyValueType } from '@/pages/ApplyTableList/components/CheckApply';

import UpdateForm from '@/pages/ApplyTableList/components/UpdateForm';
import CheckApply from '@/pages/ApplyTableList/components/CheckApply';
import { useAccess, Access } from 'umi';
/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: ApplyFormValueType) => {
  const hide = message.loading('更新中...');
  try {
    await updateApply(
      {
        name: fields.name,
        age: fields.age,
        sex: fields.sex,
        address: fields.address,
        tel: fields.tel,
        belonging_activity: fields.belonging_activity,
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
 * @en-US Update node
 * @zh-CN 审核更新节点
 *
 * @param fields
 */
const handleCheck = async (fields: CheckApplyValueType) => {
  const hide = message.loading('更新中...');
  try {
    await updateApply(
      {
        apply_status: fields.apply_status,
      },
      fields.id,
    );
    hide();

    message.success('审核成功！');
    return true;
  } catch (error) {
    hide();
    message.error('审核失败，请重试!');
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
    await removeApply(id);
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
 * @zh-CN 导出节点
 * @returns
 */
const handleExport = async () => {
  const hide = message.loading('正在导出');
  try {
    await exportApply().then(async (downloadId) => {
      await download(downloadId).then((res) => {
        const blob = new Blob([res]); //数据流
        const objectURL = URL.createObjectURL(blob);
        let btn = document.createElement('a');
        btn.download = '报名信息表.xls'; //文件类型
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
    await batchRemoveApply(deleteId);
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
const handleBatchExport = async (applyId: number[]) => {
  const hide = message.loading('正在导出');
  try {
    const params = {
      apply_code: applyId,
    };
    await batchExportApply(params).then(async (downloadId) => {
      await download(downloadId).then((res) => {
        const blob = new Blob([res]); //注意拿到的是数据流！！
        const objectURL = URL.createObjectURL(blob);
        let btn = document.createElement('a');
        btn.download = '报名信息表.xls'; //文件类型
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
const ApplyTableList: React.FC = () => {
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [removeModalVisible, handleRemoveModalVisible] = useState<boolean>(false);
  const [checkModalVisible, handleCheckModalVisible] = useState<boolean>(false);

  const [currentRow, setCurrentRow] = useState<API.ApplyListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.ApplyListItem[]>([]);

  const actionRef = useRef<ActionType>();
  const access = useAccess();
  const statusValueEnum = {
    0: {
      color: 'default',
      text: '待审核',
      icon: <InfoCircleOutlined />,
    },
    1: {
      color: 'success',
      text: '已通过',
      icon: <CheckCircleOutlined />,
    },
    2: {
      color: 'error',
      text: '未通过',
      icon: <CloseCircleOutlined />,
    },
  };

  const sexValueEnum = {
    0: {
      color: 'default',
      text: '未知',
      icon: <QuestionCircleOutlined />,
    },
    1: {
      color: 'processing',
      text: '男',
      icon: <ManOutlined />,
    },

    2: {
      color: 'error',
      text: '女',
      icon: <WomanOutlined />,
    },
  };
  const columns: ProColumns<API.ApplyListItem>[] = [
    {
      title: 'Id',
      width: 80,
      dataIndex: 'id',
      search: false,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      align: 'center',
      search: false,
    },
    {
      title: '年龄',
      dataIndex: 'age',
      search: false,
    },
    {
      title: '性别',
      dataIndex: 'sex',
      render: (sex) => {
        const element = sexValueEnum[Number(sex)];
        return (
          <Tag color={element.color} icon={element.icon}>
            {element.text}
          </Tag>
        );
      },
    },
    {
      title: '地址',
      dataIndex: 'address',
    },
    {
      title: '电话',
      dataIndex: 'tel',
      search: false,
    },
    {
      title: '报名活动',
      dataIndex: 'belonging_activity_name',
      render: (_) => <a>{_}</a>,
    },
    {
      title: '报名状态',
      dataIndex: 'apply_status',
      render: (apply_status) => {
        const element = statusValueEnum[Number(apply_status)];
        return (
          <Tag color={element.color} icon={element.icon}>
            {element.text}
          </Tag>
        );
      },
    },
    {
      title: '申请时间',
      dataIndex: 'apply_time',
      search: false,
    },

    {
      title: '操作',
      width: 180,
      key: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="detail"
          onClick={() => {
            setCurrentRow(record);
            setShowDetail(true);
          }}
        >
          详情
        </a>,
        <a
          key="edit"
          onClick={() => {
            setCurrentRow(record);
            handleUpdateModalVisible(true);
          }}
        >
          编辑
        </a>,
        <Access accessible={access.canCompanyOrManagerDo} fallback={<div></div>}>
          <a
            key="check"
            onClick={() => {
              setCurrentRow(record);
              handleCheckModalVisible(true);
            }}
          >
            审核
          </a>

          <a
            key="delete"
            onClick={() => {
              handleRemoveModalVisible(true);
              setCurrentRow(record);
            }}
          >
            删除
          </a>
        </Access>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.ApplyListItem, API.PageParams>
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
        }}
        cardBordered
        actionRef={actionRef}
        columns={columns}
        request={getApplyList}
        dateFormatter="string"
        headerTitle="报名列表"
        toolBarRender={() => [
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
          <Access accessible={access.canCompanyOrManagerDo} fallback={<div></div>}>
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
          </Access>
          <Button
            type="primary"
            onClick={async () => {
              let applyId: number[] = [];
              selectedRowsState.forEach((item) => {
                applyId.push(Number(item.id));
              });
              await handleBatchExport(applyId);
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
        {currentRow?.name && (
          <ProDescriptions<API.ApplyListItem>
            column={1}
            title={currentRow?.name + '的报名信息'}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<API.ApplyListItem>[]}
          />
        )}
      </Drawer>
      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
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
      <CheckApply
        onSubmit={async (value) => {
          const success = await handleCheck(value);
          if (success) {
            handleCheckModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleCheckModalVisible(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        checkModalVisible={checkModalVisible}
        values={currentRow || {}}
      />
      <Modal
        title="删除报名信息"
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
        您是否确定要删除用户 <Tag color="volcano">{currentRow?.name}</Tag> 申请 &nbsp;
        <Tag color="success">{currentRow?.belonging_activity_name}</Tag> 活动的报名信息吗？
      </Modal>
    </PageContainer>
  );
};

export default ApplyTableList;
