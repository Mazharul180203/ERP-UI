import React, {useState} from 'react';
import ValidationHelper from "../../utilitiy/ValidationUtlity.js";
import toast from "react-hot-toast";
import axios from "axios";
import {BASE_URL} from "../../../../config/config.js";
import {Button, Form} from "react-bootstrap";
import {Input, Spin} from "antd";

const AddCustomerTypePage = () => {
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState('');

    const handleInputChange = (e) => {
        setType(e.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (ValidationHelper.isEmpty(type)) {
            toast.error("Enter the Type !");
            setLoading(false);
            return;
        }

        try {

            let res = await axios.post(`${BASE_URL}/api/v1/customertype`, { type_name: type }, { withCredentials: true });

            if (res.data['status'] === 'success') {
                toast.success("Customer Type is added successfully !");
                setType('');
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
            <Form.Group controlId="formType">
                <Form.Label className="form-label">Add New Customer Type</Form.Label>
                <div className="form-row">
                    <Input name="customertype" placeholder="Add new type" className="input-field" value={type}
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

export default AddCustomerTypePage;