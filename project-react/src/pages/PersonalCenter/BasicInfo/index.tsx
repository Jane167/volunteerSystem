import { updateUser } from '@/services/user';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { message } from 'antd';
import React, { useState } from 'react';
type LayoutType = Parameters<typeof ProForm>[0]['layout'];
const LAYOUT_TYPE_HORIZONTAL = 'horizontal';

const userInfo = JSON.parse(String(sessionStorage.getItem('currentUser')));

/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: {
  username: any;
  first_name: any;
  last_name: any;
  email: any;
  id: number | undefined;
}) => {
  const hide = message.loading('更新中...');
  console.log(fields, 'fields==>');
  try {
    await updateUser(
      {
        username: fields.username,
        first_name: fields.first_name,
        last_name: fields.last_name,
        email: fields.email,
      },
      userInfo.id,
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

const BasicInfo: React.FC = () => {
  const [formLayoutType] = useState<LayoutType>(LAYOUT_TYPE_HORIZONTAL);

  return (
    <>
      <ProForm layout={formLayoutType} onFinish={handleUpdate}>
        <ProFormText
          label="用户名"
          name="username"
          initialValue={userInfo.username}
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
        <ProFormText
          label="姓"
          name="first_name"
          initialValue={userInfo.first_name}
          placeholder={'请输入姓：'}
          rules={[
            {
              required: true,
              message: '请输入姓!',
            },
          ]}
        />
        <ProFormText
          label="名"
          name="last_name"
          initialValue={userInfo.last_name}
          placeholder={'请输入名：'}
          rules={[
            {
              required: true,
              message: '请输入名!',
            },
          ]}
        />
        <ProFormText
          label="邮箱"
          name="email"
          initialValue={userInfo.email}
          placeholder={'请输入邮箱：'}
          rules={[
            {
              required: true,
              message: '请输入邮箱!',
            },
          ]}
        />
      </ProForm>
    </>
  );
};

export default BasicInfo;
