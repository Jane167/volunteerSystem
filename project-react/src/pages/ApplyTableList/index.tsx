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
  PageContainer,
  ProColumns,
  ProDescriptions,
  ProDescriptionsItemProps,
} from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Drawer, message, Tag } from 'antd';
import React, { useState } from 'react';
import { getApplyList, addApply, updateApply, removeApply } from '@/services/apply';
import type { ApplyFormValueType } from '@/pages/ActivityTableList/components/ApplyForm'


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
        apply_status: 0,
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

const ApplyTableList: React.FC = () => {
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.ApplyListItem>();
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
      title: '报名状态',
      dataIndex: 'apply_status',
      render: (apply_status) => {
        console.log(apply_status);
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
      title: '报名活动',
      dataIndex: 'belonging_activity_name',
      render: (_) => <a>{_}</a>,
    },
    {
      title: '操作',
      width: 180,
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
        <a key="link">审核</a>,
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
        columns={columns}
        request={getApplyList}
        dateFormatter="string"
        headerTitle="报名列表"
        toolBarRender={() => [
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
    </PageContainer>
  );
};

export default ApplyTableList;
