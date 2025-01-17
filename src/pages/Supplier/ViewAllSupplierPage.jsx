import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import toast from "react-hot-toast";
import {Button, Input, Space, Spin, Table} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import {BASE_URL} from "../../../config.js";

const ViewAllSupplierPage = () => {
    const [loading, setLoading] = useState(false);
    const [supplierList, setSupplierList] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            setLoading(true);
            let res = await axios.get(`${BASE_URL}/api/v1/dropdown/supplier`, { withCredentials: true });
            setSupplierList(res.data.data);
        } catch (error) {
            console.error("Error fetching data", error);
            toast.error("Error fetching data");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = async (clearFilters) => {
        clearFilters();
        setSearchText('');
        await getData(); // Re-fetch the data to reset the table
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => close()}
                    >
                        Close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns = [
        {
            title: 'SL No',
            dataIndex: 'slNo',
            key: 'slNo',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Supplier Name',
            dataIndex: 'supplierName',
            key: 'supplierName',
            ...getColumnSearchProps('supplierName'),
        },
        {
            title: 'Contact Person',
            dataIndex: 'contractPeron',
            key: 'contractPeron',
            ...getColumnSearchProps('contractPeron'),
        },
        {
            title: 'Contact Number',
            dataIndex: 'contactNumber',
            key: 'contactNumber',
            ...getColumnSearchProps('contactNumber'),
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            ...getColumnSearchProps('address'),
        },
    ];

    const data = supplierList.map((supplier, index) => ({
        key: index,
        supplierName: supplier.supplier_name,
        contractPeron:supplier.contact_person,
        contactNumber:supplier.mobile_number,
        address:supplier.address,
    }));

    return (
        <div className="product-form-container">
            <h2>All Supplier Details</h2>
            <Spin spinning={loading} size="large" tip="Loading...">
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    bordered
                />
            </Spin>
        </div>
    );
};

export default ViewAllSupplierPage;