import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Button, Spin } from 'antd';
import toast from 'react-hot-toast';
import ValidationHelper from "../../utilitiy/ValidationUtlity.js";
import axios from "axios";
import {BASE_URL} from "../../../../config/config.js";

const { Option } = Select;

const AddNewCustomer = () => {
    const [loading, setLoading] = useState(false);
    const [typeList,setTypeList] = useState([]);
    const [formData, setFormData] = useState({
        customer_name:'',
        customertypeId:'',

    });

    useEffect(() => {
        (async () => {
            await getData();
        })()
    }, []);

    const getData = async () => {
        setLoading(true);
        try {
           let res = await axios.get(`${BASE_URL}/api/v1/dropdown/customertype`, { withCredentials: true });
               setTypeList(res.data.data);
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
            if (ValidationHelper.isEmpty(formData.customer_name)) {
                toast.error("Customer Name is required");
            } else {
                setLoading(true);
                let res = await axios.post(`${BASE_URL}/api/v1/customer`, {
                    customer_name: formData.customer_name,
                    customertypeId:formData.customertypeId,
                }, {withCredentials: true});
                if (res.data['status'] === "success") {
                    toast.success("Product added Successfully!")
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
            <h2>Add New Customer</h2>
            <Spin spinning={loading} size="large" tip="Loading...">
                <Form layout="vertical" onFinish={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6">
                            <Form.Item label="Customer Name">
                                <Input name="customer_name" value={formData.customer_name} onChange={handleInputChange} placeholder="Customer Name" />
                            </Form.Item>
                        </div>
                        <div className="col-md-6">
                            <Form.Item label="Product Category">
                                <Select name="productCategory" value={formData.customertypeId}
                                        onChange={(value) => handleSelectChange('customertypeId', value)}
                                        placeholder="Select Type">
                                    <Option value="">Select the type</Option>
                                    {
                                        typeList?.map((item,i) => (
                                            <option key={item?.id} value={item?.id}>{item?.type_name}</option>
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

export default AddNewCustomer;
