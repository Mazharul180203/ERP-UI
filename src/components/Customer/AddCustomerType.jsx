import React from 'react';
import SideNavbar from "../../layout/SideNavbar.jsx";
import CustomerRoutingPage from "./CustomerRoutingPage.jsx";
import AddCustomerTypePage from "../../pages/Customer/AddCustomerTypePage.jsx";

const AddCustomerType = () => {
    return (
        <SideNavbar>
            <CustomerRoutingPage/>
            <AddCustomerTypePage/>
        </SideNavbar>
    );
};

export default AddCustomerType;