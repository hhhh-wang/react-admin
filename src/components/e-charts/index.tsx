import React, { useEffect, useRef, useMemo } from 'react';
import * as echarts from 'echarts';

interface EChartsComponentProps {
    option: echarts.EChartsOption;
    style?: React.CSSProperties;
    className?: string;
    width?: number | string;
    height?: number | string;
    theme?: 'light' | 'dark';
    loading?: boolean;
}

const EChartsComponent: React.FC<EChartsComponentProps> = ({ option, style, className, width = '100%', height = 400, theme = 'light', loading = false }) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const chartInstance = useRef<echarts.ECharts | null>(null);

    // Deep comparison of options to prevent unnecessary re-renders
    const memoizedOption = useMemo(() => {
        return JSON.parse(JSON.stringify(option));
    }, [JSON.stringify(option)]);

    useEffect(() => {
        const initChart = () => {
            if (chartRef.current) {
                // Dispose existing instance if it exists
                if (chartInstance.current) {
                    chartInstance.current.dispose();
                }

                // Create new chart instance
                chartInstance.current = echarts.init(chartRef.current, theme);
                chartInstance.current.setOption(memoizedOption);

                // Handle loading state
                if (loading) {
                    chartInstance.current.showLoading();
                } else {
                    chartInstance.current.hideLoading();
                }

                // Resize handler
                const handleResize = () => {
                    chartInstance.current?.resize();
                };
                window.addEventListener('resize', handleResize);

                return () => {
                    window.removeEventListener('resize', handleResize);
                    chartInstance.current?.dispose();
                };
            }
            // Ensure a return value for all execution paths
            return undefined;
        };

        // Initialize chart
        const cleanup = initChart();

        // Return cleanup function
        return () => {
            cleanup?.();
        };
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
