import { PageContainer } from '@ant-design/pro-components';
import React from 'react';

const rowStyle: React.CSSProperties = {
  marginTop: '10px',
};

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
    <div>
      修改基本资料
    </div>
  );
};

export default BasicInfo;
