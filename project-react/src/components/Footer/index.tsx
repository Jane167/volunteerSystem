import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';

const Footer: React.FC = () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: '卑微女大学生',
  });

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
          href: '#',
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
          href: '#',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
