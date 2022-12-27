import {
  UserOutlined,
  StarOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import { ProForm, ProFormDigit, ProFormRadio, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import React, { useState } from 'react';
import { Modal } from 'antd';

type LayoutType = Parameters<typeof ProForm>[0]['layout'];
const LAYOUT_TYPE_HORIZONTAL = 'horizontal';

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
  const [formLayoutType, setFormLayoutType] = useState<LayoutType>(LAYOUT_TYPE_HORIZONTAL);
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
        <ProForm layout={formLayoutType}>
          <ProFormText
            label="姓名"
            name="name"
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
            name="invoiceType"
            initialValue="性别"
            options={['男', '女']}
            placeholder={'请选择性别：'}
            rules={[
              {
                required: true,
                message: '请选择性别！',
              },
            ]}
          />
          <ProFormSelect
            label="年级"
            name="grade"
            fieldProps={{
              size: 'large',
            }}
            valueEnum={{
              1: '大一',
              2: '大二',
              3: '大三',
              4: '大四',
              5: '研一',
              6: '研二',
              7: '研三',
            }}
            placeholder={'请选择年级：'}
            rules={[
              {
                required: true,
                message: '请输入年级！',
              },
            ]}
          />
          <ProFormDigit
            label="年龄"
            name="age"
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

export default ApplyForm;
