import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Button, Spin } from 'antd';
import toast from 'react-hot-toast';
import ValidationHelper from "../../utilitiy/ValidationUtlity.js";
import axios from "axios";
import {BASE_URL} from "../../../../config/config.js";

const { Option } = Select;

const ProductForm = () => {
    const [loading, setLoading] = useState(false);
    const [categoryList,setCategoryList] = useState([]);
    const [brandList,setBrandList] = useState([]);
    const [unitList,setUnitList] = useState([]);
    const [formData, setFormData] = useState({
        productName: '',
        productCategory: '',
        brand: '',
        unit: '',
    });

    useEffect(() => {
        (async () => {
            await getData();
        })()
    }, []);

    const getData = async () => {
        setLoading(true);
        try {
            const [categoryResponse, brandsResponse, unitsResponse] = await Promise.all([
                axios.get(`${BASE_URL}/api/v1/dropdown/category`, { withCredentials: true }),
                axios.get(`${BASE_URL}/api/v1/dropdown/brands`, { withCredentials: true }),
                axios.get(`${BASE_URL}/api/v1/dropdown/unit`, { withCredentials: true })
            ]);
            setCategoryList(categoryResponse.data.data);
            setBrandList(brandsResponse.data.data);
            setUnitList(unitsResponse.data.data);
        } catch (error) {
            console.error("Error fetching data", error);
            toast.error("Error fetching data");
        } finally {
            setLoading(false);
        }
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSelectChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async () => {
        try {
            if (ValidationHelper.isEmpty(formData.productName)) {
                toast.error("Product Name is required");
            }
            else if (ValidationHelper.isEmpty(formData.productCategory)) {
                toast.error("Product Category is required");
            }
            else if (ValidationHelper.isEmpty(formData.brand)) {
                toast.error("Brand is required");
            }
            else if (ValidationHelper.isEmpty(formData.unit)) {
                toast.error("Unit is required");
            }else {
                setLoading(true);
                let res = await axios.post(`${BASE_URL}/api/v1/items`, {
                    items_name: formData.productName,
                    categoryId: formData.productCategory,
                    description: "will modify",
                    brandsId: formData.brand,
                    unitsId: formData.unit,
                }, {withCredentials: true});

                if (res.data['status'] === "success") {
                    toast.success("Product added Successfully!")
                    setFormData({
                        ...formData,
                        productName: '',
                        productCategory: '',
                        brand: '',
                        unit: ''
                    })

                }
            }
        } catch (error) {
            console.error("Error submitting form", error);
            toast.error("Error submitting form");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="product-form-container">
            <h2>Add New Product</h2>
            <Spin spinning={loading} size="large" tip="Loading...">
                <Form layout="vertical" onFinish={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6">
                            <Form.Item label="Product Name">
                                <Input name="productName" value={formData.productName} onChange={handleInputChange} placeholder="Product Name" />
                            </Form.Item>
                        </div>
                        <div className="col-md-6">
                            <Form.Item label="Product Category">
                                <Select name="productCategory" value={formData.productCategory}
                                        onChange={(value) => handleSelectChange('productCategory', value)}
                                        placeholder="Select Category">
                                    <Option value="">Select the category</Option>
                                    {
                                        categoryList?.map((item,i) => (
                                            <option key={item?.id} value={item?.id}>{item?.category_name}</option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <Form.Item label="Brand">
                                <Select name="brand" value={formData.brand} onChange={(value) => handleSelectChange('brand', value)}
                                        placeholder="Select Brand">
                                    <Option value="">Select the brand</Option>
                                    {
                                        brandList?.map((item,i) => (
                                            <option key={item?.id} value={item?.id}>{item?.brands_name}</option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                        </div>
                        <div className="col-md-6">
                            <Form.Item label="Unit">
                                <Select name="unit" value={formData.unit}
                                        onChange={(value) => handleSelectChange('unit', value)}
                                        placeholder="Select Unit">
                                    <Option value="">Select the unit</Option>
                                    {
                                        unitList?.map((item,i) => (
                                            <option key={item?.id} value={item?.id}>{item?.units_name}</option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Form.Item>
                                <Button type="primary" htmlType="submit" disabled={loading}>
                                    {loading ? 'Saving...' : 'Save'}
                                </Button>
                            </Form.Item>
                        </div>
                    </div>
                </Form>
            </Spin>
        </div>
    );
};

export default ProductForm;
