import React, {useState} from 'react';
import {Button, Form, Input, Spin} from "antd";
import ValidationHelper from "../../utilitiy/ValidationUtlity.js";
import toast from "react-hot-toast";
import axios from "axios";
import {BASE_URL} from "../../../../config/config.js";

const { TextArea } = Input;

const AddSupplierPage = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        supplierName: '',
        contactPerson: '',
        mobileNumber: '',
        address: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async () => {
        try{
            if (ValidationHelper.isEmpty(formData.supplierName)) {
                toast.error("Supplier Name is required");
            }
            else if (ValidationHelper.isEmpty(formData.contactPerson)) {
                toast.error("Contract Person is required");
            }
            else if (ValidationHelper.isEmpty(formData.mobileNumber)) {
                toast.error("Mobile Number is required");
            }
            else if (ValidationHelper.isEmpty(formData.address)) {
                toast.error("Address is required");
            }else {
                setLoading(true);
                let res = await axios.post(`${BASE_URL}/api/v1/supplier`,{
                    supplier_name:formData.supplierName,
                    contact_person:formData.contactPerson,
                    mobile_number:formData.mobileNumber,
                    address:formData.address,
                },{withCredentials:true})

                if (res.data['status'] === "success") {
                    toast.success("Supplier added Successfully!")
                    setFormData({
                        ...formData,
                        supplierName: '',
                        contactPerson: '',
                        mobileNumber: '',
                        address: ''
                    })
                }
            }
        }catch (e) {
            console.error("Error submitting form", e);
            toast.error("Error submitting form");
        }finally {
            setLoading(false);
        }
    }


    return (
        <div className="product-form-container">
            <h2>Add New Supplier</h2>
            <Spin spinning={loading} size="large" tip="Loading...">
                <Form layout="vertical" onFinish={handleSubmit}>
                    <div className="row">
                        <div className="col-md-12">
                            <Form.Item label="Supplier Name">
                                <Input name="supplierName" value={formData.supplierName} onChange={handleInputChange}
                                       placeholder="Supplier Name"/>
                            </Form.Item>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <Form.Item label="Contact Person">
                                <Input name="contactPerson" value={formData.contactPerson} onChange={handleInputChange}
                                       placeholder="Contact Person"/>
                            </Form.Item>
                        </div>
                        <div className="col-md-6">
                            <Form.Item label="Mobile Number">
                                <Input name="mobileNumber" value={formData.mobileNumber} onChange={handleInputChange}
                                       placeholder="Mobile Numbe"/>
                            </Form.Item>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Form.Item label="Address">
                                <TextArea name="address" value={formData.address} onChange={handleInputChange}
                                       placeholder="Address"/>
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

export default AddSupplierPage;