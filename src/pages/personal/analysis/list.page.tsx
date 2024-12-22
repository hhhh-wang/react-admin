import React from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import { LineChartOutlined, UserOutlined, ShoppingCartOutlined, StockOutlined } from '@ant-design/icons';
import EChartsComponent from '@/components/e-charts';
import * as echarts from 'echarts';

const Analysis: React.FC = () => {
    // 折线图配置
    const lineChartOption: echarts.EChartsOption = {
        title: { text: '月度销售额', left: 'center' },
        tooltip: { trigger: 'axis' },
        legend: { top: '10%', data: ['团队 A', '团队 B', '团队 C'] },
        xAxis: {
            type: 'category',
            data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        },
        yAxis: { type: 'value' },
        series: [
            { name: '团队 A', type: 'line', data: [12, 15, 11, 13, 17, 19, 21, 23, 25, 28, 30, 35] },
            { name: '团队 B', type: 'line', data: [8, 10, 9, 12, 14, 16, 18, 20, 22, 24, 26, 29] },
            { name: '团队 C', type: 'line', data: [5, 7, 8, 10, 12, 13, 15, 17, 18, 20, 21, 23] },
        ],
    };

    // 南丁格尔玫瑰图配置
    const roseChartOption: echarts.EChartsOption = {
        title: { text: '当前访问量', left: 'center' },
        tooltip: { trigger: 'item' },
        legend: { bottom: '10%' },
        series: [
            {
                type: 'pie',
                radius: ['30%', '70%'],
                roseType: 'area',
                data: [
                    { value: 30, name: '美洲' },
                    { value: 25, name: '亚洲' },
                    { value: 20, name: '欧洲' },
                    { value: 15, name: '非洲' },
                ],
            },
        ],
    };

    // 柱状图配置
    const barChartOption: echarts.EChartsOption = {
        title: { text: '转化率', left: 'center' },
        tooltip: { trigger: 'axis' },
        xAxis: {
            type: 'value',
        },
        yAxis: {
            type: 'category',
            data: ['意大利', '日本', '中国', '加拿大', '法国', '德国', '韩国', '荷兰'],
        },
        series: [
            {
                type: 'bar',
                data: [30, 25, 20, 18, 15, 10, 8, 5],
                label: { show: true, position: 'right' },
            },
        ],
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
            }}
        >
            <div
                style={{
                    width: '66.67%',
                    maxWidth: '1200px',
                    margin: '0 auto',
                }}
            >
                {/* 顶部统计卡片 */}
                <Row gutter={16}>
                    <Col span={6}>
                        <Card
                            style={{
                                background: 'linear-gradient(135deg, #a2d2ff, #6c91d9)',
                                color: '#fff',
                            }}
                            bodyStyle={{
                                padding: '20px',
                            }}
                        >
                            <Statistic
                                title="每周销售额"
                                value="714万"
                                prefix={<LineChartOutlined style={{ fontSize: '30px', color: '#ffd700' }} />}
                                valueStyle={{
                                    color: '#ffffff',
                                    fontWeight: 'bold',
                                    fontSize: '24px',
                                }}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card
                            style={{
                                background: 'linear-gradient(135deg, #b9fbc0, #70d99e)',
                                color: '#fff',
                            }}
                            bodyStyle={{
                                padding: '20px',
                            }}
                        >
                            <Statistic
                                title="新增用户"
                                value="135万"
                                prefix={<UserOutlined style={{ fontSize: '30px', color: '#4caf50' }} />}
                                valueStyle={{
                                    color: '#ffffff',
                                    fontWeight: 'bold',
                                    fontSize: '24px',
                                }}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card
                            style={{
                                background: 'linear-gradient(135deg, #fff3b0, #f2a65a)',
                                color: '#fff',
                            }}
                            bodyStyle={{
                                padding: '20px',
                            }}
                        >
                            <Statistic
                                title="新增订单"
                                value="172万"
                                prefix={<ShoppingCartOutlined style={{ fontSize: '30px', color: '#ff8c00' }} />}
                                valueStyle={{
                                    color: '#ffffff',
                                    fontWeight: 'bold',
                                    fontSize: '24px',
                                }}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card
                            style={{
                                background: 'linear-gradient(135deg, #ffafcc, #ff5d8f)',
                                color: '#fff',
                            }}
                            bodyStyle={{
                                padding: '20px',
                            }}
                        >
                            <Statistic
                                title="Bug 报告"
                                value="234"
                                prefix={<StockOutlined style={{ fontSize: '30px', color: '#e91e63' }} />}
                                valueStyle={{
                                    color: '#ffffff',
                                    fontWeight: 'bold',
                                    fontSize: '24px',
                                }}
                            />
                        </Card>
                    </Col>
                </Row>

                {/* 中间折线图和玫瑰图 */}
                <Row gutter={16} style={{ marginTop: '20px' }}>
                    <Col span={16}>
                        <Card title="网站访问量">
                            <EChartsComponent option={lineChartOption} width="100%" height={400} style={{ background: '#fff' }} />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="当前访问量">
                            <EChartsComponent option={roseChartOption} width="100%" height={400} style={{ background: '#fff' }} />
                        </Card>
                    </Col>
                </Row>

                {/* 底部柱状图 */}
                <Row gutter={16} style={{ marginTop: '20px' }}>
                    <Col span={24}>
                        <Card>
                            <EChartsComponent option={barChartOption} width="100%" height={400} style={{ background: '#fff' }} />
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Analysis;
