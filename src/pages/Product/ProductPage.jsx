import React from 'react';
import SideNavbar from "../../layout/SideNavbar.jsx";
import ProductRoutingPage from "../../components/Product/ProductRoutingPage.jsx";

const ProductPage = () => {
    return (
        <SideNavbar>
            <ProductRoutingPage/>
        </SideNavbar>
    );
};

export default ProductPage;