import { useState } from 'react';
import { Form, Input, Button, Upload, Select, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';


const { Option } = Select;

const Product = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        productName: '',
        productDescription: '',
        productPrice: '',
        productCategory: '',
        productUnit: '', // Added productUnit in formData
        upload: [],
    });

    const handleInputChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleUploadChange = ({ fileList }) => {
        setFormData({ ...formData, upload: fileList });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            // Simulating a form submission delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Form values:', formData);
            toast.success("Product is added successfully!");
            setFormData({
                productName: '',
                productDescription: '',
                productPrice: '',
                productCategory: '',
                productUnit: '', // Reset productUnit
                upload: [],
            });
        } catch (error) {
            console.error("Error submitting form", error);
            toast.error("Error submitting form");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form className="form-container" onFinish={handleSubmit} layout="vertical">
            <Form.Item label="Add New Product">
                <div className="form-row">
                    <div className="form-col">
                        <Form.Item
                            name="productName"
                            rules={[{ required: true, message: 'Please input the product name!' }]}
                        >
                            <Input
                                name="productName"
                                placeholder="Product Name"
                                className="input-field input-long"
                                value={formData.productName}
                                onChange={(e) => handleInputChange("productName", e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item
                            name="productDescription"
                            rules={[{ required: true, message: 'Please input the product description!' }]}
                        >
                            <Input
                                name="productDescription"
                                placeholder="Product Description"
                                className="input-field input-long"
                                value={formData.productDescription}
                                onChange={(e) => handleInputChange("productDescription", e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item
                            name="productPrice"
                            rules={[{ required: true, message: 'Please input the product price!' }]}
                        >
                            <Input
                                name="productPrice"
                                placeholder="Product Price"
                                className="input-field input-long"
                                value={formData.productPrice}
                                onChange={(e) => handleInputChange("productPrice", e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item
                            name="productCategory"
                            rules={[{ required: true, message: 'Please input the product category!' }]}
                        >
                            <Input
                                name="productCategory"
                                placeholder="Product Category"
                                className="input-field input-long"
                                value={formData.productCategory}
                                onChange={(e) => handleInputChange("productCategory", e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item
                            name="productUnit"
                            rules={[{ required: true, message: 'Please select the product unit!' }]}
                        >
                            <Select
                                placeholder="Select Product Unit"
                                className="input-field input-long"
                                value={formData.productUnit}
                                onChange={(value) => handleInputChange("productUnit", value)}
                            >
                                <Option value="kg">kg</Option>
                                <Option value="pieces">pieces</Option>
                                <Option value="litres">litres</Option>
                                <Option value="grams">grams</Option>
                            </Select>
                        </Form.Item>
                    </div>
                    <div className="form-col">
                        <Form.Item
                            name="upload"
                            valuePropName="fileList"
                            getValueFromEvent={handleUploadChange}
                            className="upload-box"
                        >
                            <Upload
                                name="logo"
                                listType="picture-card"
                                className="upload-box-content"
                                fileList={formData.upload}
                                onChange={handleUploadChange}
                            >
                                <div>
                                    <UploadOutlined />
                                    <div style={{ marginTop: 8 }}>Upload Image</div>
                                </div>
                            </Upload>
                        </Form.Item>
                    </div>
                </div>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="submit-button" disabled={loading}>
                    {loading ? <Spin /> : 'Save'}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Product;
