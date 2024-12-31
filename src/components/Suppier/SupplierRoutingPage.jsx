import React from 'react';
import Directory from "../../pages/CommonDirectory/Directory.jsx";

const SupplierRoutingPage = () => {
    const data = [
        {
            to:'/supplier/addSupplier',
            text:'Add Supplier'
        },
        {
            to:'/supplier/allSupplier',
            text:'All Supplier'
        },
        {
            to:'/supplier/addTransaction',
            text:'Add Transaction'
        },
        {
            to:'/supplier/allTransaction',
            text:'All Transaction'
        },
    ]
    return (
        <div>
            <Directory pages={data}/>
        </div>
    );
};

export default SupplierRoutingPage;