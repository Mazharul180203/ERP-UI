import React from 'react';
import { Spin } from 'antd';

const LoadingSpinner = ({ spinning }) => {
    return (
        <Spin spinning={spinning} size="large" tip="Loading...">
            <div style={{ minHeight: '200px' }} />
        </Spin>
    )
};

export default LoadingSpinner;
