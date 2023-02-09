import { updateUserPwd } from '@/services/user';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { message } from 'antd';
import React, { useState } from 'react';
type LayoutType = Parameters<typeof ProForm>[0]['layout'];
const LAYOUT_TYPE_HORIZONTAL = 'horizontal';

const pwdInfo = {
  old_password: '',
  new_password: '',
  confirm_password: '',
};

/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdatePwd = async (fields: {
  new_password?: string;
  old_password?: string;
  confirm_password?: string;
}) => {
  const hide = message.loading('更新中...');
  const id = Number(sessionStorage.getItem('user_id'));
  console.log(fields, 'fields==>');

  if (fields.new_password !== fields.confirm_password) {
    hide();
    message.error('两次新密码不一致，请重新输入!');
    return false;
  } else {
    try {
      await updateUserPwd(
        {
          new_password: fields.new_password,
          old_password: fields.old_password,
        },
        id,
      );
      hide();

      message.success('更新成功！');
      return true;
    } catch (error) {
      hide();
      message.error('更新失败，请重试!');
      return false;
    }
  }
};

const ModifyPwd: React.FC = () => {
  const [formLayoutType] = useState<LayoutType>(LAYOUT_TYPE_HORIZONTAL);

  return (
    <>
      <ProForm layout={formLayoutType} onFinish={handleUpdatePwd}>
        <ProFormText.Password
          label="旧密码"
          name="old_password"
          initialValue={pwdInfo.old_password}
          fieldProps={{
            size: 'large',
          }}
          rules={[
            {
              required: true,
              message: '请输入旧密码！',
            },
          ]}
        />
        <ProFormText.Password
          label="新密码"
          name="new_password"
          initialValue={pwdInfo.new_password}
          placeholder={'请输入新密码：'}
          rules={[
            {
              required: true,
              message: '请输入新密码!',
            },
          ]}
        />
        <ProFormText.Password
          label="确认密码"
          name="confirm_password"
          initialValue={pwdInfo.confirm_password}
          placeholder={'请再次输入新密码：'}
          rules={[
            {
              required: true,
              message: '请再次输入密码!',
            },
          ]}
        />
      </ProForm>
    </>
  );
};

export default ModifyPwd;
