import React from 'react';
import SideNavbar from "../../layout/SideNavbar.jsx";
import SupplierRoutingPage from "./SupplierRoutingPage.jsx";
import AddSupplierPage from "../../pages/Supplier/AddSupplierPage.jsx";

const AddSupplier = () => {
    return (
        <SideNavbar>
            <SupplierRoutingPage/>
            <AddSupplierPage/>
        </SideNavbar>
    );
};

export default AddSupplier;