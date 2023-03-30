import { ProForm, ProFormRadio, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import React, { useState } from 'react';
import { Modal } from 'antd';

type LayoutType = Parameters<typeof ProForm>[0]['layout'];
const LAYOUT_TYPE_HORIZONTAL = 'horizontal';

export type UserValueType = {
  id?: string;
  username?: string;
  password?: string;
  groups?: string[];
  first_name?: string;
  last_name?: string;
} & Partial<API.UsersListItem>;

export type CheckApplyFormProps = {
  onCancel: (flag?: boolean, formVals?: UserValueType) => void;
  onSubmit: (values: UserValueType) => Promise<void>;
  updateUserModalVisible: boolean;
  values: Partial<API.UsersListItem>;
};

const AddUser: React.FC<CheckApplyFormProps> = (props) => {
  const [formLayoutType] = useState<LayoutType>(LAYOUT_TYPE_HORIZONTAL);
  const roleValueEnum = [
    { value: 'manager', label: '管理员' },
    { value: 'company', label: '公益企业' },
    { value: 'common', label: '普通用户' },
  ];
  return (
    <>
      <Modal
        width={640}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="添加用户"
        open={props.updateUserModalVisible}
        onCancel={() => {
          props.onCancel();
        }}
        footer={null}
      >
        <ProForm layout={formLayoutType} onFinish={props.onSubmit}>
          <ProFormText label="用户Id" name="id" initialValue={props.values.id} disabled />
          <ProFormText
            label="用户名"
            name="username"
            initialValue={props.values.username}
            fieldProps={{
              size: 'large',
            }}
            rules={[
              {
                required: true,
                message: '请输入用户名！',
              },
            ]}
          />
          <ProFormText.Password
            label="密码"
            name="password"
            fieldProps={{
              size: 'large',
            }}
            initialValue={props.values.password}
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />
          <ProFormText
            label="邮箱"
            name="email"
            initialValue={props.values.email}
            fieldProps={{
              size: 'large',
            }}
          />
          <ProFormText
            label="姓"
            name="first_name"
            initialValue={props.values.first_name}
            fieldProps={{
              size: 'large',
            }}
          />
          <ProFormText
            label="名"
            name="last_name"
            initialValue={props.values.last_name}
            fieldProps={{
              size: 'large',
            }}
          />
          <ProFormSelect
            label="角色"
            name="groups"
            fieldProps={{
              mode: 'multiple',
            }}
            initialValue={props.values.groups}
            options={roleValueEnum}
            rules={[
              {
                required: true,
                message: '请选择角色！',
              },
            ]}
          />
        </ProForm>
      </Modal>
    </>
  );
};

export default AddUser;
