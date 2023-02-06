import { ProForm, ProFormRadio, ProFormText } from '@ant-design/pro-components';
import React, { useState } from 'react';
import { Modal } from 'antd';

type LayoutType = Parameters<typeof ProForm>[0]['layout'];
const LAYOUT_TYPE_HORIZONTAL = 'horizontal';

export type CheckApplyValueType = {
  id?: number;
  apply_status?: number;
} & Partial<API.ApplyListItem>;

export type CheckApplyFormProps = {
  onCancel: (flag?: boolean, formVals?: CheckApplyValueType) => void;
  onSubmit: (values: CheckApplyValueType) => Promise<void>;
  checkModalVisible: boolean;
  values: Partial<API.ApplyListItem>;
};

const CheckApply: React.FC<CheckApplyFormProps> = (props) => {
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
          console.log(props, 'checkprops');
        }}
        footer={null}
      >
        <ProForm layout={formLayoutType} onFinish={props.onSubmit}>
          <ProFormText
            label="报名Id"
            name="id"
            disabled
            initialValue={props.values.id}
            fieldProps={{
              size: 'large',
            }}
          />
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
