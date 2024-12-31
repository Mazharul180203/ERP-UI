import React, {useEffect, useState} from 'react';
import axios from "axios";
import {BASE_URL} from "../../../../config/config.js";
import toast from "react-hot-toast";
import {Button, Form, Input, Select, Spin} from "antd";
import moment from "moment";

const SalePaymentPage = () => {
    const [loading, setLoading] = useState(false);
    const [customerList, setCustomerList] = useState([]);
    const [supplierBalance, setSupplierBalance] = useState([]);
    const generateRandomNineDigitNumber = () =>{
        const min = 100000000;
        const max = 999999999;
        return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
    }
    const [paidcost, setPaidCost] = useState({
        paid:0,
        updated_current_bal:0,
        paid_status:'',
        total_cost:0,
    });
    const [formData, setFormData] = useState({
        customerId:'',
        date:moment().format('DD-MM-YYYY'),
        voucher_no:generateRandomNineDigitNumber()
    });

    useEffect(() => {
        (async () => {
            await getData();
        })();
    }, []);

    const getData = async () => {
        try {
            setLoading(true);
            let res = await axios.get(`${BASE_URL}/api/v1/dropdown/customer`, { withCredentials: true });
            setCustomerList(res.data.data);
        } catch (error) {
            console.error("Error fetching data", error);
            toast.error("Error fetching data");
        } finally {
            setLoading(false);
        }
    }

    const handleSelectChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };


    const handlePaidChange = (e) => {
        const paid = parseFloat(e.target.value) || 0;

        setPaidCost({
            paid: paid,
            updated_current_bal: (supplierBalance[0]?.curr_balance - paid).toFixed(2),
            paid_status: (supplierBalance[0]?.curr_balance - paid).toFixed(2) > 0 ? 'Receivable':'Payable',
            total_cost: supplierBalance[0]?.curr_balance
        });
    }

    const handleSubmit = async () => {

        try{
            setLoading(true);
            let res = await axios.post(`${BASE_URL}/api/v1/salesCustomerTracker`,{
                customerId: formData.customerId,
                totalCost: paidcost['total_cost'],
                paid: paidcost['paid'],
                curr_balance: parseFloat(paidcost['updated_current_bal']),
                payment_type: paidcost['paid_status'],
                voucher_no:formData['voucher_no']
            },{withCredentials:true})

            if (res.data.status === "success") {
                toast.success('Successfully Executed the transaction');
            } else {
                toast.error('An error occurred with one or both requests');
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
            <h2>Add Transaction </h2>
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
                    </div>
                    <div className="row">
                        <Form.Item label="Customer">
                            <Select name="customerId" value={formData.customerId}
                                    onChange={async (value) => {
                                        handleSelectChange('customerId', value)
                                        if (value) {
                                            let res = await axios.get(`${BASE_URL}/api/v1/getsalescustomertracker/${value}`, {withCredentials: true});
                                            console.log("res :", res.data.data)
                                            setSupplierBalance(res.data.data);
                                        } else {
                                            setSupplierBalance([]);
                                        }
                                    }}
                                    placeholder="Select Supplier">
                                <Option value="">Select Supplier</Option>
                                {
                                    customerList?.map((item) => (
                                        <Option key={item?.id} value={item?.id}>{item?.customer_name}</Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <Form.Item label="Previous Balance">
                                <Input name="supplierbalance"
                                       value={supplierBalance[0]?.curr_balance || 'not available'} readOnly/>
                            </Form.Item>
                        </div>
                        <div className="col-md-6">
                            <Form.Item label="Balance Status">
                                <Input name="balancestatus"
                                       value={supplierBalance[0]?.payment_type || 'not available'} readOnly/>
                            </Form.Item>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Form.Item label="Paid">
                                <Input name="paid" value={paidcost.paid} onChange={handlePaidChange}/>
                            </Form.Item>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <Form.Item label="Supplier Current Balance">
                                <Input name="currentbalance" value={paidcost.updated_current_bal} readOnly/>
                            </Form.Item>
                        </div>
                        <div className="col-md-6">
                            <Form.Item label="Paid Status">
                                <Input name="paidstatus" value={paidcost.paid_status} readOnly/>
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

export default SalePaymentPage;