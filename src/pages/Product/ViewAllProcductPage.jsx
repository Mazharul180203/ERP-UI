import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import toast from "react-hot-toast";
import {Button, Input, Space, Spin, Table} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import {BASE_URL} from "../../../config.js";

const ViewAllProductPage = () => {
    const [loading, setLoading] = useState(false);
    const [productList, setProductList] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            setLoading(true);
            let res = await axios.get(`${BASE_URL}/api/v1/dropdown/items`, { withCredentials: true });
            console.log("category list", res.data.data);
            setProductList(res.data.data);
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
            title: 'Product Name',
            dataIndex: 'productsName',
            key: 'productsName',
            ...getColumnSearchProps('productsName'),
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            ...getColumnSearchProps('description'),
        },
    ];

    const data = productList.map((products, index) => ({
        key: index,
        productsName: products.items_name,
        description: products.description,
    }));

    return (
        <div className="product-form-container">
            <h2>All Product Details</h2>
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

export default ViewAllProductPage;