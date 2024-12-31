import React, { useState } from 'react';
import { Input, Spin } from 'antd';
import { Form, Button } from 'react-bootstrap';
import toast from 'react-hot-toast';
import axios from 'axios';
import { BASE_URL } from '../../../../config/config.js';
import ValidationHelper from "../../utilitiy/ValidationUtlity.js";

const AddNewBrandPage = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({brand: ''});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            const { brand } = formData;
            if (ValidationHelper.isEmpty(brand)) {
                toast.error("Enter the Brand !");
            }else{
                let res = await axios.post(`${BASE_URL}/api/v1/brands`, { brands_name: brand }, { withCredentials: true });
                if (res.data['status'] === 'success') {
                    toast.success("Brand is added successfully !");
                    setFormData({ brand: '' });
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
        <Form onSubmit={handleSubmit} className="product-form-container">
            <Form.Group controlId="formBrand">
                <Form.Label className="form-label">Add New Brand</Form.Label>
                <div className="form-row">
                    <Input name="brand" placeholder="Add new brand" className="input-field" value={formData.brand}
                           onChange={handleInputChange}
                    />
                    <Button type="submit" variant="primary" className="submit-button" disabled={loading}>
                        {loading ? <Spin /> : 'Add'}
                    </Button>
                </div>
            </Form.Group>
        </Form>
    );
};

export default AddNewBrandPage;
