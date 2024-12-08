import React, { useState } from 'react';
import { Button, Row, Col, Card, Tree, Form, Input, Table } from 'antd';
import { EditOutlined, DownOutlined, UpOutlined, ReloadOutlined } from '@ant-design/icons';

import { useDeleteOrg, useListOrgTree } from '@/services/org';
import { OrgEditForm } from '@/pages/org/orgs/edit.page.tsx';

export interface InputType {
    id?: string;
    parent?: string;
    parentId?: string;
    label?: string;
    abbreviation?: string;
    type?: string;
    describe?: string;
    state?: boolean;
    sortValue?: number;
}

export interface OutputType {
    id?: string;
    parent?: OutputType;
    children?: OutputType[];
    depth?: number;
    label?: string;
    type?: string;
    abbreviation?: string;
    parentId?: string;
    sortValue?: number;
    state?: boolean;
    describe?: string;
    deletedAt?: Date;
    createdAt?: Date;
    createdBy?: number;
    updatedAt?: Date;
    updatedBy?: number;
}

export default function Orgs() {
    const [form] = Form.useForm();
    const defaultClickOne: InputType = { type: '01', state: true };

    // 状态定义
    const [checkedKeys, setCheckedKeys] = useState<string[]>();
    const [clickOne, setClickOne] = useState<InputType>(defaultClickOne);
    const [expanded, setExpanded] = useState(true); // 控制树的展开和收缩

    // API-hook
    const { data: listOrgTree, refetch } = useListOrgTree();
    const { mutateAsync } = useDeleteOrg();
    // ==========逻辑处理==========
    // 复选框点击时处理
    const onCheck = (checked: React.Key[] | { checked: React.Key[] }) => {
        if (!Array.isArray(checked)) {
            const { checked: checkedValues } = checked;
            setCheckedKeys(checkedValues.map((key) => String(key)));
        }
    };

    // 树节点点击时处理
    const onSelect = async (selectedKeysValue: React.Key[], info: any) => {
        if (selectedKeysValue && selectedKeysValue.length > 0) {
            setClickOne(info.selectedNodes[0]);
        }
    };

    // 点击新增时的处理
    const addHandler = () => {
        if (clickOne.id) {
            defaultClickOne.parent = clickOne.id;
            defaultClickOne.parentId = clickOne.id;
            setClickOne(defaultClickOne);
        }
    };

    // 点击删除时的处理
    const delHandler = async () => {
        if (checkedKeys) {
            await mutateAsync(checkedKeys);
            // 可以添加刷新树或其他后续操作
        }
    };

    // 切换树的展开/收缩状态

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    const refreshTree = () => {
        // 假设 useListOrgTree 是一个自定义 Hook，我们可以在这里重新触发这个 Hook
        // 例如，如果 useListOrgTree 使用了 SWR 或 React Query，可以在这里调用 refetch
        useListOrgTree.refetch();
    };
    return (
        <div
            style={{
                display: 'flex',
                height: '100vh', // 页面高度占满视口
                gap: '16px', // 添加间隔
            }}
        >
            {/* 左侧树区域 */}
            <Col
                span={4}
                style={{
                    height: '80vh', // 高度占页面的 80%
                    overflow: 'hidden', // 防止内容超出
                }}
            >
                <Card
                    style={{
                        height: '100%', // 填充父容器
                        display: 'flex',
                        flexDirection: 'column', // Flex 布局
                    }}
                >
                    {/* 顶部按钮区域 */}
                    <div
                        style={{
                            marginBottom: 16,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <span>组织机构</span>
                        <div>
                            <Button icon={<EditOutlined />} onClick={() => console.log('进入机构管理')} />
                            <Button icon={expanded ? <UpOutlined /> : <DownOutlined />} onClick={toggleExpand} style={{ marginLeft: 8 }} />
                            <Button icon={<ReloadOutlined />} onClick={refreshTree} style={{ marginLeft: 8 }} />
                        </div>
                    </div>

                    {/* 树区域 */}
                    <div
                        style={{
                            flex: 1, // 填充剩余空间
                            overflow: 'auto', // 滚动条
                        }}
                    >
                        {listOrgTree && <Tree checkable checkStrictly defaultExpandAll={expanded} onCheck={(checked) => setCheckedKeys(checked as string[])} onSelect={(selectedKeys, info) => setClickOne(info.node)} treeData={listOrgTree} fieldNames={{ title: 'label', key: 'id' }} />}
                    </div>
                </Card>
            </Col>

            {/* 右侧内容区域 */}
            <Col
                span={20}
                style={{
                    flex: 1, // 填充剩余宽度
                    height: '80vh', // 高度占页面的 80%
                    overflow: 'auto', // 滚动条
                }}
            >
                <Card
                    style={{
                        height: '100%', // 填满父容器高度
                        overflow: 'auto', // 滚动条
                    }}
                >
                    <Form form={form}>
                        <Row gutter={24}>
                            <Col span={9}>
                                <Form.Item name="name">
                                    <Input placeholder="机构名称" allowClear />
                                </Form.Item>
                            </Col>
                            <Col span={3}>
                                <Form.Item name="search">
                                    <Button type="primary" htmlType="submit">
                                        搜索
                                    </Button>
                                </Form.Item>
                            </Col>
                            <Col span={3}>
                                <Button type="primary">重置</Button>
                            </Col>
                            <Col span={3}>
                                <Button type="primary" onClick={() => console.log('添加')}>
                                    添加
                                </Button>
                            </Col>
                            <Col span={3}>
                                <Button type="primary" onClick={() => console.log('删除')} disabled={!checkedKeys || checkedKeys.length === 0}>
                                    删除
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                    <Table />
                </Card>
            </Col>
        </div>
    );
}
