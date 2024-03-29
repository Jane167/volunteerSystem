// @ts-ignore
/* eslint-disable */

// import ActivityTableList from "@/pages/ActivityTableList";

declare namespace API {
  type CurrentUser = {
    id?: number;
    username?: string;
    passwoed?: string;
    email?: string;
    groups?: string[];
    first_name?: string;
    last_name?: string;
    last_login?: string;
    date_joined?: string;
  };

  type LoginResult = {
    status?: string;
    type?: string;
    currentAuthority?: string;
    user_id?: number;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };
  type Response = {
    data?: {
      message?: string;
    };
    success?: boolean;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    desc?: string;
    address?: string;
    startDate?: string;
    startTime?: string;
    requirements?: string;
    needPersonNum?: number;
    applyPersonNum?: number;
    passPersonNum?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };

  type ActivityListItem = {
    id?: number;
    name?: string;
    desc?: string;
    publish_company_name?: string;
    address?: string;
    start_date?: string;
    start_time?: string;
    demand?: string;
    need_person_num?: number;
    apply_person_num?: number;
    pass_person_num?: number;
    create_time?: string;
  };
  type ActivityList = {
    data?: ActivityListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type UsersListItem = {
    id?: number;
    username?: string;
    password?: string;
    email?: string;
    groups?: string[];
    first_name?: string;
    last_name?: string;
    last_login?: string;
    date_joined?: string;
  };
  type UsersList = {
    data?: UsersListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type ApplyListItem = {
    id?: number;
    name?: string;
    age?: number;
    sex?: number;
    address?: string;
    tel?: string;
    apply_status?: number;
    apply_time?: string;
    belonging_activity_name?: string;
    belonging_activity?: number;
  };

  type ApplyList = {
    data?: ApplyListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };
  type LinkListItem = {
    id?: number;
    link_name?: string;
    link_address?: string;
    create_time?: string;
    update_time?: string;
  };

  type LinkList = {
    data?: LinkListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };
}
