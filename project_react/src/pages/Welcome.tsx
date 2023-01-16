import { PageContainer } from '@ant-design/pro-components';
import { Card, Row, Col, Carousel, Image, Tabs } from 'antd';
import { Column, WordCloud, Pie, measureTextWidth } from '@ant-design/plots';
import React from 'react';
import { GithubOutlined, TeamOutlined } from '@ant-design/icons';

import img1 from '../assests/img/carousel1.jpg';
import img2 from '../assests/img/carousel2.jpg';
import img3 from '../assests/img/carousel3.jpg';
import img4 from '../assests/img/carousel4.jpg';
import img5 from '../assests/img/carousel5.jpg';
import cnmap1 from '../assests/img/cnmap1.png';
import cnmap2 from '../assests/img/cnmap2.png';
import cnmap3 from '../assests/img/cnmap3.png';
import cnmap4 from '../assests/img/cnmap4.png';
const rowStyle: React.CSSProperties = {
  marginTop: '10px',
};

/**
 * 每个单独的卡片，为了复用样式抽成了组件
 * @param param0
 * @returns
 */
const InfoCard: React.FC<{
  title: string;
  index: number;
  desc: string;
  href: string;
}> = ({ title, href, index, desc }) => {
  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        boxShadow: '0 2px 4px 0 rgba(35,49,128,0.02), 0 4px 8px 0 rgba(49,69,179,0.02)',
        borderRadius: '8px',
        fontSize: '14px',
        color: 'rgba(0,0,0,0.65)',
        textAlign: 'justify',
        lineHeight: ' 22px',
        padding: '16px 19px',
        flex: 1,
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '4px',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            lineHeight: '22px',
            backgroundSize: '100%',
            textAlign: 'center',
            padding: '8px 16px 16px 12px',
            color: '#FFF',
            fontWeight: 'bold',
            backgroundImage:
              "url('https://gw.alipayobjects.com/zos/bmw-prod/daaf8d50-8e6d-4251-905d-676a24ddfa12.svg')",
          }}
        >
          {index}
        </div>
        <div
          style={{
            fontSize: '16px',
            color: 'rgba(0, 0, 0, 0.85)',
            paddingBottom: 8,
          }}
        >
          {title}
        </div>
      </div>
      <div
        style={{
          fontSize: '14px',
          color: 'rgba(0,0,0,0.65)',
          textAlign: 'justify',
          lineHeight: '22px',
          marginBottom: 8,
        }}
      >
        {desc}
      </div>
      <a href={href} target="_blank" rel="noreferrer">
        了解更多 {'>'}
      </a>
    </div>
  );
};
/**
 *
 * @returns 词云图
 */
const DemoWordCloud = () => {
  const data = [
    {
      value: 9,
      name: 'AntV',
    },
    {
      value: 8,
      name: 'G2Plot',
    },
    {
      value: 9,
      name: 'Ant Design Charts',
    },
    {
      value: 12,
      name: 'React',
    },
    {
      value: 10,
      name: 'Ant Design',
    },
    {
      value: 11,
      name: 'Ant Design Pro',
    },
    {
      value: 16,
      name: 'DRF',
    },
    {
      value: 12,
      name: 'Django',
    },
    {
      value: 10,
      name: 'MySQL',
    },
    {
      value: 13,
      name: 'umi',
    },
    {
      value: 10,
      name: 'TypeScript',
    },
    {
      value: 15,
      name: 'TypeScriptXML',
    },
    {
      value: 14,
      name: 'React DOM',
    },
    {
      value: 10,
      name: 'EsLint',
    },
    {
      value: 10,
      name: 'Github',
    },
    {
      value: 10,
      name: 'Gitee',
    },
    {
      value: 10,
      name: 'less',
    },
    {
      value: 10,
      name: 'css',
    },
    {
      value: 11,
      name: 'Swagger',
    },
    {
      value: 11,
      name: 'Pro Components',
    },
    {
      value: 7,
      name: 'yarn',
    },
    {
      value: 7,
      name: 'npm',
    },
    {
      value: 9,
      name: 'Python',
    },
  ];
  const config = {
    data,
    wordField: 'name',
    weightField: 'value',
    colorField: 'name',
    wordStyle: {
      fontFamily: 'Verdana',
      fontSize: [16, 32],
      rotation: 0,
    },
    height: 250,
    spiral: 'rectangular',
    // autoFit: true,
    // 返回值设置成一个 [0, 1) 区间内的值，
    // 可以让每次渲染的位置相同（前提是每次的宽高一致）。
    random: () => 0.5,
  };

  return <WordCloud {...config} />;
};
/**
 *
 * @returns 环图
 */
