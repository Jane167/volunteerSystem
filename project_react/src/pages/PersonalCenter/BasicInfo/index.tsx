import { Form, Input } from 'antd';
import React from 'react';

const userInfo = {
  username: '李佳音',
  first_name: '李',
  last_name: '佳音',
  email: '123456@qq.com',
  role: 1,
  create_time: '2023-1-14 18:00:00',
  last_login: '2023-1-14 18:00:00',
};

const BasicInfo: React.FC = () => {
  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        autoComplete="off"
      >
        <Form.Item
          label="用户名"
          name={userInfo.username}
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input defaultValue={userInfo.username} />
        </Form.Item>

        <Form.Item
          label="姓"
          name={userInfo.first_name}
        >
          <Input defaultValue={userInfo.first_name} />
        </Form.Item>
        <Form.Item
          label="名"
          name={userInfo.last_name}
        >
          <Input defaultValue={userInfo.last_name} />
        </Form.Item>
        <Form.Item
          label="邮箱"
          name={userInfo.email}
        >
          <Input defaultValue={userInfo.email} />
        </Form.Item>
      </Form>
    </>
  );
};

export default BasicInfo;
