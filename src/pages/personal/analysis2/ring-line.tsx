import React from 'react';
import EChartsComponent from '@/components/e-charts';

// 环状图 Props 类型
interface RingChartProps {
    segments: { value: number; color: string; name?: string }[]; // 每段的值、颜色、名称
    title?: string; // 环状图标题
    subtitle?: string; // 副标题
    size?: number; // 图表大小（宽/高）
}

// 折线图 Props 类型
interface LineChartProps {
    title?: string; // 标题
    xAxisData: string[]; // x轴数据
    seriesData: { name: string; data: number[]; color?: string }[]; // 数据序列
    height?: number; // 图表高度
}

// **1. 环状图组件**
export const RingChart: React.FC<RingChartProps> = ({ segments, title = '', subtitle = '', size = 150 }) => {
    const option: echarts.EChartsOption = {
        title: {
            text: title,
            subtext: subtitle,
            left: 'center',
            top: '40%',
            textStyle: {
                fontSize: 16,
                fontWeight: 'bold',
                color: '#333',
            },
            subtextStyle: {
                fontSize: 12,
                color: '#666',
            },
        },
        tooltip: {
            trigger: 'item', // 鼠标悬浮时触发提示
            formatter: '{b}: {c} ({d}%)', // 显示名称、值和占比
        },
        series: [
            {
                type: 'pie',
                radius: ['70%', '90%'], // 环状图的内外半径
                center: ['50%', '50%'], // 图表位置
                data: segments.map((segment) => ({
                    name: segment.name || '', // 名称 (可选)
                    value: segment.value, // 数值
                    itemStyle: { color: segment.color }, // 颜色
                })),
                label: {
                    show: false, // 默认隐藏标签
                },
                emphasis: {
                    scale: true, // 鼠标悬浮时放大
                    scaleSize: 10, // 放大比例
                    label: {
                        show: true, // 鼠标悬浮时显示标签
                        formatter: '{b}: {c} ({d}%)', // 格式化标签内容
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: '#333',
                    },
                    itemStyle: {
                        shadowBlur: 10, // 添加阴影
                        shadowColor: 'rgba(0, 0, 0, 0.2)',
                    },
                },
            },
        ],
    };

    return <EChartsComponent option={option} width={size} height={size} />;
};
// **2. 折线图组件**
export const LineChart: React.FC<LineChartProps> = ({ title = '', xAxisData, seriesData, height = 400 }) => {
    const option: echarts.EChartsOption = {
        title: {
            text: title,
            left: 'center',
            textStyle: {
                fontSize: 16,
                fontWeight: 'bold',
            },
        },
        tooltip: {
            trigger: 'axis',
        },
        legend: {
            bottom: 0,
            data: seriesData.map((item) => item.name),
        },
        xAxis: {
            type: 'category',
            data: xAxisData,
        },
        yAxis: {
            type: 'value',
        },
        series: seriesData.map((item) => ({
            name: item.name,
            type: 'line',
            smooth: true,
            data: item.data,
            lineStyle: { color: item.color || '#00A76F' },
            areaStyle: item.color ? { color: `${item.color}20` } : undefined, // 半透明区域
        })),
    };

    return <EChartsComponent option={option} height={height} />;
};
