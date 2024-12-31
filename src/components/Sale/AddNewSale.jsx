import React from 'react';
import SideNavbar from "../../layout/SideNavbar.jsx";
import SaleRoutingPage from "./SaleRoutingPage.jsx";
import AddNewSalePage from "../../pages/Sale/AddNewSalePage.jsx";

const AddNewSale = () => {
    return (
        <SideNavbar>
            <SaleRoutingPage/>
            <AddNewSalePage/>
        </SideNavbar>
    );
};

export default AddNewSale;