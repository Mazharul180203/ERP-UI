import React from 'react';
import SideNavbar from "../../layout/SideNavbar.jsx";
import PurchaseRoutingPage from "./PurchaseRoutingPage.jsx";
import AllPurchasePage from "../../pages/PurchaseItems/AllPurchasePage.jsx";

const AllPurchase = () => {
    return (
        <SideNavbar>
            <PurchaseRoutingPage/>
            <AllPurchasePage/>
        </SideNavbar>
    );
};

export default AllPurchase;