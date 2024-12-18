import EChartsComponent from '@/components/e-charts';
import SvgIcon from '@/components/icon/svg-icon'; // 引入 Ant Design 的箭头图标

const StatisticCard = ({ title, value, change, data, isPositive }: StatisticCardProps) => {
    // ECharts 配置
    const option: echarts.EChartsOption = {
        grid: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            containLabel: false,
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            show: false, // 隐藏 x 轴
            data: data.map((_, index) => index),
        },
        yAxis: {
            type: 'value',
            show: false, // 隐藏 y 轴
        },
        tooltip: {
            trigger: 'axis', // 触发类型：坐标轴触发
            axisPointer: {
                type: 'line', // 指示器类型：线型
            },
            formatter: (params: any) => {
                // 显示当前数据的值
                const value = params[0]?.data ?? '';
                return `Value: ${value} + sss`;
            },
        },
        series: [
            {
                data,
                type: 'line',
                smooth: true,
                lineStyle: {
                    color: isPositive ? '#00A76F' : '#FF5630',
                    width: 2,
                },
                symbol: 'none', // 不显示点
            },
        ],
        backgroundColor: 'transparent', // 设置图表背景为透明
    };

    return (
        <div className="bg-white flex min-w-[300px]  flex-col gap-2 rounded-lg p-4 shadow">
            {/* 标题区域 */}
            <div className="flex items-center justify-between text-sm text-gray-700">
                <span>{title}</span>
                <div className="flex items-center gap-1">
                    {/* 调用封装的 SvgIcon */}
                    <SvgIcon icon={isPositive ? 'ic_rise' : 'ic_decline'} color={isPositive ? '#FF5630' : '#00A76F'} size="1.2em" />
                    <span className={isPositive ? 'text-red-500' : 'text-green-500'}>{change}%</span>
                </div>
            </div>

            {/* 数值与折线图区域 */}
            <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">{value}</span>
                <div style={{ width: '100px', height: '40px' }}>
                    <EChartsComponent option={option} width="100px" height="40px" />
                </div>
            </div>
        </div>
    );
};

type StatisticCardProps = {
    title: string;
    value: string | number;
    change: number;
    data: number[];
    isPositive?: boolean;
};

const TopBar: React.FC = () => {
    return (
        <div className="flex items-center justify-between gap-2 p-6">
            {/* 统计卡1 */}
            <StatisticCard title="Total Active Users" value="18,765" change={2.6} data={[100, 120, 150, 180, 170, 200, 220]} isPositive />

            {/* 统计卡2 */}
            <StatisticCard title="Total Installed" value="4,876" change={0.2} data={[200, 210, 215, 218, 220, 223, 225]} isPositive />

            {/* 统计卡3 */}
            <StatisticCard title="Total Downloads" value="678" change={-0.1} data={[80, 78, 76, 75, 74, 72, 71]} isPositive={false} />
        </div>
    );
};

export default TopBar;
