import React from 'react';
import Directory from "../../pages/CommonDirectory/Directory.jsx";

const CustomerRoutingPage = () => {
    const data = [
        {
            to:'/customer/addType',
            text:'Add Type'
        },
        {
            to:'/customer/addNew',
            text:'Add New'
        },
        {
            to:'/customer/viewAll',
            text:'View All'
        },
    ]
    return (
        <div>
            <Directory pages={data}/>
        </div>
    );
};

export default CustomerRoutingPage;