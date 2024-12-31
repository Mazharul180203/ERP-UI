import React from 'react';
import SideNavbar from "../../layout/SideNavbar.jsx";
import AddNewCategoryPage from "../../pages/Categoty/AddNewCategoryPage.jsx";
import CategoryRoutingPage from "./CategoryRoutingPage.jsx";


const AddNewCategory = () => {
    return (
        <SideNavbar>
            <CategoryRoutingPage/>
            <AddNewCategoryPage/>
        </SideNavbar>
    );
};

export default AddNewCategory;