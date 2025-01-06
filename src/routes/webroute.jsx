import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import SignupPage from "../pages/Autentication/SignupPage.jsx";
import SignInPage from "../pages/Autentication/SignInPage.jsx";
import DashboardPage from "../pages/Dashboard/DashboardPage.jsx";
import ValidationHelper from "../utilitiy/ValidationUtlity.js";
import AddNewCategory from "../components/Categoty/AddNewCategory.jsx";
import ViewAllCategory from "../components/Categoty/ViewAllCategory.jsx";
import CategoryPage from "../pages/Categoty/CategoryPage.jsx";
import BrandPage from "../pages/Brand/BrandPage.jsx";
import AddNewBrand from "../components/Brand/AddNewBrand.jsx";
import ViewAllBrand from "../components/Brand/ViewAllBrand.jsx";
import ProductPage from "../pages/Product/ProductPage.jsx";
import AddNewProduct from "../components/Product/AddNewProduct.jsx";
import ViewAllProduct from "../components/Product/ViewAllProduct.jsx";
import SupplierPage from "../pages/Supplier/SupplierPage.jsx";
import AddSupplier from "../components/Suppier/AddSupplier.jsx";
import AllSupplier from "../components/Suppier/AllSupplier.jsx";
import AddTransaction from "../components/Suppier/AddTransaction.jsx";
import AllTransaction from "../components/Suppier/AllTransaction.jsx";
import PurchaseItems from "../pages/PurchaseItems/PurchaseItems.jsx";
import AddNewPurchase from "../components/PurchaseItems/AddNewPurchase.jsx";
import AllPurchase from "../components/PurchaseItems/AllPurchase.jsx";
import CustomerPage from "../pages/Customer/CustomerPage.jsx";
import AddCustomerType from "../components/Customer/AddCustomerType.jsx";
import AddNewCustomer from "../components/Customer/AddNewCustomer.jsx";
import ViewAllCustomer from "../components/Customer/ViewAllCustomer.jsx";
import SaleItemsPage from "../pages/Sale/SaleItemsPage.jsx";
import AddNewSale from "../components/Sale/AddNewSale.jsx";
import AllSale from "../components/Sale/AllSale.jsx";
import SalePayment from "../components/Sale/SalePayment.jsx";


const Webroute = () => {
    if(!ValidationHelper.isLogin()){
        return(
            <BrowserRouter >
                <Routes>
                    <Route path="/" element={<SignInPage/>}/>
                    <Route path="/signup" element={<SignupPage/>}/>
                </Routes>
            </BrowserRouter>
        );

    }else {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<DashboardPage/>}/>
                    <Route path="/category" element={<CategoryPage/>}/>
                    <Route path="/category/addNew" element={<AddNewCategory/>}/>
                    <Route path="/category/viewAll" element={<ViewAllCategory/>}/>
                    <Route path="/brand" element={<BrandPage/>}/>
                    <Route path="/brand/addNew" element={<AddNewBrand/>}/>
                    <Route path="/brand/viewAll" element={<ViewAllBrand/>}/>
                    <Route path="/product" element={<ProductPage/>}/>
                    <Route path="/product/addProduct" element={<AddNewProduct/>}/>
                    <Route path="/product/allProduct" element={<ViewAllProduct/>}/>
                    <Route path="/supplier" element={<SupplierPage/>}/>
                    <Route path="/supplier/addSupplier" element={<AddSupplier/>}/>
                    <Route path="/supplier/allSupplier" element={<AllSupplier/>}/>
                    <Route path="/supplier/addTransaction" element={<AddTransaction/>}/>
                    <Route path="/supplier/allTransaction" element={<AllTransaction/>}/>
                    <Route path="/purchaseitems" element={<PurchaseItems/>}/>
                    <Route path="/purchaseitems/newPurchase" element={<AddNewPurchase/>}/>
                    <Route path="/purchaseitems/allPurchase" element={<AllPurchase/>}/>
                    <Route path="/customer" element={<CustomerPage/>}/>
                    <Route path="/customer/addType" element={<AddCustomerType/>}/>
                    <Route path="/customer/addNew" element={<AddNewCustomer/>}/>
                    <Route path="/customer/viewAll" element={<ViewAllCustomer/>}/>
                    <Route path="/sale" element={<SaleItemsPage/>}/>
                    <Route path="/sale/addSale" element={<AddNewSale/>}/>
                    <Route path="/sale/allSale" element={<AllSale/>}/>
                    <Route path="/sale/payment" element={<SalePayment/>}/>
                </Routes>
            </BrowserRouter>
        )
    }
};

export default Webroute;