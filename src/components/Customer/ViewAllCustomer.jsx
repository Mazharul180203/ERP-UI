import React from 'react';
import SideNavbar from "../../layout/SideNavbar.jsx";
import ViewAllCustomerPage from "../../pages/Customer/ViewAllCustomerPage.jsx";
import CustomerRoutingPage from "./CustomerRoutingPage.jsx";

const ViewAllCustomer = () => {
    return (
        <SideNavbar>
            <CustomerRoutingPage/>
            <ViewAllCustomerPage/>
        </SideNavbar>
    );
};

export default ViewAllCustomer;