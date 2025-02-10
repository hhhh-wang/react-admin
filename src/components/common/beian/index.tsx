import React from 'react';
import policeIcon from '@/assets/images/police.png';

const BeiAn: React.FC = () => {
    const beianText = import.meta.env.VITE_APP_BEIAN;
    const gonganText = import.meta.env.VITE_APP_GONGAN;

    // 如果没有配置备案信息，则不显示组件
    if (!beianText && !gonganText) return null;

    return (
        <div className="flex flex-col py-1 text-center text-sm text-gray-500">
            {/* ICP备案信息 */}
            <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gray-700">
                {beianText}
            </a>

            {/* 公安备案信息 */}
            <a href="https://beian.mps.gov.cn/#/query/webSearch?code=43310002000135" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gray-700">
                <img src={policeIcon} alt="公安备案" className="mr-1 inline-block h-[14px] w-[14px] align-text-bottom" />
                {gonganText}
            </a>
        </div>
    );
};

export default BeiAn;
