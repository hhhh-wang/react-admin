import React from 'react';
import backgroundImage from '@/assets/images/profile/analysis2.png';
import { Iconify } from '@/components/icon';

const IntroductionCard: React.FC = () => {
    // 点击跳转的事件处理函数
    const handleButtonClick = () => {
        window.open('https://discord.com', '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="flex flex-col items-center rounded-lg bg-[#C8EADE] p-0  md:flex-row md:items-center md:justify-between">
            {/* 左侧内容 */}
            <div className="md:w-1/8 space-y-4 pl-4 text-left text-green">
                <div>
                    <div className="text-2xl font-bold">Welcome back 👋</div>
                    <div className="text-2xl">admin</div>
                </div>
                <p className="max-w-[300px] md:max-w-lg">
                    这是一个数据分析的页面,基于Echarts的图表更直观的来感受数据,图表案例可参加官网:{' '}
                    <a href="https://echarts.apache.org" target="_blank" rel="noopener noreferrer">
                        👉 https://echarts.apache.org
                    </a>
                </p>
                {/* 绿色背景按钮 */}
                <button onClick={handleButtonClick} className="text-white hover:bg-green-600 inline-flex items-center space-x-2 rounded-md bg-green px-4 py-2 transition">
                    <Iconify icon="carbon:logo-discord" size={24} className="text-gray-100" />
                    <span className="font-medium text-gray-100">Join Discord</span>
                </button>
            </div>
            {/* 右侧图片 */}
            <div className="mt-6 flex justify-center pr-2 md:mt-0 md:h-full   md:w-1/2">
                <img src={backgroundImage} alt="Analysis" className="h-full w-full object-contain" />
            </div>
        </div>
    );
};

export default IntroductionCard;
