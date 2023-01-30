import { Form, Input } from 'antd';
import React from 'react';

const pwdInfo = {
  old: '',
  new: '',
  repeat: '',
};

const BasicInfo: React.FC = () => {
  return (
    <>
      <Form name="basic" labelCol={{ span: 4 }} wrapperCol={{ span: 18 }} autoComplete="off">
        <Form.Item label="旧密码" name="old" rules={[{ required: true, message: '请输入旧密码' }]}>
          <Input.Password defaultValue={pwdInfo.old} />
        </Form.Item>
        <Form.Item label="新密码" name="new" rules={[{ required: true, message: '请输入新密码' }]}>
          <Input.Password defaultValue={pwdInfo.new} />
        </Form.Item>
        <Form.Item
          label="重复密码"
          name="repeat"
          rules={[{ required: true, message: '请重复新密码' }]}
        >
          <Input.Password defaultValue={pwdInfo.repeat} />
        </Form.Item>
      </Form>
    </>
  );
};

export default BasicInfo;
