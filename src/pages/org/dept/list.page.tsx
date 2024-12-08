import React, { useState } from 'react';
import { Button, Row, Col, Card, Tree, Form, Input, Table, Pagination, message } from 'antd';
import { EditOutlined, DownOutlined, UpOutlined, ReloadOutlined } from '@ant-design/icons';

import { useDeleteOrg, useListOrgTree } from '@/services/org';

import { columns } from '@/pages/org/users/constants.tsx';
import { useDeleteUser, useListUserRelate } from '@/services/user.ts';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const defaultClickOne: InputType = { type: '01', state: true };

    // 状态定义
    const [checkedKeys, setCheckedKeys] = useState<string[]>();

    const [expanded, setExpanded] = useState(true); // 控制树的展开和收缩
    const [expandedKeys, setExpandedKeys] = useState<string[]>([]); // 控制树的展开和收缩

    const [listRelateParams, setListRelateParams] = useState<InputType>();
    // API-hook
    const { data: listOrgTree, refetch } = useListOrgTree();
    const { mutateAsync: delMutate } = useDeleteUser();
    const { mutateAsync } = useDeleteOrg();
    // 打开编辑表单处理器，点击按钮触发
    const [clickOne, setClickOne] = useState<OutputType>();
    const [showInfo, setShowInfo] = useState(false);
    const { data } = useListUserRelate(listRelateParams);
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

    // 字典详情分页改变处理
    const onPageChange = (page: number, pageSize: number) => {
        const values: InputType = { page, limit: pageSize };
        setListRelateParams(values);
    };

    // 批量删除处理
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [selectedIds, setSelectedIds] = useState<string[]>();
    const batchDelHandler = async () => {
        if (!selectedIds) {
            message.error('请勾选数据之后删除');
            return;
        }
        delMutate(selectedIds);
        setSelectedIds(undefined);
        setSelectedRowKeys([]);
    };
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
    //更新树
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
        onChange: (newSelectedRowKeys: React.Key[], selectedRows: OutputType[]) => {
            // 用于显示勾选项
            setSelectedRowKeys(newSelectedRowKeys);
            // 删除时的ids传值
            const ids: string[] = [];
            selectedRows.forEach((val, index) => {
                ids[index] = val.id!;
            });
            setSelectedIds(ids);
        },
    };

    const onOpenFormHandler = (record?: OutputType) => {
        if (record) {
            setClickOne(record);
        } else {
            const defaultRecord = { state: true, password: '123456' };
            setClickOne(defaultRecord);
        }
        setShowInfo(true);
    };

    const onDelHandler = async (ids: string[]) => {
        delMutate(ids);
    };

    // ==========详情页处理==========
    const [showInfoDetail, setShowInfoDetail] = useState(false);
    const onOpenDetailHanler = (record: OutputType) => {
        setShowInfoDetail(true);
        setClickOne(record);
    };
    // ==========重置密码页处理==========
    const [showInfoResetPwd, setShowInfoResetPwd] = useState(false);
    const onOpenResetPwdHanler = (record: OutputType) => {
        setShowInfoResetPwd(true);
        setClickOne(record);
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
                            <Button icon={<EditOutlined />} onClick={() => navigate('/org/users')} />
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
                        {listOrgTree && (
                            <Tree
                                checkable
                                checkStrictly
                                expandedKeys={expandedKeys} // 绑定展开状态
                                onExpand={(keys) => setExpandedKeys(keys as string[])} // 更新展开节点
                                onCheck={(checked) => setCheckedKeys(checked as string[])}
                                onSelect={(selectedKeys, info) => setClickOne(info.node)}
                                treeData={listOrgTree}
                                fieldNames={{ title: 'label', key: 'id' }}
                            />
                        )}
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
                    <Table
                        rowSelection={{
                            ...rowSelection,
                        }}
                        columns={columns({
                            onOpenFormHandler,
                            onDelHandler,
                            onOpenDetailHanler,
                            onOpenResetPwdHanler,
                        })}
                        dataSource={data?.items}
                        pagination={false}
                        scroll={{ x: 1400 }}
                    />
                    {/* 自定义分页 */}
                    <Pagination showSizeChanger onChange={onPageChange} total={data?.meta.totalItems} showTotal={(total) => `共 ${total} 条`} current={data?.meta.currentPage} />
                </Card>
            </Col>
        </div>
    );
}
