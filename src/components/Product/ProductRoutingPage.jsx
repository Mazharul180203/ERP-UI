import React from 'react';
import Directory from "../../pages/CommonDirectory/Directory.jsx";

const ProductRoutingPage = () => {
    const data = [
        {
            to:'/product/addProduct',
            text:'Add Product'
        },
        {
            to:'/product/allProduct',
            text:'All Product'
        },
    ]
    return (
        <div>
            <Directory pages={data}/>
        </div>
    );
};

export default ProductRoutingPage;