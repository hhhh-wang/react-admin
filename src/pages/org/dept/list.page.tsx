import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Card, Tree, Form, Input, Table, Pagination, message } from 'antd';
import { EditOutlined, DownOutlined, UpOutlined, ReloadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import { useListOrgTree } from '@/services/org';
import { useListUserRelate } from '@/services/user';
import { columns, InputType, OutputType } from './constants';

import './Dept.less';

export default function Dept() {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    // 状态定义

    const [expanded, setExpanded] = useState(true); // 控制树的展开和收缩
    const [expandedKeys, setExpandedKeys] = useState<string[]>([]); // 控制树的展开和收缩
    const [clickOne, setClickOne] = useState<OutputType>();
    const [listRelateParams, setListRelateParams] = useState<InputType>();
    const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
    // API-hook
    const { data: listOrgTree, refetch } = useListOrgTree();
    const { data } = useListUserRelate(listRelateParams);

    // ==========逻辑处理==========
    // 复选框点击时处理

    // 树节点点击时的处理
    const selectedKeys = async (_: React.Key[], info: any) => {
        const selectedNode = info.node; // 当前点击的节点
        const treeNodeId = selectedNode.id;

        // 如果点击的节点已经在选中状态，则取消选中
        if (checkedKeys.includes(treeNodeId)) {
            setCheckedKeys((prev) => prev.filter((key) => key !== treeNodeId));
            setClickOne(undefined); // 清除点击的节点
        } else {
            // 如果点击的节点未被选中，则选中
            setCheckedKeys([treeNodeId]);
            setClickOne(selectedNode); // 设置点击的节点
        }
    };

    // 字典详情分页改变处理
    const onPageChange = (page: number, pageSize: number) => {
        const values: InputType = { page, limit: pageSize };
        console.log('返回的数据：', values);
        setListRelateParams(values);
    };

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    // 切换树的展开/收缩状态
    const toggleExpand = () => {
        if (expanded) {
            setExpandedKeys([]); // 收起所有节点
        } else {
            const allKeys = listOrgTree?.map((node: any) => node.id) || []; // 展开所有节点
            setExpandedKeys(allKeys);
        }
        setExpanded(!expanded); // 切换展开状态
    };
    // 更新树
    const refreshTree = () => {
        refetch()
            .then(() => {
                message.success('树结构已更新');
            })
            .catch(() => {
                message.error('更新失败，请稍后重试');
            });
    };
    // 多选框处理
    const rowSelection = {
        // 指定选中项的 key 数组，从0开始的下标，用于控制数据的勾选，自动的本来可以，手动主要用于删除后的清除
        selectedRowKeys,
        // 选中项发生变化时的回调
        onChange: (newSelectedRowKeys: React.Key[]) => {
            // 用于显示勾选项
            setSelectedRowKeys(newSelectedRowKeys);
        },
    };

    // ==========详情页处理==========

    // 监听 clickOne 变化后触发 onFinish
    useEffect(() => {
        if (clickOne) {
            onFinish();
        }
    }, [clickOne]);
    // ==========发起请求==================
    const onFinish = () => {
        // 获取表单数据
        const formData = form.getFieldsValue() || {};
        if (clickOne) {
            formData.orgId = clickOne.id;
        }
        // 更新表格数据
        setListRelateParams(formData);
    };

    return (
        <div className="dept-container">
            {/* 左侧树区域 */}
            <Col span={4} className="dept-tree-container">
                <Card className="dept-card">
                    <div className="dept-tree-top">
                        <span>组织机构</span>
                        <div>
                            <Button icon={<EditOutlined />} onClick={() => navigate('/org/users')} />
                            <Button icon={expanded ? <UpOutlined /> : <DownOutlined />} onClick={toggleExpand} style={{ marginLeft: 8 }} />
                            <Button icon={<ReloadOutlined />} onClick={refreshTree} style={{ marginLeft: 8 }} />
                        </div>
                    </div>
                    <div className="dept-tree-content">
                        {listOrgTree && (
                            <Tree
                                checkable
                                checkStrictly
                                expandedKeys={expandedKeys} // 控制树节点的展开/收缩
                                onExpand={(keys) => setExpandedKeys(keys as string[])} // 更新展开的节点
                                onSelect={selectedKeys} // 优化后的选择逻辑
                                treeData={listOrgTree}
                                fieldNames={{ title: 'label', key: 'id' }}
                                checkedKeys={checkedKeys} // 绑定受控的选中状态
                            />
                        )}
                    </div>
                </Card>
            </Col>

            {/* 右侧内容区域 */}
            <Col span={20} className="dept-content-container">
                <Card className="dept-content-card">
                    <Form form={form} onFinish={onFinish}>
                        <Row gutter={24}>
                            <Col span={9}>
                                <Form.Item name="account">
                                    <Input placeholder="账号" allowClear />
                                </Form.Item>
                            </Col>
                            <Col span={3}>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        搜索
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                    <Table
                        rowSelection={{
                            ...rowSelection,
                        }}
                        columns={columns()}
                        dataSource={data?.items.map((item: { id: any }) => ({
                            ...item,
                            key: item.id,
                        }))}
                        pagination={false}
                        scroll={{ x: 1400 }}
                    />
                    <div className="dept-table-pagination-gap">
                        <Pagination showSizeChanger onChange={onPageChange} total={data?.meta.totalItems} showTotal={(total) => `共 ${total} 条`} current={data?.meta.currentPage} />
                    </div>
                </Card>
            </Col>
        </div>
    );
}
