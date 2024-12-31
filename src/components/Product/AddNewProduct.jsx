import React from 'react';
import SideNavbar from "../../layout/SideNavbar.jsx";
import ProductRoutingPage from "./ProductRoutingPage.jsx";
import AddNewProductPage from "../../pages/Product/AddNewProductPage.jsx";


const AddNewCategory = () => {
    return (
        <SideNavbar>
            <ProductRoutingPage/>
            <AddNewProductPage/>
        </SideNavbar>
    );
};

export default AddNewCategory;