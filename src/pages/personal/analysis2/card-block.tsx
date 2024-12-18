import React from 'react';
import { Progress } from 'antd';
import { Icon } from '@iconify/react';

type Props = {
    percent: number;
    title: string;
    subtitle: string;
    iconify: string;
    bg?: string;
    strokeColor?: string;
};

export function Conversion() {
    return <CardBlock percent={48} title="38,566" subtitle="Conversion" iconify="mdi:account" bg="bg-[#008059]" strokeColor="#00A76F" />;
}

export function Applications() {
    return <CardBlock percent={75} title="45,888" subtitle="Applications" iconify="mdi:email-outline" bg="bg-[#0092B3]" />;
}

const CardBlock: React.FC<Props> = ({ percent, title, subtitle, iconify, bg = 'pink', strokeColor = '#1FB6FF' }) => {
    return (
        <div className={`flex items-center justify-between ${bg} text-white h-24 rounded-lg p-4`}>
            <div className="flex items-center gap-4">
                {/* 环形进度条 */}
                <Progress type="circle" percent={percent} size={64} strokeColor={strokeColor} trailColor="#E5E7EB" format={(percent) => `${percent}%`} />
                {/* 标题与副标题 */}
                <div className="text-gray-100">
                    <h2 className="text-2xl font-bold">{title}</h2>
                    <p className="text-gray-300">{subtitle}</p>
                </div>
            </div>
            {/* 图标区域 */}
            <div className="text-5xl text-gray-300">
                <Icon icon={iconify} style={{ opacity: 0.08 }} width={100} />
            </div>
        </div>
    );
};