const DemoPie = () => {
  function renderStatistic(containerWidth, text, style) {
    const { width: textWidth, height: textHeight } = measureTextWidth(text, style);
    const R = containerWidth / 2; // r^2 = (w / 2)^2 + (h - offsetY)^2

    let scale = 1;

    if (containerWidth < textWidth) {
      scale = Math.min(
        Math.sqrt(
          Math.abs(Math.pow(R, 2) / (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2))),
        ),
        1,
      );
    }

    const textStyleStr = `width:${containerWidth}px;`;
    return `<div style="${textStyleStr};font-size:${scale}em;line-height:${
      scale < 1 ? 1 : 'inherit'
    };">${text}</div>`;
  }
  const data = [
    {
      type: '管理员',
      value: 27,
    },
    {
      type: '公益企业',
      value: 25,
    },
    {
      type: '普通用户',
      value: 18,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.6,
    height: 250,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    interactions: [
      // 添加 中心统计文本 交互
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
      {
        type: 'pie-statistic-active',
      },
    ],
    statistic: {
      title: {
        offsetY: -4,
        customHtml: (container, view, datum) => {
          const { width, height } = container.getBoundingClientRect();
          const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
          const text = datum ? datum.type : '总计';
          return renderStatistic(d, text, {
            fontSize: 28,
          });
        },
      },
      content: {
        offsetY: 4,
        style: {
          fontSize: '32px',
        },
        customHtml: (container, view, datum, data) => {
          const { width } = container.getBoundingClientRect();
          const text = datum ? `${datum.value}` : `${data.reduce((r, d) => r + d.value, 0)}`;
          return renderStatistic(width, text, {
            fontSize: 32,
          });
        },
      },
    },
  };
  return <Pie {...config} />;
};

