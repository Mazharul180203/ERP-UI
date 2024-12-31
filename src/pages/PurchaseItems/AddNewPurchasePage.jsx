import React, { useEffect, useState } from 'react';
import { Button, Form, Select, Spin, Input, Table } from "antd";
import axios from "axios";
import { BASE_URL } from "../../../../config/config.js";
import toast from "react-hot-toast";
import moment from "moment";

const { Option } = Select;

const AddNewPurchasePage = () => {
    const [loading, setLoading] = useState(false);
    const [supplierList, setSupplierList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [productList, setProductList] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [supplierBalance, setSupplierBalance] = useState([]);
    const [paidcost, setPaidCost] = useState({
        paid:0,
        updated_current_bal:0,
        paid_status:'',
        total_cost:0,
    });
    const generateRandomNineDigitNumber = () =>{
        const min = 100000000;
        const max = 999999999;
        return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
    }
    const [formData, setFormData] = useState({
        itemId: '',
        itemName: '',
        supplierId: '',
        categoryId: '',
        purchase_qty: '',
        price_per_unit: '',
        priceAvg: '',
        discount:'',
        totalCost: '',
        transport_cost:'',
        date:moment().format('DD-MM-YYYY'),
        voucher_no:generateRandomNineDigitNumber()
    });
    const [transportCost, setTransportCost] = useState(0);

    useEffect(() => {
        (async () => {
            await getData();
        })();
    }, []);

    const getData = async () => {
        try {
            setLoading(true);
            const [supplierResponse, categoryResponse] = await Promise.all([
                axios.get(`${BASE_URL}/api/v1/dropdown/supplier`, { withCredentials: true }),
                axios.get(`${BASE_URL}/api/v1/dropdown/category`, { withCredentials: true }),
            ]);
            setSupplierList(supplierResponse.data.data);
            setCategoryList(categoryResponse.data.data);
        } catch (error) {
            console.error("Error fetching data", error);
            toast.error("Error fetching data");
        } finally {
            setLoading(false);
        }
    }

    const handleInputChange = (index, e) => {
        const { name, value } = e.target;
        const updatedProducts = [...selectedProducts];
        updatedProducts[index] = {
            ...updatedProducts[index],
            [name]: value,
        };

        updateTotalCost(updatedProducts);
    };

    const handleTransportCostChange = (e) => {
        const cost = parseFloat(e.target.value) || 0;
        setTransportCost(cost);
        updateTotalCost(selectedProducts, cost);
    };

    const handlePaidChange = (e) => {
        const paid = parseFloat(e.target.value) || 0;
        const grandTotal = selectedProducts.reduce((total, product) => {
            return total + parseFloat(product.totalCost);
        }, 0);

        setPaidCost({
            paid: paid,
            updated_current_bal: (grandTotal - paid + (supplierBalance[0]?.curr_balance || 0)).toFixed(2),
            paid_status: (grandTotal - paid + (supplierBalance[0]?.curr_balance || 0)).toFixed(2) > 0 ? 'Receivable':'Payable',
            total_cost: grandTotal
        });
    }

    const updateTotalCost = (products, newTransportCost = transportCost) => {
        const updatedProducts = [...products];
        const transport_cost = (newTransportCost / selectedProducts.length) || 0;

        updatedProducts.forEach(product => {
            const purchase_qty = parseFloat(product.purchase_qty) || 0;
            const price_per_unit = parseFloat(product.price_per_unit) || 0;
            const discount = parseFloat(product.discount) || 0;

            let totalCost = purchase_qty * price_per_unit - discount;
            totalCost += transport_cost;

            product.totalCost = totalCost.toFixed(2);
            product.transport_cost = transport_cost.toFixed(2);
        });

        setSelectedProducts(updatedProducts);

        const grandTotal = updatedProducts.reduce((total, product) => {
            return total + parseFloat(product.totalCost);
        }, 0);

        setPaidCost(prevState => ({
            ...prevState,
            updated_current_bal: (grandTotal - prevState.paid + (supplierBalance[0]?.curr_balance || 0)).toFixed(2),
            paid_status: (grandTotal - prevState.paid + (supplierBalance[0]?.curr_balance || 0)).toFixed(2) > 0 ? 'Receivable':'Payable',
            total_cost: grandTotal
        }));
    };

    const handleSelectChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleProductSelect = async (value) => {
        if (value) {
            try {
                setLoading(true);
                let res = await axios.post(`${BASE_URL}/api/v1/itemDetail/${value}`, {}, { withCredentials: true });
                const itemData = res.data.data['itemPurchase'];
                const newProduct = {
                    itemId: value,
                    itemName: itemData?.['items_name'],
                    purchase_qty: '',
                    price_per_unit: '',
                    categoryId: formData.categoryId,
                    supplierId: formData.supplierId,
                    discount: '',
                    totalCost: '',
                    transport_cost: '',
                };

                const updatedProducts = [...selectedProducts, newProduct];
                setSelectedProducts(updatedProducts);
                updateTotalCost(updatedProducts);
            } catch (error) {
                console.error("Error fetching product details", error);
                toast.error("Error fetching product details");
            } finally {
                setLoading(false);
            }
        }
    };

    const handleSubmit = async () => {
        try {
            setLoading(true)
            const purchaseItemsRequest = axios.post(
                `${BASE_URL}/api/v1/purchaseitems`,
                { selectedProducts },
                { withCredentials: true }
            );

            const purchaseSupplierTrackerRequest = axios.post(
                `${BASE_URL}/api/v1/purchasesuppliertracker`,
                {
                    supplierId: formData.supplierId,
                    totalCost: paidcost['total_cost'],
                    paid: paidcost['paid'],
                    curr_balance: parseFloat(paidcost['updated_current_bal']),
                    payment_type: paidcost['paid_status'],
                    voucher_no:formData['voucher_no']

                },
                { withCredentials: true }
            );

            const [purchaseItemsResponse, purchaseSupplierTrackerResponse] = await Promise.all([
                purchaseItemsRequest,
                purchaseSupplierTrackerRequest
            ]);

            if (purchaseItemsResponse.data.status === "success" && purchaseSupplierTrackerResponse.data.status === "success") {
                toast.success('Successfully Added Product');
            } else {
                toast.error('An error occurred with one or both requests');
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred while making the requests');
        }finally {
            setLoading(false)
        }
    }

    const columns = [
        {
            title: 'SL',
            dataIndex: 'sl',
            key: 'sl',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Name',
            dataIndex: 'itemName',
            key: 'itemName',
        },
        {
            title: 'Quantity',
            dataIndex: 'purchase_qty',
            key: 'purchase_qty',
            render: (text, record, index) => (
                <Input name="purchase_qty" value={text} onChange={(e) => handleInputChange(index, e)} />
            ),
        },
        {
            title: 'Unit Price',
            dataIndex: 'price_per_unit',
            key: 'price_per_unit',
            render: (text, record, index) => (
                <Input name="price_per_unit" value={text} onChange={(e) => handleInputChange(index, e)} />
            ),
        },
        {
            title: 'Discount',
            dataIndex: 'discount',
            key: 'discount',
            render: (text, record, index) => (
                <Input name="discount" value={text} onChange={(e) => handleInputChange(index, e)} />
            ),
        },
        {
            title: 'Transport Share',
            dataIndex: 'transport_cost',
            key: 'transport_cost',
        },
        {
            title: 'Total',
            dataIndex: 'totalCost',
            key: 'totalCost',
        },
    ];

    const calculateGrandTotal = () => {
        const totalCost = selectedProducts.reduce((total, product) => {
            const cost = parseFloat(product.totalCost) || 0;
            return total + cost;
        }, 0).toFixed(2);
        return totalCost;
    };
    return (
        <div className="product-form-container">
            <h2>New Purchase Product</h2>
            <Spin spinning={loading} size="large" tip="Loading...">
                <Form layout="vertical" onFinish={handleSubmit}>
                    <div className="row">
                        <div className="col-md-2">
                            <Form.Item label="Date">
                                <Input name="date" value={formData.date} readOnly/>
                            </Form.Item>
                        </div>
                        <div className="col-md-2 ms-4">
                            <Form.Item label="Voucher No.">
                                <Input name="voucher_no" value={formData.voucher_no} readOnly/>
                            </Form.Item>
                        </div>
                        <div className="col-md-2 ms-4">
                            <Form.Item label="Supplier">
                                <Select name="supplierId" value={formData.supplierId}
                                        onChange={async (value) => {
                                            handleSelectChange('supplierId', value)
                                            if (value) {
                                                let res = await axios.get(`${BASE_URL}/api/v1/getpurchasesuppliertracker/${value}`, {withCredentials: true});
                                                console.log("res :", res.data.data)
                                                setSupplierBalance(res.data.data);
                                            } else {
                                                setSupplierBalance([]);
                                            }
                                        }}
                                        placeholder="Select Supplier">
                                    <Option value="">Select Supplier</Option>
                                    {
                                        supplierList?.map((item) => (
                                            <Option key={item?.id} value={item?.id}>{item?.supplier_name}</Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                        </div>
                        <div className="col-md-2 ms-4">
                            <Form.Item label="Category">
                                <Select name="categoryId" value={formData.categoryId}
                                        onChange={async (value) => {
                                            handleSelectChange('categoryId', value);
                                            if (value) {
                                                let res = await axios.post(`${BASE_URL}/api/v1/categoryItem/${value}`, {}, {withCredentials: true});
                                                setProductList(res.data.data);
                                            } else {
                                                setProductList([]);
                                            }
                                            setFormData({...formData, categoryId: value, productId: '',});
                                        }}
                                        placeholder="Select Category">
                                    <Option value="">Select the category</Option>
                                    {
                                        categoryList?.map((item) => (
                                            <Option key={item?.id} value={item?.id}>{item?.category_name}</Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                        </div>
                        <div className="col-md-2 ms-4">
                            <Form.Item label="Product">
                                <Select name="productId" value={formData.itemId}
                                        onChange={async (value) => {
                                            handleSelectChange('itemId', value);
                                            handleProductSelect(value);
                                        }}
                                        placeholder="Select Product">
                                    <Option value="">Select the product</Option>
                                    {
                                        productList?.map((item) => (
                                            <Option key={item?.id} value={item?.id}>{item?.items_name}</Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                        </div>
                    </div>

                    <Table
                        dataSource={selectedProducts}
                        columns={columns}
                        pagination={false}
                        rowKey="itemId"
                        summary={() => (
                            <Table.Summary.Row>
                                <Table.Summary.Cell colSpan={6}>Grand Total</Table.Summary.Cell>
                                <Table.Summary.Cell>
                                    <span>{calculateGrandTotal()}</span>
                                </Table.Summary.Cell>
                            </Table.Summary.Row>
                        )}
                    />

                    <div className="row justify-content-end mt-4">
                        <div className="col-md-6">
                            <Form.Item label="Transport And Labour Cost">
                                <Input name="transportCost" value={transportCost} onChange={handleTransportCostChange}/>
                            </Form.Item>
                        </div>

                    </div>
                    <div className="row justify-content-end">
                        <div className="col-md-3">
                            <Form.Item label="Previous Balance">
                                <Input name="supplierbalance"
                                       value={supplierBalance[0]?.curr_balance || 'not available'} readOnly/>
                            </Form.Item>
                        </div>
                        <div className="col-md-3">
                            <Form.Item label="Balance Status">
                                <Input name="balancestatus"
                                       value={supplierBalance[0]?.payment_type || 'not available'} readOnly/>
                            </Form.Item>
                        </div>
                    </div>
                    <div className="row justify-content-end">
                        <div className="col-md-6">
                            <Form.Item label="Paid">
                                <Input name="paid" value={paidcost.paid} onChange={handlePaidChange}/>
                            </Form.Item>
                        </div>
                    </div>
                    <div className="row justify-content-end">
                        <div className="col-md-3">
                            <Form.Item label="Supplier Current Balance">
                                <Input name="currentbalance" value={paidcost.updated_current_bal} readOnly/>
                            </Form.Item>
                        </div>
                        <div className="col-md-3">
                            <Form.Item label="Paid Status">
                                <Input name="paidstatus" value={paidcost.paid_status} readOnly/>
                            </Form.Item>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12 d-flex justify-content-end">
                            <Form.Item>
                                <Button type="primary" htmlType="submit" disabled={loading}>
                                    {loading ? 'Saving...' : 'Purchase'}
                                </Button>
                            </Form.Item>
                        </div>
                    </div>
                </Form>
            </Spin>
        </div>
    );
};

export default AddNewPurchasePage;
