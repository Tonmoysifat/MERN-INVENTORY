import React, {Fragment} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {getToken} from "./helper/SessoinHelper.js";
import DashboardPage from "./pages/dashboard/DashboardPage.jsx";
import ProfilePage from "./pages/user/ProfilePage.jsx";
import LoginPage from "./pages/user/LoginPage.jsx";
import RegistrationPage from "./pages/user/RegistrationPage.jsx";
import SendOtpPage from "./pages/user/SendOtpPage.jsx";
import VerifyOtpPage from "./pages/user/VerifyOtpPage.jsx";
import CreateNewPasswordPage from "./pages/user/CreateNewPasswordPage.jsx";
import {Toaster} from "react-hot-toast";
import BrandListPage from "./pages/brand/BrandListPage.jsx";
import CategoryListPage from "./pages/category/CategoryListPage.jsx";
import CustomerListPage from "./pages/customer/CustomerListPage.jsx";
import SupplierListPage from "./pages/supplier/SupplierListPage.jsx";
import PurchaseListPage from "./pages/purchase/PurchaseListPage.jsx";
import SaleListPage from "./pages/sale/SaleListPage.jsx";
import ReturnListPage from "./pages/return/ReturnListPage.jsx";
import ProductListPage from "./pages/product/ProductListPage.jsx";
import ExpenseListPage from "./pages/expense/ExpenseListPage.jsx";
import ExpenseTypeListPage from "./pages/expenseType/ExpenseTypeListPage.jsx";
import CustomerCreateUpdatePage from "./pages/customer/CustomerCreateUpdatePage.jsx";
import SupplierCreateUpdatePage from "./pages/supplier/SupplierCreateUpdatePage.jsx";
import ExpenseTypeCreateUpdatePage from "./pages/expenseType/ExpenseTypeCreateUpdatePage.jsx";
import ExpenseCreateUpdatePage from "./pages/expense/ExpenseCreateUpdatePage.jsx";


const App = () => {
    if (getToken()) {
        return (
            <Fragment>
                <Toaster position="top-center"/>
                <BrowserRouter>
                    <Routes>
                        <Route exact path="/" element={<DashboardPage/>}/>
                        <Route exact path="/profile" element={<ProfilePage/>}/>
                        <Route exact path="/brand-list" element={<BrandListPage/>}/>
                        <Route exact path="/category-list" element={<CategoryListPage/>}/>
                        <Route exact path="/customer-list" element={<CustomerListPage/>}/>
                        <Route exact path="/new-customer" element={<CustomerCreateUpdatePage/>}/>
                        <Route exact path="/edit-customer" element={<CustomerCreateUpdatePage/>}/>
                        <Route exact path="/supplier-list" element={<SupplierListPage/>}/>
                        <Route exact path="/new-supplier" element={<SupplierCreateUpdatePage/>}/>
                        <Route exact path="/edit-supplier" element={<SupplierCreateUpdatePage/>}/>
                        <Route exact path="/purchase-list" element={<PurchaseListPage/>}/>
                        <Route exact path="/sale-list" element={<SaleListPage/>}/>
                        <Route exact path="/return-list" element={<ReturnListPage/>}/>
                        <Route exact path="/product-list" element={<ProductListPage/>}/>
                        <Route exact path="/expense-list" element={<ExpenseListPage/>}/>
                        <Route exact path="/new-expense" element={<ExpenseCreateUpdatePage/>}/>
                        <Route exact path="/edit-expense" element={<ExpenseCreateUpdatePage/>}/>
                        <Route exact path="/expense-type-list" element={<ExpenseTypeListPage/>}/>
                        <Route exact path="/new-expense-type" element={<ExpenseTypeCreateUpdatePage/>}/>
                        <Route exact path="/edit-expense-type" element={<ExpenseTypeCreateUpdatePage/>}/>
                    </Routes>
                </BrowserRouter>
            </Fragment>
        );
    } else {
        return (
            <Fragment>
                <Toaster position="top-center"/>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Navigate to="/login" replace/>}/>
                        <Route exact path="/login" element={<LoginPage/>}/>
                        <Route exact path="/registration" element={<RegistrationPage/>}/>
                        <Route exact path="/send-otp" element={<SendOtpPage/>}/>
                        <Route exact path="/verify-otp" element={<VerifyOtpPage/>}/>
                        <Route exact path="/new-password" element={<CreateNewPasswordPage/>}/>
                    </Routes>
                </BrowserRouter>
            </Fragment>
        );
    }

};

export default App;