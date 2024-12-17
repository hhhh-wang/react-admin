import React from 'react';
import { RingChart, LineChart } from './ring-line';

const DashboardCharts: React.FC = () => {
    return (
        <div className="flex gap-4 rounded-lg bg-gray-100 p-4">
            {/* 左侧环状图 */}
            <div className="bg-white w-1/3 rounded-lg p-4 shadow-md">
                <h3 className="mb-4 text-lg font-semibold">Current Download</h3>
                <RingChart
                    title="五色环图"
                    subtitle="Progress"
                    size={200}
                    segments={[
                        { value: 20, color: '#FF5733', name: '红色部分' },
                        { value: 30, color: '#FFC300', name: '黄色部分' },
                        { value: 10, color: '#DAF7A6', name: '浅绿色部分' },
                        { value: 25, color: '#33B5E5', name: '蓝色部分' },
                        { value: 15, color: '#C70039', name: '深红色部分' },
                    ]}
                />
            </div>

            {/* 右侧折线图
              1.将下拉选项组件与 LineChart 绑定，通过 React useState 控制当前选中的年份。
              2.根据选中的年份更新折线图的 series 数据。
            */}
            <div className="bg-white w-2/3 rounded-lg p-4 shadow-md">
                <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Area Installed</h3>
                    <select className="rounded border p-1">
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                    </select>
                </div>
                <LineChart
                    title="Area Installed"
                    xAxisData={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov']}
                    seriesData={[
                        {
                            name: 'China',
                            data: [50, 40, 45, 30, 80, 70, 60, 150, 100, 40, 50],
                            color: '#00A76F',
                        },
                        {
                            name: 'America',
                            data: [50, 30, 40, 20, 70, 90, 80, 60, 30, 50, 70],
                            color: '#FFC82C',
                        },
                    ]}
                />
            </div>
        </div>
    );
};

export default DashboardCharts;
