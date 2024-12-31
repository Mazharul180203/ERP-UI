import React from 'react';
import SupplierRoutingPage from "./SupplierRoutingPage.jsx";
import SideNavbar from "../../layout/SideNavbar.jsx";
import ViewAllSupplierPage from "../../pages/Supplier/ViewAllSupplierPage.jsx";

const AllSupplier = () => {
    return (
        <SideNavbar>
            <SupplierRoutingPage/>
            <ViewAllSupplierPage/>
        </SideNavbar>
    );
};

export default AllSupplier;