const express = require("express")
const UserController = require("../controllers/user/UserController");
const AuthVerification = require("../Middlewares/AuthVerification")
const BrandsController = require("../controllers/brands/BrandsController");
const CreateCategory = require("../controllers/categories/CategoryController");
const CustomerController = require("../controllers/customers/CustomerController");
const SupplierController = require("../controllers/suppliers/SupplierController");
const ExpenseTypeController = require("../controllers/expenses/ExpenseTypeController");
const ExpenseController = require("../controllers/expenses/ExpenseController");
const ProductsController = require("../controllers/products/ProductsController");
const PurchaseController = require("../controllers/purchases/PurchaseController");
const SaleController = require("../controllers/sales/SaleController");
const ReturnController = require("../controllers/returns/ReturnController");
const ReportController = require("../controllers/report/ReportController");
const SummaryController = require("../controllers/summary/SummaryController");
const router = express.Router();

// User Profile
router.post("/Registration", UserController.Registration)
router.get("/ProfileDetails", AuthVerification, UserController.ProfileDetails)
router.post("/Login", UserController.Login)
router.get("/Logout",AuthVerification, UserController.Logout)
router.post("/RecoverResetPass", UserController.RecoverResetPass)
router.post("/ProfileUpdate", AuthVerification, UserController.ProfileUpdate)
router.get("/RecoverVerifyEmail/:email", UserController.RecoverVerifyEmail)
router.get("/RecoverVerifyOTP/:email/:otp", UserController.RecoverVerifyOTP)

// Brands
router.post("/CreateBrand", AuthVerification, BrandsController.CreateBrand)
router.post("/UpdateBrand/:id", AuthVerification, BrandsController.UpdateBrand)
router.get("/BrandList/:pageNo/:perPage/:searchKeyword", AuthVerification, BrandsController.BrandList)
router.get("/BrandDropDown", AuthVerification, BrandsController.BrandDropDown)
router.get("/DeleteBrand/:id", AuthVerification, BrandsController.DeleteBrand)
router.get("/BrandDetailsById/:id", AuthVerification, BrandsController.BrandDetailsById)

// Categories
router.post("/CreateCategory", AuthVerification, CreateCategory.CreateCategory)
router.post("/UpdateCategory/:id", AuthVerification, CreateCategory.UpdateCategory)
router.get("/CategoryList/:pageNo/:perPage/:searchKeyword", AuthVerification, CreateCategory.CategoryList)
router.get("/CategoryDropDown", AuthVerification, CreateCategory.CategoryDropDown)
router.get("/DeleteCategory/:id", AuthVerification, CreateCategory.DeleteCategory)
router.get("/CategoryDetailsById/:id", AuthVerification, CreateCategory.CategoryDetailsById)

// Customers
router.post("/CreateCustomer", AuthVerification, CustomerController.CreateCustomer)
router.post("/UpdateCustomer/:id", AuthVerification, CustomerController.UpdateCustomer)
router.get("/CustomerList/:pageNo/:perPage/:searchKeyword", AuthVerification, CustomerController.CustomerList)
router.get("/CustomerDropDown", AuthVerification, CustomerController.CustomerDropDown)
router.get("/DeleteCustomer/:id", AuthVerification, CustomerController.DeleteCustomer)
router.get("/CustomerDetailsById/:id", AuthVerification, CustomerController.CustomerDetailsById)

// Suppliers
router.post("/CreateSupplier", AuthVerification, SupplierController.CreateSupplier)
router.post("/UpdateSupplier/:id", AuthVerification, SupplierController.UpdateSupplier)
router.get("/SupplierList/:pageNo/:perPage/:searchKeyword", AuthVerification, SupplierController.SupplierList)
router.get("/SupplierDropDown", AuthVerification, SupplierController.SupplierDropDown)
router.get("/DeleteSupplier/:id", AuthVerification, SupplierController.DeleteSupplier)
router.get("/SupplierDetailsById/:id", AuthVerification, SupplierController.SupplierDetailsById)

// ExpensesType
router.post("/CreateExpenseType", AuthVerification, ExpenseTypeController.CreateExpenseType)
router.post("/UpdateExpenseType/:id", AuthVerification, ExpenseTypeController.UpdateExpenseType)
router.get("/ExpenseTypeList/:pageNo/:perPage/:searchKeyword", AuthVerification, ExpenseTypeController.ExpenseTypeList)
router.get("/DeleteExpenseType/:id", AuthVerification, ExpenseTypeController.DeleteExpenseType)
router.get("/ExpenseTypeDetailsById/:id", AuthVerification, ExpenseTypeController.ExpenseTypeDetailsById)
router.get("/ExpenseTypeDropDown", AuthVerification, ExpenseTypeController.ExpenseTypeDropDown)


// Expenses
router.post("/CreateExpense", AuthVerification, ExpenseController.CreateExpense)
router.post("/UpdateExpense/:id", AuthVerification, ExpenseController.UpdateExpense)
router.get("/ExpenseList/:pageNo/:perPage/:searchKeyword", AuthVerification, ExpenseController.ExpenseList)
router.get("/DeleteExpense/:id", AuthVerification, ExpenseController.DeleteExpense)
router.get("/ExpenseDetailsById/:id", AuthVerification, ExpenseController.ExpenseDetailsById)

// Products
router.post("/CreateProduct", AuthVerification, ProductsController.CreateProduct)
router.post("/UpdateProduct/:id", AuthVerification, ProductsController.UpdateProduct)
router.get("/ProductList/:pageNo/:perPage/:searchKeyword", AuthVerification, ProductsController.ProductList)
router.get("/DeleteProduct/:id", AuthVerification, ProductsController.DeleteProduct)
router.get("/ProductDetailsById/:id", AuthVerification, ProductsController.ProductDetailsById)
router.get("/ProductDropDown", AuthVerification, ProductsController.ProductDropDown)

// Purchase
router.post("/CreatePurchase", AuthVerification, PurchaseController.CreatePurchase)
router.get("/PurchaseList/:pageNo/:perPage/:searchKeyword", AuthVerification, PurchaseController.PurchaseList)
router.delete("/PurchaseDelete/:id", AuthVerification, PurchaseController.PurchaseDelete)

// Sale
router.post("/CreateSale", AuthVerification, SaleController.CreateSale)
router.get("/SaleList/:pageNo/:perPage/:searchKeyword", AuthVerification, SaleController.SaleList)
router.get("/SaleDelete/:id", AuthVerification, SaleController.SaleDelete)

// Return
router.post("/CreateReturn", AuthVerification, ReturnController.CreateReturn)
router.get("/ReturnList/:pageNo/:perPage/:searchKeyword", AuthVerification, ReturnController.ReturnList)
router.get("/ReturnDelete/:id", AuthVerification, ReturnController.ReturnDelete)

// Report
router.post("/ExpenseByDate", AuthVerification, ReportController.ExpenseByDate)
router.post("/PurchaseByDate", AuthVerification, ReportController.PurchaseByDate)
router.post("/SaleByDate", AuthVerification, ReportController.SaleByDate)
router.post("/ReturnByDate", AuthVerification, ReportController.ReturnByDate)

// Summary
router.get("/ExpenseSummary", AuthVerification, SummaryController.ExpenseSummary)
router.get("/PurchaseSummary", AuthVerification, SummaryController.PurchaseSummary)
router.get("/SaleSummary", AuthVerification, SummaryController.SaleSummary)
router.get("/ReturnSummary", AuthVerification, SummaryController.ReturnSummary)

module.exports = router;