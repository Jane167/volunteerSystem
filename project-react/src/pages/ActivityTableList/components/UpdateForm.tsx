import {
  ProFormDatePicker,
  ProFormDigit,
  ProFormText,
  ProFormTextArea,
  StepsForm,
  ProFormTimePicker,
} from '@ant-design/pro-components';
import { Modal } from 'antd';
import React from 'react';

export type UpdateFormValueType = {
  id?: number;
  name?: string;
  desc?: string;
  publish_company_name?: string;
  address?: string;
  start_date: string;
  start_time: string;
  demand: string;
  need_person_num: number;
} & Partial<API.ActivityListItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: UpdateFormValueType) => void;
  onSubmit: (values: UpdateFormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<API.ActivityListItem>;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  return (
    <StepsForm
      stepsProps={{
        size: 'small',
      }}
      stepsFormRender={(dom, submitter) => {
        return (
          <Modal
            width={640}
            bodyStyle={{ padding: '32px 40px 48px' }}
            destroyOnClose
            title={props.values.id ? '编辑活动' : '新建活动'}
            open={props.updateModalVisible}
            footer={submitter}
            onCancel={() => {
              props.onCancel();
              console.log(props.values, '=======>');
              console.log(new Date(String(props.values.start_time)))
            }}
          >
            {dom}
          </Modal>
        );
      }}
      onFinish={props.onSubmit}
    >
      <StepsForm.StepForm
        initialValues={{
          id: props.values.id,
          name: props.values.name,
          desc: props.values.desc,
          publish_company_name: props.values.publish_company_name,
        }}
        title={'基本信息'}
      >
        <ProFormText name="id" label="Id" width="md" disabled />
        <ProFormText
          name="name"
          label={'活动名称'}
          width="md"
          rules={[
            {
              required: true,
              message: '请输入活动名称！',
            },
          ]}
        />
        <ProFormTextArea
          name="desc"
          width="md"
          label={'活动描述'}
          placeholder={'请输入至少五个字符'}
          rules={[
            {
              required: true,
              message: '请输入至少五个字符的活动描述！',
              min: 5,
            },
          ]}
        />
        <ProFormText
          name="publish_company_name"
          label="发布企业"
          width="md"
          rules={[
            {
              required: true,
              message: '请输入发布企业名称！',
            },
          ]}
        />
      </StepsForm.StepForm>
      <StepsForm.StepForm
        initialValues={{
          address: props.values.address,
          start_date: props.values.start_date,
          start_time: new Date(String(props.values.start_time)).getTime(),
        }}
        title={'时间地点信息'}
      >
        <ProFormText
          name="address"
          label={'活动地点'}
          width="md"
          rules={[
            {
              required: true,
              message: '请输入活动地点！',
            },
          ]}
        />
        <ProFormDatePicker
          name="start_date"
          width="md"
          label={'开始日期'}
          rules={[
            {
              required: true,
              message: '开始日期不能小于现在！',
            },
          ]}
        />
        <ProFormTimePicker
          name="start_time"
          width="md"
          label={'开始时间'}
          rules={[
            {
              required: true,
              message: '开始时间不能小于现在！',
            },
          ]}
        />
      </StepsForm.StepForm>
      <StepsForm.StepForm
        initialValues={{
          demand: props.values.demand,
          need_person_num: props.values.need_person_num,
        }}
        title={'需求信息'}
      >
        <ProFormTextArea
          name="demand"
          width="md"
          label={'活动要求'}
          rules={[
            {
              required: true,
              message: '请输入活动要求！',
            },
          ]}
        />
        <ProFormDigit
          name="need_person_num"
          width="md"
          label={'需要人数'}
          rules={[
            {
              required: true,
              message: '请输入该活动需要人数！',
            },
          ]}
          min={1}
          max={9999}
        />
      </StepsForm.StepForm>
    </StepsForm>
  );
};

export default UpdateForm;
