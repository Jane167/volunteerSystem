import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
  PageContainer,
  ProDescriptions,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Drawer, message, Modal, Tag } from 'antd';
import React, { useRef, useState } from 'react';
import type { UpdateFormValueType } from './components/UpdateForm';
import type { ApplyFormValueType } from './components/ApplyForm';
import UpdateForm from './components/UpdateForm';
import ApplyForm from './components/ApplyForm';
import { useAccess, Access } from 'umi';
import {
  getActivityList,
  addActivity,
  updateActivity,
  removeActivity,
  batchRemoveActivity,
} from '@/services/activity';
import { addApply } from '@/services/apply';
/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.ActivityListItem) => {
  const hide = message.loading('正在添加...');
  try {
    await addActivity({ ...fields });
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
const handleUpdate = async (fields: UpdateFormValueType) => {
  const hide = message.loading('更新中...');
  try {
    await updateActivity(
      {
        id: fields.id,
        name: fields.name,
        desc: fields.desc,
        publish_company_name: fields.publish_company_name,
        address: fields.address,
        start_date: fields.start_date,
        start_time: fields.start_time,
        demand: fields.demand,
        need_person_num: fields.need_person_num,
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
 * @en-US Apply node
 * @zh-CN 报名节点
 *
 * @param fields
 */
const handleApply = async (fields: ApplyFormValueType) => {
  const hide = message.loading('报名中...');

  try {
    await addApply({
      name: fields.name,
      age: fields.age,
      sex: fields.sex,
      address: fields.address,
      tel: fields.tel,
      belonging_activity: fields.belonging_activity,
      apply_status: 0,
    })
      .then((res) => {
        hide();
        message.success(res.data?.message);
        return true;
      })
      .catch((error) => {
        message.error(error);
        return false;
      });
    return true;
  } catch (error) {
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
    await removeActivity(id);
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
 * Batch delete node
 * @zh-CN 批量删除节点
 * @returns
 */
const handleBatchDelete = async (deleteId: number[]) => {
  const hide = message.loading('正在删除');
  if (!deleteId) return true;
  try {
    await batchRemoveActivity(deleteId);
    hide();
    message.success('删除成功！');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试！');
    return false;
  }
};

const ActivityTableList: React.FC = () => {
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */

  const access = useAccess();

  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [applyModalVisible, handleApplyModalVisible] = useState<boolean>(false);
  const [removeModalVisible, handleRemoveModalVisible] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.ActivityListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.ActivityListItem[]>([]);
  const columns: ProColumns<API.ActivityListItem>[] = [
    {
      title: 'Id',
      dataIndex: 'id',
      search: false,
    },
    {
      title: '活动名称',
      dataIndex: 'name',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: '活动描述',
      dataIndex: 'desc',
      valueType: 'textarea',
      search: false,
    },
    {
      title: '发布企业',
      dataIndex: 'publish_company_name',
    },
    {
      title: '活动地点',
      dataIndex: 'address',
    },
    {
      title: '开始日期',
      dataIndex: 'start_date',
      sorter: true,
      hideInForm: true,
      search: false,
    },
    {
      title: '开始时间',
      dataIndex: 'start_time',
      sorter: true,
      hideInForm: true,
      search: false,
    },
    {
      title: '志愿者素养要求',
      dataIndex: 'demand',
      hideInForm: true,
      search: false,
    },
    {
      title: '需要人数',
      dataIndex: 'need_person_num',
    },
    {
      title: '已报名人数',
      dataIndex: 'apply_person_num',
    },
    {
      title: '审核通过人数',
      dataIndex: 'pass_person_num',
    },
    {
      title: '操作',
      dataIndex: 'option',
      width: 180,
      valueType: 'option',
      render: (_, record) => [
        <Access accessible={access.canCommonDo} fallback={<div></div>}>
          <a
            key="apply"
            onClick={() => {
              handleApplyModalVisible(true);
              setCurrentRow(record);
            }}
          >
            报名
          </a>
        </Access>,
        <a
          key="details"
          onClick={() => {
            setCurrentRow(record);
            setShowDetail(true);
          }}
        >
          详情
        </a>,
        <Access accessible={access.canCompanyOrManagerDo} fallback={<div></div>}>
          <a
            key="edit"
            onClick={() => {
              handleUpdateModalVisible(true);
              setCurrentRow(record);
            }}
          >
            编辑
          </a>
        </Access>,
        <Access accessible={access.canCompanyOrManagerDo} fallback={<div></div>}>
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
      <ProTable<API.ActivityListItem, API.PageParams>
        headerTitle="活动列表"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Access accessible={access.canCompanyOrManagerDo} fallback={<div></div>}>
            <Button
              type="primary"
              key="primary"
              onClick={() => {
                handleUpdateModalVisible(true);
              }}
            >
              <PlusOutlined />
              新建活动
            </Button>
          </Access>,
        ]}
        cardBordered
        request={getActivityList}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
        }}
        columns={columns}
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
          <Button type="primary">批量导出</Button>
        </FooterToolbar>
      )}
      <UpdateForm
        onSubmit={async (value) => {
          if (currentRow === undefined) {
            const success = await handleAdd(value);
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

      <ApplyForm
        onSubmit={async (value) => {
          const success = await handleApply(value);
          if (success) {
            handleApplyModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleApplyModalVisible(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        applyModalVisible={applyModalVisible}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<API.RuleListItem>
            column={1}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
          />
        )}
      </Drawer>
      <Modal
        title="删除活动"
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
        您是否确定要删除 <Tag color="volcano">{currentRow?.name}</Tag> 活动？
      </Modal>
    </PageContainer>
  );
};

export default ActivityTableList;
