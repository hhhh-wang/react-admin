import React from 'react';
import { Card, Col, Row, Avatar, List } from 'antd';
import EChartsComponent from '@/components/e-charts'; // 自定义ECharts组件
import IntroductionCard from './introduction-card';
import { Applications, Conversion } from './card-block';
import TopBar from './top-bar';
import { LineChart, RingChart } from './ring-line';
import { ApplicationList, InvoiceTable } from './table-list';
import * as echarts from 'echarts';

const Analysis2: React.FC = () => {
    // Top Installed Countries 柱状图配置
    const barChartOption: echarts.EChartsOption = {
        title: { text: '安装最多的国家', left: 'center' },
        tooltip: {},
        xAxis: { type: 'category', data: ['德国', '法国', '澳大利亚', '法国', '美国'] },
        yAxis: { type: 'value' },
        series: [
            {
                name: '国家：',
                type: 'bar',
                data: [9910, 9250, 4950, 3280, 8810],
                itemStyle: { color: '#1890ff' },
            },
        ],
    };

    // 数据：作者列表
    const authors = [
        { name: '祥子', works: '6k', color: '#52c41a' },
        { name: 'Aaron', works: '6k', color: '#1890ff' },
        { name: 'Lynn Haag', works: '6k', color: '#ff4d4f' },
    ];

    return (
        <div className="mx-auto w-3/4">
            {/* 版心宽度，居中显示 */}
            {/* 第一行：欢迎信息区域 */}
            <Row gutter={16} className="mb-6">
                {/* 左侧欢迎卡片 */}
                <Col span={16}>
                    <IntroductionCard />
                </Col>

                {/* 右侧两行卡片 */}
                <Col span={8}>
                    <Row gutter={[0, 24]}>
                        <Col span={24}>
                            <Conversion />
                        </Col>
                        <Col span={24}>
                            <Applications />
                        </Col>
                    </Row>
                </Col>
            </Row>
            {/* 第二行：数据卡片 */}
            <Row gutter={26} className="mb-6">
                <Col span={24}>
                    <TopBar />
                </Col>
            </Row>
            {/* 第三行：ECharts 图表 */}
            <Row gutter={16} className="mb-6">
                <Col span={8}>
                    <RingChart
                        title="sku销量"
                        subtitle="商品种类销量"
                        size={350}
                        segments={[
                            { value: 20, color: '#FF5733', name: '短袖' },
                            { value: 30, color: '#FFC300', name: '卫衣' },
                            { value: 10, color: '#DAF7A6', name: '体恤衫' },
                            { value: 25, color: '#33B5E5', name: '沙滩裤' },
                            { value: 15, color: '#C70039', name: '遮阳帽' },
                        ]}
                    />
                </Col>
                <Col span={16}>
                    <LineChart
                        title="地区下安装量"
                        xAxisData={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov']}
                        seriesData={[
                            {
                                name: '中国区',
                                data: [50, 40, 45, 30, 80, 70, 60, 150, 100, 40, 50],
                                color: '#00A76F',
                            },
                            {
                                name: '美国区',
                                data: [50, 30, 40, 20, 70, 90, 80, 60, 30, 50, 70],
                                color: '#FFC82C',
                            },
                        ]}
                    />
                </Col>
            </Row>
            {/* 第四行：sku详情 和 热门程序 */}
            <Row gutter={10} className="mb-6">
                {/* 左侧：sku详情  */}
                <Col span={16}>
                    <InvoiceTable />
                </Col>

                {/* 右侧：热门程序 */}
                <Col span={8}>
                    <ApplicationList />
                </Col>
            </Row>
            {/* 第五行：安装最多的国家和最受欢迎的作者 */}
            <Row gutter={16} className="mb-6">
                <Col span={12}>
                    <Card>
                        <EChartsComponent option={barChartOption} height={250} />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="最受欢迎的作者">
                        <List
                            dataSource={authors}
                            renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta avatar={<Avatar style={{ backgroundColor: item.color }}>{item.name[0]}</Avatar>} title={item.name} description={`Works: ${item.works}`} />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Analysis2;
