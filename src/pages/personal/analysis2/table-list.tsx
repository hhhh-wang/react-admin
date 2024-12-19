import React from 'react';
import { MoreOutlined } from '@ant-design/icons';
import { Table, Tag, Dropdown } from 'antd';
import Iconify from '@/components/icon/iconify-icon'; // 引入封装的图标组件

const { Column } = Table;

// 表格数据类型定义
type TableDataType = {
    key: string;
    invoiceId: string;
    category: string;
    price: string;
    status: string;
};

// 左侧表格组件
export const InvoiceTable: React.FC = () => {
    const tableData: TableDataType[] = [
        { key: '1', invoiceId: 'INV-1990', category: 'Android', price: '$83.74', status: 'Paid' },
        { key: '2', invoiceId: 'INV-1991', category: 'Mac', price: '$97.14', status: 'Out Of Date' },
        { key: '3', invoiceId: 'INV-1992', category: 'Windows', price: '$68.71', status: 'Progress' },
        { key: '4', invoiceId: 'INV-1993', category: 'Android', price: '$85.21', status: 'Paid' },
        { key: '5', invoiceId: 'INV-1994', category: 'Mac', price: '$53.17', status: 'Paid' },
    ];

    const getStatusTag = (status: string) => {
        switch (status) {
            case 'Paid':
                return <Tag color="green">Paid</Tag>;
            case 'Out Of Date':
                return <Tag color="red">Out Of Date</Tag>;
            case 'Progress':
                return <Tag color="orange">Progress</Tag>;
            default:
                return <Tag>{status}</Tag>;
        }
    };

    return (
        <div className="bg-white flex-1 rounded-lg p-4 shadow-lg">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">sku详情</h2>
            <Table dataSource={tableData} pagination={{ pageSize: 5 }} rowKey="key">
                <Column title="商品编码" dataIndex="invoiceId" key="invoiceId" />
                <Column title="种类" dataIndex="category" key="category" />
                <Column title="价格" dataIndex="price" key="price" />
                <Column title="状态" dataIndex="status" key="status" render={(status) => getStatusTag(status)} />
                <Column
                    title="Action"
                    key="action"
                    render={() => {
                        const menuItems = [
                            { key: 'view', label: 'View' },
                            { key: 'edit', label: 'Edit' },
                            { key: 'delete', label: 'Delete' },
                        ];

                        return (
                            <Dropdown menu={{ items: menuItems }}>
                                <MoreOutlined className="cursor-pointer text-lg text-gray-600" />
                            </Dropdown>
                        );
                    }}
                />
            </Table>
        </div>
    );
};

// 右侧应用列表组件
export const ApplicationList: React.FC = () => {
    const applications = [
        {
            name: 'Chrome',
            price: 'Free',
            platform: 'Mac',
            rating: 4,
            reviews: '9.91k',
            icon: <Iconify icon="logos:chrome" size={24} />,
            description: 'Google Chrome Web Browser',
        },
        {
            name: 'Drive',
            price: 'Free',
            platform: 'Mac',
            rating: 4,
            reviews: '1.95k',
            icon: <Iconify icon="mdi:google-drive" size={24} />,
            description: 'Google Cloud Storage Platform',
        },
        {
            name: 'Dropbox',
            price: '$66.71',
            platform: 'Windows',
            rating: 4.5,
            reviews: '9.12k',
            icon: <Iconify icon="logos:dropbox" size={24} />,
            description: 'Secure Cloud Storage',
        },
        {
            name: 'Slack',
            price: 'Free',
            platform: 'Mac',
            rating: 4,
            reviews: '6.98k',
            icon: <Iconify icon="mdi:slack" size={24} />,
            description: 'Team Collaboration Platform',
        },
        {
            name: 'Discord',
            price: '$52.17',
            platform: 'Windows',
            rating: 1,
            reviews: '8.49k',
            icon: <Iconify icon="mdi:discord" size={24} />,
            description: 'Voice & Text Chat for Gamers',
        },
    ];

    return (
        <div className="bg-white w-full rounded-lg p-4 shadow-lg ">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">热门程序</h2>
            <ul className="space-y-4">
                {applications.map((app, index) => (
                    <li key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            {app.icon}
                            <div>
                                <p className="text-sm font-medium text-gray-900">{app.name}</p>
                                <p className="text-xs text-gray-600">{app.description}</p>
                                <p className="text-xs text-gray-600">
                                    {app.platform} · <span className={`${app.price === 'Free' ? 'text-green' : 'text-red-500'} font-medium`}>{app.price}</span>
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <div className="text-2xl text-yellow">
                                {'★'.repeat(Math.floor(app.rating))}
                                {'☆'.repeat(5 - Math.floor(app.rating))}
                            </div>
                            <span className="text-xs text-gray-400">{app.reviews} 评价</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
