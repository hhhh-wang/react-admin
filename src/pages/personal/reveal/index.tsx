import { type CSSProperties, useState } from 'react';

import Card from '@/components/card';
import { Iconify } from '@/components/icon';
import { useUserInfo } from '@/store/userStore';
import { useThemeToken } from '@/theme/hooks';
import grasslandImage from '@/assets/images/glass/grassland.jpg';
import ConnectionsTab from './connections-tab';
import ProfileTab from './profile-tab';
import ProjectsTab from './projects-tab';
import TeamsTab from './teams-tab';

function UserProfile() {
    const { avatar, username } = useUserInfo();
    const { colorTextBase } = useThemeToken();
    const [currentTabIndex, setcurrentTabIndex] = useState(0);

    const bgStyle: CSSProperties = {
        backgroundImage: `url(${grasslandImage})`,
        backgroundRepeat: 'no-repeat', // 确保不重复显示
        backgroundPosition: 'center center', // 居中显示图片
        backgroundSize: 'cover', // 按比例覆盖容器
    };

    const tabs = [
        {
            icon: <Iconify icon="solar:user-id-bold" size={24} className="mr-2" />,
            title: '档案',
            content: <ProfileTab />,
        },
        {
            icon: <Iconify icon="mingcute:profile-fill" size={24} className="mr-2" />,
            title: '团队',
            content: <TeamsTab />,
        },
        {
            icon: <Iconify icon="mingcute:profile-fill" size={24} className="mr-2 " />,
            title: '项目',
            content: <ProjectsTab />,
        },
        {
            icon: <Iconify icon="mingcute:profile-fill" size={24} className="mr-2" />,
            title: '联系人',
            content: <ConnectionsTab />,
        },
    ];

    return (
        <div className="flex justify-center">
            {/* 版心容器 */}
            <div className="w-2/3">
                <Card className="relative mb-6 h-[290px] flex-col rounded-2xl !p-0">
                    <div style={bgStyle} className="h-full w-full">
                        <div className="flex flex-col items-center justify-center pt-12 md:absolute md:bottom-6 md:left-6 md:flex-row md:pt-0">
                            <img src={avatar} className="h-16 w-16 rounded-full md:h-32 md:w-32" alt="" />
                            <div className="ml-6 mt-6 flex flex-col justify-center md:mt-0" style={{ color: '#fff' }}>
                                <span className="mb-2 text-2xl font-medium">{username}</span>
                                <span className="text-center opacity-50 md:text-left">TS FullStack</span>
                            </div>
                        </div>
                    </div>
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
                                        color: index === currentTabIndex ? 'green' : 'gray', // 选中绿色，未选中灰色
                                    }}
                                >
                                    {tab.icon}
                                    {tab.title}
                                </button>
                            ))}
                        </div>
                    </div>
                </Card>
                <div>{tabs[currentTabIndex].content}</div>
            </div>
        </div>
    );
}

export default UserProfile;
