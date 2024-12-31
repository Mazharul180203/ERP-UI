import React from 'react';
import SideNavbar from "../../layout/SideNavbar.jsx";
import ViewAllBrandPage from "../../pages/Brand/ViewAllBrandPage.jsx";
import BrandRoutingPage from "./BrandRoutingPage.jsx";

const ViewAllCategory = () => {
    return (
        <SideNavbar>
            <BrandRoutingPage/>
            <ViewAllBrandPage/>
        </SideNavbar>
    );
};

export default ViewAllCategory;