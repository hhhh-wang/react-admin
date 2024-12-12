import React, { useEffect, useRef, useMemo } from 'react';
import * as echarts from 'echarts';

// 定义 Props 类型
interface EChartsComponentProps {
    option: echarts.EChartsOption; // 图表配置
    style?: React.CSSProperties; // 容器样式
    className?: string; // 容器类名
    width?: number | string; // 可选宽度
    height?: number | string; // 可选高度
    theme?: 'light' | 'dark'; // 可选主题
    loading?: boolean; // 加载状态
}
/* 调用方式
   <EChartsComponent
     option={barOption}
     width="100%"
     height={400}
     theme="light"
     loading={isLoading}
     style={{ margin: '20px' }}
   />
*/
const EChartsComponent: React.FC<EChartsComponentProps> = ({ option, style, className, width = '100%', height = 400, theme = 'light', loading = false }) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const chartInstance = useRef<echarts.ECharts | null>(null);

    // 使用 useMemo 优化性能，减少不必要的实例化
    const memoizedOption = useMemo(() => option, [option]);

    useEffect(() => {
        if (chartRef.current) {
            // 销毁旧实例
            if (chartInstance.current) {
                chartInstance.current.dispose();
            }

            // 初始化 ECharts 实例，支持主题
            chartInstance.current = echarts.init(chartRef.current, theme);

            // 设置配置项
            chartInstance.current.setOption(memoizedOption);

            // 处理加载状态
            if (loading) {
                chartInstance.current.showLoading();
            } else {
                chartInstance.current.hideLoading();
            }

            // 窗口大小变化时调整图表尺寸
            const handleResize = () => {
                chartInstance.current?.resize();
            };
            window.addEventListener('resize', handleResize);

            return () => {
                // 清理 ECharts 实例和事件监听
                chartInstance.current?.dispose();
                window.removeEventListener('resize', handleResize);
            };
        }
        return undefined;
    }, [memoizedOption, theme, loading]);

    return (
        <div
            ref={chartRef}
            style={{
                ...style,
                width,
                height,
            }}
            className={className || ''}
        />
    );
};

export default React.memo(EChartsComponent);
