import React from 'react';
import { Card, Col, Row } from 'antd';
import styled from 'styled-components';
import backgroundImage from 'src/assets/images/profile/analysis2.png'; // 导入图片

// 版心布局
const Container = styled.div`
    width: 66.66%;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
`;

// 左侧大卡片样式
const WelcomeCard = styled.div`
    color: #fff;
    border-radius: 8px;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    overflow: hidden;

    /* 添加背景图片 */
    background-image: url(${backgroundImage});
    background-size: cover; /* 确保图片覆盖整个区域 */
    background-position: center; /* 将图片居中显示 */
    background-repeat: no-repeat; /* 避免图片重复 */
`;

// 文本内容样式
const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 1;
`;

const Title = styled.h3`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 8px;
`;

const SmallText = styled.p`
    font-size: 14px;
    margin-bottom: 10px;

    div {
        width: 20%;
    }

    a {
        color: #fff;
        text-decoration: underline;

        &:hover {
            text-decoration: none;
        }
    }
`;

const JoinButton = styled.button`
    background-color: #52c41a;
    color: #fff;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    font-weight: bold;
    cursor: pointer;

    &:hover {
        background-color: #389e0d;
    }
`;

// 小卡片样式（右侧统计部分）
const SmallCard = styled(Card)`
    background-color: #007f5f;
    color: #fff;
    border: none;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    strong {
        font-size: 16px;
    }

    h2 {
        font-size: 24px;
        margin: 0;
    }

    p {
        margin: 0;
        opacity: 0.8;
    }
`;

const BlueCard = styled(SmallCard)`
    background-color: #0d99ff;
`;

const Analysis2: React.FC = () => {
    return (
        <Container>
            {/* 第一行：欢迎卡片 */}
            <Row gutter={16} style={{ marginBottom: '20px' }}>
                {/* 左侧欢迎内容与图片 */}
                <Col span={16}>
                    <WelcomeCard>
                        {/* 左侧文字内容 */}
                        <Content>
                            <Title>Welcome back 👋 admin</Title>
                            <SmallText>
                                <div>欢迎加入 Discord 频道，讨论一切关于 Slash Admin 的内容，或访问我的博客：</div>
                                <a href="https://blog.slashspaces.com" target="_blank" rel="noopener noreferrer">
                                  👉https://blog.slashspaces.com
                                </a>
                            </SmallText>

                            <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
                                <JoinButton>Join Discord</JoinButton>
                            </a>
                        </Content>
                    </WelcomeCard>
                </Col>

                {/* 右侧统计卡片 */}
                <Col span={8}>
                    <Row gutter={[0, 16]}>
                        <Col span={24}>
                            <SmallCard>
                                <div>
                                    <p>
                                        📊 <strong>Conversion</strong>
                                    </p>
                                    <h2>38,566</h2>
                                </div>
                                <p>48%</p>
                            </SmallCard>
                        </Col>
                        <Col span={24}>
                            <BlueCard>
                                <div>
                                    <p>
                                        📨 <strong>Applications</strong>
                                    </p>
                                    <h2>45,566</h2>
                                </div>
                                <p>75%</p>
                            </BlueCard>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default Analysis2;
