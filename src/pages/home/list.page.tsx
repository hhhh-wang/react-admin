import React, { useState } from 'react';
import { Card, Modal, Row, Col, Tabs } from 'antd';
import { SmileOutlined, GithubOutlined, WechatOutlined } from '@ant-design/icons';
import EChartsComponent from '@/components/e-charts';
import HomeTimeDisplay from '@/pages/home/home-time-display';
import { useUserInfo } from '@/store/userStore';
import wechatQR from '@/assets/wechat.png';

const HomePage: React.FC = () => {
    const [hovered, setHovered] = useState(false);
    const { account, avatar } = useUserInfo();

    const [qrVisible, setQrVisible] = useState(false);
    const openQrModal = () => setQrVisible(true);
    const closeQrModal = () => setQrVisible(false);

    const lineChartOption: echarts.EChartsOption = {
        title: { text: '近八天系统访问记录', left: 'center' },
        tooltip: { trigger: 'axis' },
        legend: { top: '10%', data: ['你', '总数'] },
        xAxis: {
            type: 'category',
            data: ['2023-12-20', '2023-12-21', '2023-12-22', '2023-12-23', '2023-12-24', '2023-12-25', '2023-12-26'],
        },
        yAxis: { type: 'value' },
        series: [
            {
                name: '你',
                type: 'line',
                data: [20, 30, 25, 35, 40, 30, 20],
                smooth: true,
            },
            {
                name: '总数',
                type: 'line',
                data: [50, 60, 55, 70, 80, 60, 40],
                smooth: true,
            },
        ],
    };
    const headerContainerStyle = {
        display: 'flex', // 使用 flex 布局
        alignItems: 'center', // 垂直居中
        justifyContent: 'center', // 水平居中
        gap: '20px', // 控制图标与文字的间距
    };

    const techStack = (
        <ul className="space-y-4 px-4 text-base">
            <li>基于 React 18 hooks 构建，提升代码复用性与性能</li>
            <li>快速开发：基于 Vite 提供高效热模块替换</li>
            <li>集成 Ant Design，支持丰富 UI 组件</li>
            <li>使用 TypeScript 提供类型安全和更好的开发体验</li>
            <li>可视化工具：ECharts，支持交互式数据展示</li>
            <li>TailwindCSS 原子化样式，按需使用，支持主题自定义</li>
        </ul>
    );

    const projectIntro = (
        <ul className="space-y-4 px-4 text-base">
            <li>产品名称：sapling 快速开发平台</li>
            <li>核心功能：高效、灵活、可定制的企业级管理系统</li>
            <li>获取源码：sapling 后台服务、前端模板一键集成</li>
        </ul>
    );

    const tabItems = [
        {
            key: '1',
            label: '技术栈',
            children: techStack,
        },
        {
            key: '2',
            label: '项目介绍',
            children: projectIntro,
        },
    ];
    const headerStyle: React.CSSProperties = {
        textAlign: 'center',
        fontSize: '40px',
        fontWeight: 'bold',
        color: '#3575ff',
    };
    const iconStyle = {
        fontSize: '32px', // 图标大小
        color: '#3575ff', // 图标颜色
    };

    return (
        <div className="flex-1 p-4">
            <div className="flex gap-4">
                {/* 左侧内容 - 添加最小高度 */}
                <div className="flex flex-1 flex-col space-y-6">
                    <Card className="min-h-[250px] flex-1 text-center">
                        <div style={headerContainerStyle} className="mb-8">
                            <span style={headerStyle}>欢迎来到sapling后端管理框架</span>
                            <SmileOutlined style={iconStyle} />
                        </div>
                        <h2 className="px-8 text-base leading-relaxed text-gray-600">
                            在{' '}
                            <a href="https://github.com/hhhh-wang/react-admin" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">
                                sapling
                            </a>{' '}
                            是一个基于react18 开发的后端管理框架，其核心目标是为开发者提供一个轻量级、易上手且可扩展的后台管理解决方案。框架的初心是希望开发者能够在一个易用的基础框架上快速搭建功能强大的后台系统，逐步优化，向更强大、更完善的方向迈进。
                        </h2>
                    </Card>

                    <Card className="min-h-[500px] flex-1">
                        <EChartsComponent option={lineChartOption} width="100%" height={400} />
                    </Card>
                </div>

                {/* 右侧内容 */}
                <div className="flex-1">
                    <div className="space-y-6">
                        <Row gutter={16}>
                            <Col span={12}>
                                <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-lg" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
                                    {/* 卡片内容区域 */}
                                    <div className="relative flex flex-col items-center justify-center p-4">
                                        {/* 头像和用户名容器 */}
                                        <div className={`flex flex-col items-center transition-all duration-300 ${hovered ? 'opacity-0' : 'opacity-100'}`}>
                                            <img className="h-20 w-20 rounded-full" src={avatar || 'https://via.placeholder.com/80'} alt="User Avatar" />
                                            <div className="mt-2 text-lg font-medium">{account || '未登录用户'}</div>
                                        </div>

                                        {/* 悬停文字 */}
                                        <div className={`absolute inset-0 flex items-center justify-center text-lg font-medium text-gray-600 transition-all duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}>变量代表了灵活性和可变性，人生中的不确定性也是永恒的主题。不同时期面对不同的挑战和选择，需要不断调整自己的目标和策略去适应不同的环境和挑战。</div>
                                    </div>

                                    {/* 图标容器 */}
                                    <div className="mt-4 flex justify-end gap-4 pr-8">
                                        <a href="https://github.com/hhhh-wang/react-admin" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 text-2xl text-gray-600 transition-colors">
                                            <GithubOutlined />
                                        </a>
                                        <a className="hover:text-blue-500 text-2xl text-gray-600 transition-colors">
                                            <WechatOutlined onClick={openQrModal} className="cursor-pointer" />
                                        </a>
                                    </div>
                                </Card>
                            </Col>

                            <Col span={12}>
                                <HomeTimeDisplay />
                            </Col>
                        </Row>
                        <Card className="p-4">
                            <Tabs
                                defaultActiveKey="1"
                                items={tabItems}
                                className="text-gray-600"
                                style={{
                                    ['--tab-padding' as string]: '20px', // 增加 tab 之间的间距
                                }}
                            />
                        </Card>
                    </div>
                </div>
            </div>

            {/* 二维码模态框 */}
            <Modal title="微信二维码" open={qrVisible} onCancel={closeQrModal} footer={null} width={500}>
                <div className="flex justify-center">
                    <img src={wechatQR} alt="WeChat QR Code" className="h-[450px] w-[450px] object-contain" />
                </div>
            </Modal>
        </div>
    );
};

export default HomePage;
