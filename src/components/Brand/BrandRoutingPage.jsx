import React from 'react';
import Directory from "../../pages/CommonDirectory/Directory.jsx";

const BrandRoutingPage = () => {
    const data = [
        {
            to:'/brand/addNew',
            text:'Add New'
        },
        {
            to:'/brand/viewAll',
            text:'View All'
        },
    ]
    return (
        <div>
            <Directory pages={data}/>
        </div>
    );
};

export default BrandRoutingPage;