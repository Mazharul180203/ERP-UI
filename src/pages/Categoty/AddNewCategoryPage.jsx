import React, { useState } from 'react';
import { Input, Spin } from 'antd';
import { Form, Button } from 'react-bootstrap';
import toast from 'react-hot-toast';
import axios from 'axios';
import { BASE_URL } from '../../../../config/config.js';
import ValidationHelper from "../../utilitiy/ValidationUtlity.js";

const AddNewCategoryPage = () => {
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState('');

    const handleInputChange = (e) => {
        setCategory(e.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (ValidationHelper.isEmpty(category)) {
            toast.error("Enter the Category !");
            setLoading(false);
            return;
        }

        try {
            let res = await axios.post(`${BASE_URL}/api/v1/category`, { category_name: category }, { withCredentials: true });

            if (res.data['status'] === 'success') {
                toast.success("Category is added successfully !");
                setCategory('');
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
            <Form.Group controlId="formCategory">
                <Form.Label className="form-label">Add New Category</Form.Label>
                <div className="form-row">
                    <Input name="category" placeholder="Add new category" className="input-field" value={category}
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

export default AddNewCategoryPage;
