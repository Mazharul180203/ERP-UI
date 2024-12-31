import React from 'react';
import SupplierRoutingPage from "./SupplierRoutingPage.jsx";
import SideNavbar from "../../layout/SideNavbar.jsx";
import AllTransactionPage from "../../pages/Supplier/AllTransactionPage.jsx";

const AllTransaction = () => {
    return (
        <SideNavbar>
            <SupplierRoutingPage/>
            <AllTransactionPage/>
        </SideNavbar>
    );
};

export default AllTransaction;