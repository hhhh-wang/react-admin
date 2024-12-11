import React, { CSSProperties, useState } from 'react';
import { Card, Avatar, Timeline } from 'antd';
import { UserOutlined, FilePdfOutlined, SmileOutlined } from '@ant-design/icons';
import { Iconify } from '@/components/icon';
import { useThemeToken } from '@/theme/hooks';
import grasslandImage from '@/assets/images/glass/grassland.jpg';

const Reveal: React.FC = () => {
    const [currentTabIndex, setcurrentTabIndex] = useState(0);
    const { colorTextBase } = useThemeToken();
    const bgStyle: CSSProperties = {
        color: 'green',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        backgroundImage: `url(${grasslandImage})`, // 使用 import 的变量
    };

    const tabs = [
        {
            icon: <Iconify icon="solar:user-id-bold" size={24} className="mr-2" />,
            title: 'Profile',
        },
        {
            icon: <Iconify icon="mingcute:profile-fill" size={24} className="mr-2" />,
            title: 'Teams',
        },
        {
            icon: <Iconify icon="mingcute:profile-fill" size={24} className="mr-2" />,
            title: 'Projects',
        },
        {
            icon: <Iconify icon="mingcute:profile-fill" size={24} className="mr-2" />,
            title: 'Connections',
        },
    ];

    return (
        <>
            {/* Header Section */}
            <Card>
                <div className="px-4 py-8">
                    <div className="absolute inset-0" />
                    <div style={bgStyle} className="bg-white/80 relative z-10 mx-auto flex h-full w-2/3 flex-col items-start justify-center rounded-lg p-4 shadow-lg">
                        <div className="flex flex-col items-center pl-24">
                            <Avatar size={128} icon={<UserOutlined />} className="mb-4" />
                            <h1 className="text-4xl font-bold text-gray-800">admin</h1>
                            <p className="text-lg text-gray-600">TS FullStack</p>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="z-10 min-h-[48px] w-full">
                            <div className="mx-6 flex h-full justify-center md:justify-end">
                                {tabs.map((tab, index) => (
                                    <button
                                        onClick={() => setcurrentTabIndex(index)}
                                        key={tab.title}
                                        type="button"
                                        style={{
                                            marginRight: index >= tabs.length - 1 ? '0px' : '40px',
                                            opacity: index === currentTabIndex ? 1 : 0.5,
                                            borderBottom: index === currentTabIndex ? `2px solid ${colorTextBase}` : '',
                                        }}
                                    >
                                        {tab.icon}
                                        {tab.title}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="px-4 py-8">
                    <div className="mx-auto w-2/3">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* Left Side About Section */}
                            <Card className="shadow-md">
                                <h2 className="mb-4 text-xl font-bold">About</h2>
                                <p className="mb-4">Defessus denego excepturi caelestis. Corrumpo aperio audio thorax tracto acidus. Virga incidunt id eos cohaero baiulus.</p>
                                <ul className="space-y-2">
                                    <li>
                                        <b>Full Name:</b> admin
                                    </li>
                                    <li>
                                        <b>Role:</b> Developer
                                    </li>
                                    <li>
                                        <b>Country:</b> USA
                                    </li>
                                    <li>
                                        <b>Language:</b> English
                                    </li>
                                    <li>
                                        <b>Contact:</b> (123)456-7890
                                    </li>
                                    <li>
                                        <b>Email:</b> admin
                                    </li>
                                </ul>
                            </Card>

                            {/* Right Side Activity Timeline */}
                            <Card className="shadow-md">
                                <h2 className="mb-4 text-xl font-bold">Activity Timeline</h2>
                                <Timeline>
                                    {/* 时间线项 */}
                                    <Timeline.Item color="red">
                                        <div className="flex items-center">
                                            {/* 时间线点 */}
                                            <div style={{ flexShrink: 0, width: '24px', textAlign: 'center' }} />
                                            {/* 事件内容 */}
                                            <div style={{ flexGrow: 1 }}>
                                                <p className="font-medium">8 Invoices have been paid</p>
                                                <div className="flex items-center">
                                                    <FilePdfOutlined className="text-red-500 mr-2" />
                                                    <span>invoice.pdf</span>
                                                </div>
                                            </div>
                                            {/* 时间文字 */}
                                            <span
                                                style={{
                                                    color: '#888',
                                                    minWidth: '100px',
                                                    textAlign: 'right',
                                                    marginLeft: '16px',
                                                }}
                                            >
                                                Wednesday
                                            </span>
                                        </div>
                                    </Timeline.Item>

                                    <Timeline.Item color="green">
                                        <div className="flex items-center">
                                            <div style={{ flexShrink: 0, width: '24px', textAlign: 'center' }} />
                                            <div style={{ flexGrow: 1 }}>
                                                <p className="font-medium">
                                                    Create a new project for client <SmileOutlined className="text-yellow-500" />
                                                </p>
                                            </div>
                                            <span
                                                style={{
                                                    color: '#888',
                                                    minWidth: '100px',
                                                    textAlign: 'right',
                                                    marginLeft: '16px',
                                                }}
                                            >
                                                April, 18
                                            </span>
                                        </div>
                                    </Timeline.Item>

                                    <Timeline.Item color="blue">
                                        <div className="flex items-center">
                                            <div style={{ flexShrink: 0, width: '24px', textAlign: 'center' }} />
                                            <div style={{ flexGrow: 1 }}>
                                                <p className="font-medium">Order #37745 from September</p>
                                            </div>
                                            <span
                                                style={{
                                                    color: '#888',
                                                    minWidth: '100px',
                                                    textAlign: 'right',
                                                    marginLeft: '16px',
                                                }}
                                            >
                                                January, 10
                                            </span>
                                        </div>
                                    </Timeline.Item>

                                    <Timeline.Item color="orange">
                                        <div className="flex items-center">
                                            <div style={{ flexShrink: 0, width: '24px', textAlign: 'center' }} />
                                            <div style={{ flexGrow: 1 }}>
                                                <p className="font-medium">Public Meeting</p>
                                            </div>
                                            <span
                                                style={{
                                                    color: '#888',
                                                    minWidth: '100px',
                                                    textAlign: 'right',
                                                    marginLeft: '16px',
                                                }}
                                            >
                                                September, 30
                                            </span>
                                        </div>
                                    </Timeline.Item>
                                </Timeline>
                            </Card>
                        </div>
                    </div>
                </div>
            </Card>
        </>
    );
};

export default Reveal;
