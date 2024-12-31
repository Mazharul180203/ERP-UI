import React from 'react';
import SideNavbar from "../../layout/SideNavbar.jsx";
import SupplierRoutingPage from "./SupplierRoutingPage.jsx";
import AddTransactionPage from "../../pages/Supplier/AddTransactionPage.jsx";

const AddTransaction = () => {
    return (
        <SideNavbar>
            <SupplierRoutingPage/>
            <AddTransactionPage/>
        </SideNavbar>
    );
};

export default AddTransaction;