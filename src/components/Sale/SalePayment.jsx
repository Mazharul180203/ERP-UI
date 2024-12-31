import React from 'react';
import SideNavbar from "../../layout/SideNavbar.jsx";
import SaleRoutingPage from "./SaleRoutingPage.jsx";
import SalePaymentPage from "../../pages/Sale/SalePaymentPage.jsx";

const SalePayment = () => {
    return (
        <SideNavbar>
            <SaleRoutingPage/>
            <SalePaymentPage/>
        </SideNavbar>
    );
};

export default SalePayment;