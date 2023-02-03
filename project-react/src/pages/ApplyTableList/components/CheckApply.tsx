import { UserOutlined, StarOutlined, EnvironmentOutlined, PhoneOutlined } from '@ant-design/icons';
import {
  ProForm,
  ProFormRadio,
} from '@ant-design/pro-components';
import React, { useState } from 'react';
import { Modal } from 'antd';

type LayoutType = Parameters<typeof ProForm>[0]['layout'];
const LAYOUT_TYPE_HORIZONTAL = 'horizontal';

export type CheckApplyValueType = {
  apply_status?: number;
} & Partial<API.ApplyListItem>;

export type ApplyFormProps = {
  onCancel: (flag?: boolean, formVals?: CheckApplyValueType) => void;
  onSubmit: (values: CheckApplyValueType) => Promise<void>;
  checkModalVisible: boolean;
  values: Partial<API.ApplyListItem>;
};

const CheckApply: React.FC<ApplyFormProps> = (props) => {
  const [formLayoutType] = useState<LayoutType>(LAYOUT_TYPE_HORIZONTAL);
  return (
    <>
      <Modal
        width={640}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="审核报名信息"
        open={props.checkModalVisible}
        onCancel={() => {
          props.onCancel();
        }}
        footer={null}
      >
        <ProForm layout={formLayoutType} onFinish={props.onSubmit}>
          <ProFormRadio.Group
            label="审核意见"
            name="apply_status"
            initialValue={props.values.apply_status}
            options={[
              { value: 1, label: '通过' },
              { value: 2, label: '不通过' },
            ]}
          />
        </ProForm>
      </Modal>
    </>
  );
};

export default CheckApply;
