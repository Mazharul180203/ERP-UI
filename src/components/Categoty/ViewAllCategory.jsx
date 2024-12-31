import React from 'react';
import SideNavbar from "../../layout/SideNavbar.jsx";
import CategoryRoutingPage from "./CategoryRoutingPage.jsx";
import ViewAllCategoryPage from "../../pages/Categoty/ViewAllCategoryPage.jsx";

const ViewAllCategory = () => {
    return (
        <SideNavbar>
            <CategoryRoutingPage/>
            <ViewAllCategoryPage/>
        </SideNavbar>
    );
};

export default ViewAllCategory;