const Welcome: React.FC = () => {
  const data = [
    {
      countSeries: '需要人数',
      activeName: '活动1',
      count: 20,
    },
    {
      countSeries: '需要人数',
      activeName: '活动2',
      count: 50,
    },
    {
      countSeries: '需要人数',
      activeName: '活动3',
      count: 10,
    },
    {
      countSeries: '需要人数',
      activeName: '活动4',
      count: 40,
    },
    {
      countSeries: '需要人数',
      activeName: '活动5',
      count: 15,
    },
    {
      countSeries: '已报名人数',
      activeName: '活动1',
      count: 10,
    },
    {
      countSeries: '已报名人数',
      activeName: '活动2',
      count: 9,
    },
    {
      countSeries: '已报名人数',
      activeName: '活动3',
      count: 8,
    },
    {
      countSeries: '已报名人数',
      activeName: '活动4',
      count: 8,
    },
    {
      countSeries: '已报名人数',
      activeName: '活动5',
      count: 6,
    },
    {
      countSeries: '审核通过人数',
      activeName: '活动1',
      count: 2,
    },
    {
      countSeries: '审核通过人数',
      activeName: '活动2',
      count: 5,
    },
    {
      countSeries: '审核通过人数',
      activeName: '活动3',
      count: 6,
    },
    {
      countSeries: '审核通过人数',
      activeName: '活动4',
      count: 7,
    },
    {
      countSeries: '审核通过人数',
      activeName: '活动5',
      count: 4,
    },
  ];
  const config = {
    data,
    height: 300,
    isGroup: true,
    xField: 'activeName',
    yField: 'count',
    seriesField: 'countSeries',
  };
  return (
    <PageContainer>
      <Card
        style={{
          borderRadius: 8,
        }}
        bodyStyle={{
          backgroundImage:
            'radial-gradient(circle at 97% 10%, #EBF2FF 0%, #F5F8FF 28%, #EBF1FF 124%)',
        }}
      >
        <div
          style={{
            backgroundPosition: '100% -30%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '274px auto',
            backgroundImage:
              "url('https://gw.alipayobjects.com/mdn/rms_a9745b/afts/img/A*BuFmQqsB2iAAAAAAAAAAAAAAARQnAQ')",
          }}
        >
          <div
            style={{
              fontSize: '20px',
              color: '#1A1A1A',
            }}
          >
            欢迎使用志愿吧平台！
          </div>
          <p
            style={{
              fontSize: '14px',
              color: 'rgba(0,0,0,0.65)',
              lineHeight: '22px',
              marginTop: 16,
              marginBottom: 32,
              width: '65%',
            }}
          >
            志愿吧平台是一款基于 DRF + React
            下的疫情防控社区志愿者管理系统，自2019年以来，新冠疫情形式严峻，各省市各级工作人员全民参与防疫抗疫工作，
            根据疫情防控工作需要，为进一步组织和引导全省市在校大学生和社区志愿者，搭建该志愿者管理系统，致力于科学有序助力社区疫情防控工作，携手共筑疫情防线，巩固疫情防控成果。
          </p>
          <div
            style={{
              display: 'flex',
              gap: 16,
            }}
          >
            <InfoCard
              index={1}
              href="https://umijs.org/docs/introduce/introduce"
              title="志愿活动1"
              desc="众志成城战疫情，志愿服务在行动！"
            />
            <InfoCard
              index={2}
              title="志愿活动2"
              href="https://ant.design"
              desc="志愿服务暖人心，齐心协力战疫情！"
            />
            <InfoCard
              index={3}
              title="志愿活动3"
              href="https://procomponents.ant.design"
              desc="抗击疫情，志愿同行。"
            />
          </div>
        </div>
      </Card>
      <Row gutter={16} style={rowStyle}>
        <Col span={14}>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="实名注册志愿者人数分布图" key="1">
              <Image src={cnmap1} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="志愿者团体数量分布图" key="2">
              <Image src={cnmap2} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="志愿项目数量分布图" key="3">
              <Image src={cnmap3} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="累计志愿服务时间分布图" key="4">
              <Image src={cnmap4} />
            </Tabs.TabPane>
          </Tabs>
        </Col>
        <Col span={10}>
          <Row>
            <Col span={24}>
              <Column {...config} />
            </Col>
          </Row>
          <Row style={rowStyle}>
            <Col span={24}>
              <Carousel autoplay>
                <div>
                  <Image src={img1} />
                </div>
                <div>
                  <Image src={img2} />
                </div>
                <div>
                  <Image src={img3} />
                </div>
                <div>
                  <Image src={img4} />
                </div>
                <div>
                  <Image src={img5} />
                </div>
              </Carousel>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={16} style={rowStyle}>
        <Col span={12}>
          <Card
            style={{
              borderRadius: 8,
            }}
            title="技术栈"
            extra={
              <a href="https://github.com/jiayin-wait/volunteerSystem.git">
                <GithubOutlined />
                源码地址
              </a>
            }
          >
            <DemoWordCloud />
          </Card>
        </Col>
        <Col span={12}>
          <Card
            style={{
              borderRadius: 8,
            }}
            title="系统用户数量"
            extra={
              <a href="#">
                <TeamOutlined />
                用户管理
              </a>
            }
          >
            <DemoPie />
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default Welcome;
