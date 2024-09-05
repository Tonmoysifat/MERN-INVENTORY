import {configureStore} from "@reduxjs/toolkit";
import userReducer from "../sate-slice/User-slice.js";
import settingReducer from "../sate-slice/Setting-slice.js";
import brandReducer from "../sate-slice/Brand-slice.js";
import categoryReducer from "../sate-slice/Category-slice.js";
import customerReducer from "../sate-slice/Customer-slice.js";
import expenseReducer from "../sate-slice/Expense-slice.js";
import expenseTypeReducer from "../sate-slice/ExpenseType-slice.js";
import productReducer from "../sate-slice/Product-slice.js";
import purchaseReducer from "../sate-slice/Purchase-slice.js";
import returnReducer from "../sate-slice/Return-slice.js";
import saleReducer from "../sate-slice/Sale-slice.js";
import supplierReducer from "../sate-slice/Supplier-slice.js";
import reportReducer from "../sate-slice/Report-slice.js";
import summaryReducer from "../sate-slice/Summary-slice.js";

export default configureStore({
    reducer: {
        user: userReducer,
        setting: settingReducer,
        brand: brandReducer,
        category: categoryReducer,
        customer: customerReducer,
        expense: expenseReducer,
        expenseType: expenseTypeReducer,
        product: productReducer,
        purchase: purchaseReducer,
        return: returnReducer,
        sale: saleReducer,
        supplier: supplierReducer,
        report: reportReducer,
        summary: summaryReducer
    }
})