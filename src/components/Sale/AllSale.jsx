import React from 'react';
import SideNavbar from "../../layout/SideNavbar.jsx";
import SaleRoutingPage from "./SaleRoutingPage.jsx";
import AllSalePage from "../../pages/Sale/AllSalePage.jsx";

const AllSale = () => {
    return (
        <SideNavbar>
            <SaleRoutingPage/>
            <AllSalePage/>
        </SideNavbar>
    );
};

export default AllSale;
