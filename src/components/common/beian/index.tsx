import React from 'react';

const BeiAn: React.FC = () => {
    const beianText = import.meta.env.VITE_APP_BEIAN;

    // 如果没有配置备案信息，则不显示组件
    if (!beianText) return null;

    return (
        <div className="py-2 text-center text-sm text-gray-500">
            <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gray-700">
                {beianText}
            </a>
        </div>
    );
};

export default BeiAn;
