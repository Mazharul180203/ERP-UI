import React from 'react';
import SideNavbar from "../../layout/SideNavbar.jsx";
import CustomerRoutingPage from "../../components/Customer/CustomerRoutingPage.jsx";

const CustomerPage = () => {
    return (
        <SideNavbar>
            <CustomerRoutingPage/>
        </SideNavbar>
    );
};

export default CustomerPage;