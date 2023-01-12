import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
  ManOutlined,
  QuestionCircleOutlined,
  WomanOutlined,
} from '@ant-design/icons';
import {
  PageContainer,
  ProColumns,
  ProDescriptions,
  ProDescriptionsItemProps,
} from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Drawer, Tag } from 'antd';
import React, { useState } from 'react';

export type ApplyTableListItem = {
  key: number;
  id: number;
  name: string;
  age: number;
  sex: number;
  address: string;
  tel: string;
  apply_status: number;
  apply_time: string;
  belonging_activity: string;
};

const applyTableListDataSource: ApplyTableListItem[] = [
  {
    key: 1,
    id: 1,
    name: '李佳音',
    age: 18,
    sex: 1,
    address: '陕西省',
    tel: '17612937572',
    apply_status: 1,
    apply_time: '2023-1-12 16:00:00',
    belonging_activity: '活动1',
  },
  {
    key: 2,
    id: 2,
    name: '李佳音',
    age: 18,
    sex: 0,
    address: '陕西省',
    tel: '17612937572',
    apply_status: 2,
    apply_time: '2023-1-12 16:00:00',
    belonging_activity: '活动1',
  },
  {
    key: 3,
    id: 3,
    name: '李佳音',
    age: 18,
    sex: 2,
    address: '陕西省',
    tel: '17612937572',
    apply_status: 0,
    apply_time: '2023-1-12 16:00:00',
    belonging_activity: '活动1',
  },
];
const ApplyTableList: React.FC = () => {
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<ApplyTableListItem>();
  const columns: ProColumns<ApplyTableListItem>[] = [
    {
      title: 'Id',
      width: 80,
      dataIndex: 'id',
      search: false,
      sorter: (a, b) => a.id - b.id,
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
      sorter: (a, b) => a.age - b.age,
      search: false,
    },
    {
      title: '性别',
      dataIndex: 'sex',
      sorter: (a, b) => a.sex - b.sex,
      render: (apply_status) => {
        console.log(apply_status, 'rocord');
        let color;
        let text = '';
        if (apply_status === 0) {
          color = 'default';
          text = '未知';
          return (
            <Tag icon={<QuestionCircleOutlined />} color={color}>
              {text}
            </Tag>
          );
        } else if (apply_status === 1) {
          color = 'processing';
          text = '男';
          return (
            <Tag icon={<ManOutlined />} color={color}>
              {text}
            </Tag>
          );
        } else if (apply_status === 2) {
          color = 'error';
          text = '女';
          return (
            <Tag icon={<WomanOutlined />} color={color}>
              {text}
            </Tag>
          );
        }
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
        console.log(apply_status, 'rocord');
        let color;
        let text = '';
        if (apply_status === 0) {
          color = 'default';
          text = '待审核';
          return (
            <Tag icon={<InfoCircleOutlined />} color={color}>
              {text}
            </Tag>
          );
        } else if (apply_status === 1) {
          color = 'success';
          text = '已审核';
          return (
            <Tag icon={<CheckCircleOutlined />} color={color}>
              {text}
            </Tag>
          );
        } else if (apply_status === 2) {
          color = 'error';
          text = '未通过';
          return (
            <Tag icon={<CloseCircleOutlined />} color={color}>
              {text}
            </Tag>
          );
        }
      },
    },
    {
      title: '申请时间',
      dataIndex: 'apply_time',
      search: false,
    },
    {
      title: '报名活动',
      dataIndex: 'belonging_activity',
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
      <ProTable<ApplyTableListItem>
        dataSource={applyTableListDataSource}
        rowKey="key"
        pagination={{
          showQuickJumper: true,
        }}
        columns={columns}
        dateFormatter="string"
        headerTitle="报名列表"
        toolBarRender={() => [<Button key="out">导出数据</Button>]}
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
        {currentRow?.name && (
          <ProDescriptions<ApplyTableListItem>
            column={1}
            title={currentRow?.name + '的报名信息'}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<ApplyTableListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default ApplyTableList;
