import React from 'react';
import Directory from "../../pages/CommonDirectory/Directory.jsx";

const CategoryRoutingPage = () => {
   const data = [
       {
           to:'/category/addNew',
           text:'Add New'
       },
       {
           to:'/category/viewAll',
           text:'View All'
       },
   ]
    return (
        <div>
            <Directory pages={data}/>
        </div>
    );
};

export default CategoryRoutingPage;