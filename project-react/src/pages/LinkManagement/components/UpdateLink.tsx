import { ProForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import React, { useState } from 'react';
import { Modal } from 'antd';

type LayoutType = Parameters<typeof ProForm>[0]['layout'];
const LAYOUT_TYPE_HORIZONTAL = 'horizontal';

export type UpdateLinkValueType = {
  id?: number;
  link_name?: string;
  link_address?: string;
} & Partial<API.LinkListItem>;

export type LinkFormProps = {
  onCancel: (flag?: boolean, formVals?: UpdateLinkValueType) => void;
  onSubmit: (values: UpdateLinkValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<API.LinkListItem>;
};

const UpdateLink: React.FC<LinkFormProps> = (props) => {
  const [formLayoutType] = useState<LayoutType>(LAYOUT_TYPE_HORIZONTAL);
  return (
    <>
      <Modal
        width={640}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="编辑友情链接"
        open={props.updateModalVisible}
        onCancel={() => {
          props.onCancel();
          console.log(props, 'checkprops');
        }}
        footer={null}
      >
        <ProForm layout={formLayoutType} onFinish={props.onSubmit}>
        <ProFormText
            label="链接Id"
            name="id"
            fieldProps={{
              size: 'large',
            }}
            disabled
            initialValue={props.values.id}
            rules={[
              {
                required: true,
                message: '请输入链接Id！',
              },
            ]}
          />
          <ProFormText
            label="链接名称"
            name="link_name"
            fieldProps={{
              size: 'large',
            }}
            initialValue={props.values.link_name}
            rules={[
              {
                required: true,
                message: '请输入链接名称！',
              },
            ]}
          />
          <ProFormText
            label="链接地址"
            name="link_address"
            fieldProps={{
              size: 'large',
            }}
            initialValue={props.values.link_address}
            rules={[
              {
                required: true,
                message: '请输入链接地址！',
              },
            ]}
          />
        </ProForm>
      </Modal>
    </>
  );
};

export default UpdateLink;
