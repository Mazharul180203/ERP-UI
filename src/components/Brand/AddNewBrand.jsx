import React from 'react';
import SideNavbar from "../../layout/SideNavbar.jsx";
import BrandRoutingPage from "./BrandRoutingPage.jsx";
import AddNewBrandPage from "../../pages/Brand/AddNewBrandPage.jsx";


const AddNewCategory = () => {
    return (
        <SideNavbar>
            <BrandRoutingPage/>
            <AddNewBrandPage/>
        </SideNavbar>
    );
};

export default AddNewCategory;