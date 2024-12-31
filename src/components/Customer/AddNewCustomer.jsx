import React from 'react';
import SideNavbar from "../../layout/SideNavbar.jsx";
import AddNewCustomerPage from "../../pages/Customer/AddNewCustomerPage.jsx";
import CustomerRoutingPage from "./CustomerRoutingPage.jsx";

const AddNewCustomer = () => {
    return (
        <SideNavbar>
            <CustomerRoutingPage/>
            <AddNewCustomerPage />
        </SideNavbar>
    );
};

export default AddNewCustomer;