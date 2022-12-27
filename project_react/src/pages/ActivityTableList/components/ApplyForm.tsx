import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import React from 'react';
import { Modal } from 'antd';

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.RuleListItem>;

export type ApplyFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  applyModalVisible: boolean;
  values: Partial<API.RuleListItem>;
};

const ApplyForm: React.FC<ApplyFormProps> = (props) => {
  const intl = useIntl();
  return (
    <>
      <Modal
        width={640}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title={intl.formatMessage({
          id: 'pages.searchTable.applyForm.title',
          defaultMessage: '填写报名信息',
        })}
        visible={props.applyModalVisible}
        onCancel={() => {
          props.onCancel();
        }}
      >
        <ProForm>
          <ProFormText
            name="name"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={'prefixIcon'} />,
            }}
            placeholder={'姓名: admin or user'}
            rules={[
              {
                required: true,
                message: '请输入姓名!',
              },
            ]}
          />
          <ProFormText
            name="sex"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={'prefixIcon'} />,
            }}
            placeholder={'性别: ant.design'}
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />
          <ProFormText
            name="age"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={'prefixIcon'} />,
            }}
            placeholder={'年龄: ant.design'}
            rules={[
              {
                required: true,
                message: '请输入年龄！',
              },
            ]}
          />
        </ProForm>
      </Modal>
    </>
  );
};

export default ApplyForm;
