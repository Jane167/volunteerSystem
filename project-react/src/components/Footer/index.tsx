import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';

const Footer: React.FC = () => {
  const defaultMessage = 'Jiayin Li All Rights Reserved.'

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: '志愿吧',
          title: '志愿吧',
          href: 'https://gitee.com/li-jiayin167/volunteerSystem.git',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/jiayin-wait/volunteerSystem.git',
          blankTarget: true,
        },
        {
          key: '基于 DRF+React 的疫情防控社区志愿者管理系统',
          title: '基于 DRF+React 的疫情防控社区志愿者管理系统',
          href: 'https://gitee.com/li-jiayin167/volunteerSystem.git',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
