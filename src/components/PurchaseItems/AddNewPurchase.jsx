import React from 'react';
import SideNavbar from "../../layout/SideNavbar.jsx";
import PurchaseRoutingPage from "./PurchaseRoutingPage.jsx";
import AddNewPurchasePage from "../../pages/PurchaseItems/AddNewPurchasePage.jsx";

const AddNewPurchase = () => {
    return (
        <SideNavbar>
            <PurchaseRoutingPage/>
            <AddNewPurchasePage/>
        </SideNavbar>
    );
};

export default AddNewPurchase;