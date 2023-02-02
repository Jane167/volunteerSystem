import {
  ProFormDatePicker,
  ProFormDigit,
  ProFormText,
  ProFormTextArea,
  StepsForm,
  ProFormTimePicker,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
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
  const intl = useIntl();
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
            title={intl.formatMessage({
              id: 'pages.searchTable.updateForm.ruleConfig',
              defaultMessage: '规则配置',
            })}
            open={props.updateModalVisible}
            footer={submitter}
            onCancel={() => {
              props.onCancel();
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
        title={intl.formatMessage({
          id: 'pages.searchActivityTable.first.title',
          defaultMessage: '基本信息',
        })}
      >
        <ProFormText
          name="id"
          label="Id"
          width="md"
          disabled
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchActivityTable.updateForm.ruleName.nameRules"
                  defaultMessage="请输入活动Id！"
                />
              ),
            },
          ]}
        />
        <ProFormText
          name="name"
          label={intl.formatMessage({
            id: 'pages.searchActivityTable.updateForm.ruleName.nameLabel',
            defaultMessage: '活动名称',
          })}
          width="md"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchActivityTable.updateForm.ruleName.nameRules"
                  defaultMessage="请输入活动名称！"
                />
              ),
            },
          ]}
        />
        <ProFormTextArea
          name="desc"
          width="md"
          label={intl.formatMessage({
            id: 'pages.searchActivityTable.updateForm.ruleDesc.descLabel',
            defaultMessage: '活动描述',
          })}
          placeholder={intl.formatMessage({
            id: 'pages.searchActivityTable.updateForm.ruleDesc.descPlaceholder',
            defaultMessage: '请输入至少五个字符',
          })}
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchActicvityTable.updateForm.ruleDesc.descRules"
                  defaultMessage="请输入至少五个字符的活动描述！"
                />
              ),
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
              message: (
                <FormattedMessage
                  id="pages.searchActivityTable.updateForm.ruleName.nameRules"
                  defaultMessage="请输入发布企业名称！"
                />
              ),
            },
          ]}
        />
      </StepsForm.StepForm>
      <StepsForm.StepForm
        initialValues={{
          address: props.values.address,
          start_date: props.values.start_date,
          start_time: props.values.start_time,
        }}
        title={intl.formatMessage({
          id: 'pages.searchTable.updateForm.second.title',
          defaultMessage: '时间地点信息',
        })}
      >
        <ProFormText
          name="address"
          label={intl.formatMessage({
            id: 'pages.searchActivityTable.updateForm.ruleAddress.addressLabel',
            defaultMessage: '活动地点',
          })}
          width="md"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchActicityTable.updateForm.ruleAddress.addressRules"
                  defaultMessage="请输入活动地点！"
                />
              ),
            },
          ]}
        />
        <ProFormDatePicker
          name="start_date"
          width="md"
          label={intl.formatMessage({
            id: 'page.searchTable.updateForm.ruleStartDate.startDateLabel',
            defaultMessage: '开始日期',
          })}
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchActivityTable.updateForm.ruleStartDate.startDateRules"
                  defaultMessage="开始时间不能小于现在！"
                />
              ),
            },
          ]}
        />
        <ProFormTimePicker
          name="start_time"
          width="md"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleStartTime.startTimeLabel',
            defaultMessage: '开始时间',
          })}
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchActivityTable.updateForm.ruleStartTime.startTimeRules"
                  defaultMessage="开始日期不能小于现在！"
                />
              ),
            },
          ]}
        />
      </StepsForm.StepForm>
      <StepsForm.StepForm
        initialValues={{
          demand: props.values.demand,
          need_person_num: props.values.need_person_num,
        }}
        title={intl.formatMessage({
          id: 'pages.searchTable.updateForm.third.title',
          defaultMessage: '需求信息',
        })}
      >
        <ProFormTextArea
          name="demand"
          width="md"
          label={intl.formatMessage({
            id: 'pages.searchActivity.updateForm.ruleRequirements.requirementsLabel',
            defaultMessage: '活动要求',
          })}
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchActivityTable.updateForm.ruleRequirements.requirementsLabel"
                  defaultMessage="请输入活动要求！"
                />
              ),
            },
          ]}
        />
        <ProFormDigit
          name="need_person_num"
          width="md"
          label={intl.formatMessage({
            id: 'pages.searchActivity.updateForm.ruleNeedPersonNum.needPersonNumLabel',
            defaultMessage: '需要人数',
          })}
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchActivityTable.updateForm.ruleNeedPersonNum.needPersonNumRules"
                  defaultMessage="请输入该活动需要人数！"
                />
              ),
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
