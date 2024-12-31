import React from 'react';
import SideNavbar from "../../layout/SideNavbar.jsx";
import PurchaseRoutingPage from "../../components/PurchaseItems/PurchaseRoutingPage.jsx";

const PurchaseItems = () => {
    return (
        <SideNavbar>
            <PurchaseRoutingPage/>
        </SideNavbar>
    );
};

export default PurchaseItems;