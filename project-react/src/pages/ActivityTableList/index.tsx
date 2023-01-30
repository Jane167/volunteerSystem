import { addRule, removeRule, rule, updateRule } from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
  PageContainer,
  ProDescriptions,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Drawer, message } from 'antd';
import React, { useRef, useState } from 'react';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import ApplyForm from './components/ApplyForm';

import { getActivityList } from '@/services/activity';
/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.ActivityListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addRule({ ...fields });
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
  }
};

/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('Configuring');
  try {
    await updateRule({
      id: fields.id,
      name: fields.name,
      desc: fields.desc,
      publish_company_name: fields.publish_company_name,
      address: fields.address,
      start_date: fields.start_date,
      start_time: fields.start_time,
      demand: fields.demand,
      need_person_num: fields.need_person_num,
    });
    hide();

    message.success('Configuration is successful');
    return true;
  } catch (error) {
    hide();
    message.error('Configuration failed, please try again!');
    return false;
  }
};
/**
 * @en-US Apply node
 * @zh-CN 报名节点
 *
 * @param fields
 */
const handleApply = async (fields: FormValueType) => {
  const hide = message.loading('Configuring');
  try {
    await updateRule({
      id: fields.id,
      name: fields.name,
      desc: fields.desc,
      publish_company_name: fields.publish_company_name,
      address: fields.address,
      start_date: fields.start_date,
      start_time: fields.start_time,
      demand: fields.demand,
      need_person_num: fields.need_person_num,
    });
    hide();

    message.success('Configuration is successful');
    return true;
  } catch (error) {
    hide();
    message.error('Configuration failed, please try again!');
    return false;
  }
};
/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.ActivityListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row.id),
    });
    hide();
    message.success('Deleted successfully and will refresh soon');
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
    return false;
  }
};

const ActivityTableList: React.FC = () => {
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [applyModalVisible, handleApplyModalVisible] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.ActivityListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.ActivityListItem[]>([]);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */

  const columns: ProColumns<API.ActivityListItem>[] = [
    {
      title: 'Id',
      dataIndex: 'id',
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
      search: false
    },
    {
      title: '发布企业',
      dataIndex: 'publish_company_name',
    },
    {
      title: '活动地点',
      dataIndex: 'address'
    },
    {
      title: '开始日期',
      dataIndex: 'start_date',
      sorter: true,
      hideInForm: true,
      search: false
    },
    {
      title: '开始时间',
      dataIndex: 'start_time',
      sorter: true,
      hideInForm: true,
      search: false
    },
    {
      title: '志愿者素养要求',
      dataIndex: 'demand',
      hideInForm: true,
      search: false
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
        <a
          key="apply"
          onClick={() => {
            handleApplyModalVisible(true);
            setCurrentRow(record);
          }}
        >
          报名
        </a>,
        <a
          key="details"
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
            handleUpdateModalVisible(true);
            setCurrentRow(record);
          }}
        >
          编辑
        </a>,
        <a>删除</a>,
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
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleUpdateModalVisible(true);
            }}
          >
            <PlusOutlined />
            新建活动
          </Button>,
        ]}
        request={getActivityList}
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
              await handleRemove(selectedRowsState);
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
    </PageContainer>
  );
};

export default ActivityTableList;
