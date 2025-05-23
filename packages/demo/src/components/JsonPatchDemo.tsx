import React from 'react';
import { Typography, Tabs, Button, Space } from 'antd';
import type { TabsProps } from 'antd';
import {
    EditOutlined,
    CheckOutlined,
    WarningOutlined,
    AppstoreOutlined,
    ReloadOutlined,
} from '@ant-design/icons';
import { PatchProvider, usePatchContext } from '../context/PatchContext';
import JsonPatchEditor from './JsonPatchEditor';
import ConflictResolutionSection from './ConflictResolutionSection';
import ResultSection from './ResultSection';
import SchemaEditSection from './SchemaEditSection';
import PatchPreviewSection from './PatchPreviewSection';

const { Title } = Typography;

/**
 * 主应用内容组件，处理不同标签页的显示
 */
const JsonPatchDemoContent: React.FC = () => {
    const { activeTab, setActiveTab, error, resetWorkflow, loadExampleData, hasConflicts } =
        usePatchContext();

    // 定义标签页
    const tabs: TabsProps['items'] = [
        {
            key: 'schema',
            label: (
                <span>
                    <AppstoreOutlined />
                    数据模型
                </span>
            ),
            children: <SchemaEditSection />,
        },
        {
            key: 'editor',
            label: (
                <span>
                    <EditOutlined />
                    JSON编辑
                </span>
            ),
            children: <JsonPatchEditor />,
        },
        {
            key: 'patches',
            label: (
                <span>
                    <CheckOutlined />
                    补丁预览
                </span>
            ),
            children: <PatchPreviewSection />,
        },
        {
            key: 'conflicts',
            label: (
                <span>
                    <WarningOutlined />
                    冲突解决
                    {hasConflicts && <span className="conflict-badge"> !</span>}
                </span>
            ),
            children: <ConflictResolutionSection />,
            disabled: !hasConflicts,
        },
        {
            key: 'result',
            label: (
                <span>
                    <CheckOutlined />
                    应用结果
                </span>
            ),
            children: <ResultSection />,
        },
    ];

    return (
        <div className="json-patch-demo">
            <div className="demo-header">
                <Title level={2}>Schema JSON Patch Demo</Title>
                <Space>
                    <Button icon={<ReloadOutlined />} onClick={resetWorkflow}>
                        重置
                    </Button>
                    <Button type="primary" onClick={loadExampleData}>
                        加载示例
                    </Button>
                </Space>
            </div>

            {error && (
                <div className="error-message">
                    <Typography.Text type="danger">{error}</Typography.Text>
                </div>
            )}

            <Tabs
                activeKey={activeTab}
                items={tabs}
                destroyInactiveTabPane={true}
                onChange={key => setActiveTab(key)}
            />
        </div>
    );
};

/**
 * JSON补丁演示应用主组件，提供上下文管理
 */
const JsonPatchDemo: React.FC = () => {
    return (
        <PatchProvider>
            <JsonPatchDemoContent />
        </PatchProvider>
    );
};

export default JsonPatchDemo;
