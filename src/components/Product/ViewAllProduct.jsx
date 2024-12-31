import React from 'react';
import SideNavbar from "../../layout/SideNavbar.jsx";;
import ViewAllCategoryPage from "../../pages/Categoty/ViewAllCategoryPage.jsx";
import ProductRoutingPage from "./ProductRoutingPage.jsx";
import ViewAllProductPage from "../../pages/Product/ViewAllProcductPage.jsx";

const ViewAllProduct = () => {
    return (
        <SideNavbar>
            <ProductRoutingPage/>
            <ViewAllProductPage />
        </SideNavbar>
    );
};

export default ViewAllProduct;