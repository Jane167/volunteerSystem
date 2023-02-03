import { UserOutlined, StarOutlined, EnvironmentOutlined, PhoneOutlined } from '@ant-design/icons';
import {
  ProForm,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import React, { useState } from 'react';
import { Modal } from 'antd';
import { getActivityList } from '@/services/activity';

type LayoutType = Parameters<typeof ProForm>[0]['layout'];
const LAYOUT_TYPE_HORIZONTAL = 'horizontal';

export type ApplyFormValueType = {
  id?: number;
  name?: string;
  age?: number;
  sex?: number;
  address?: string;
  tel?: string;
  belonging_activity?: number;
} & Partial<API.ApplyListItem>;

export type ApplyFormProps = {
  onCancel: (flag?: boolean, formVals?: ApplyFormValueType) => void;
  onSubmit: (values: ApplyFormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<API.ApplyListItem>;
};

const getActivityOptions = async () => {
  const res = (await getActivityList()).data;
  let arr: { label: any; value: any }[] = [];
  if (res) {
    res.forEach((element) => {
      arr.push({
        label: element.name,
        value: element.id,
      });
    });
  }

  return arr;
};

const activityOptions = await getActivityOptions();

const UpdateForm: React.FC<ApplyFormProps> = (props) => {
  const [formLayoutType] = useState<LayoutType>(LAYOUT_TYPE_HORIZONTAL);
  return (
    <>
      <Modal
        width={640}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="填写报名信息"
        open={props.updateModalVisible}
        onCancel={() => {
          props.onCancel();
        }}
        footer={null}
      >
        <ProForm layout={formLayoutType} onFinish={props.onSubmit}>
          <ProFormText
            label="Id"
            name="id"
            initialValue={props.values.id}
            fieldProps={{
              size: 'large',
            }}
            rules={[
              {
                required: true,
                message: '请输入Id！',
              },
            ]}
            disabled
          />
          <ProFormSelect
            label="报名活动"
            name="belonging_activity"
            fieldProps={{
              size: 'large',
            }}
            initialValue={props.values.belonging_activity}
            options={activityOptions}
            placeholder={'请选择报名活动：'}
            rules={[
              {
                required: true,
                message: '请选择报名活动！',
              },
            ]}
          />
          <ProFormText
            label="姓名"
            name="name"
            initialValue={props.values.name}
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={'prefixIcon'} />,
            }}
            placeholder={'请输入真实姓名：'}
            rules={[
              {
                required: true,
                message: '请输入姓名!',
              },
            ]}
          />

          <ProFormRadio.Group
            label="性别"
            name="sex"
            initialValue={props.values.sex}
            options={[
              { value: 1, label: '男' },
              { value: 2, label: '女' },
            ]}
          />

          <ProFormDigit
            label="年龄"
            name="age"
            initialValue={props.values.age}
            fieldProps={{
              size: 'large',
              prefix: <StarOutlined className={'prefixIcon'} />,
            }}
            placeholder={'请输入年龄：'}
            rules={[
              {
                required: true,
                message: '请输入年龄！',
              },
            ]}
          />
          <ProFormText
            label="地址"
            name="address"
            initialValue={props.values.address}
            fieldProps={{
              size: 'large',
              prefix: <EnvironmentOutlined className={'prefixIcon'} />,
            }}
            placeholder={'请输入地址：'}
            rules={[
              {
                required: true,
                message: '请输入地址！',
              },
            ]}
          />
          <ProFormText
            label="电话"
            name="tel"
            initialValue={props.values.tel}
            fieldProps={{
              size: 'large',
              prefix: <PhoneOutlined className={'prefixIcon'} />,
            }}
            placeholder={'请输入电话：'}
            rules={[
              {
                required: true,
                message: '请输入电话！',
              },
            ]}
          />
        </ProForm>
      </Modal>
    </>
  );
};

export default UpdateForm;
