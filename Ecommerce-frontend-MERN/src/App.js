import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminDashboard from "./components/Admin/AdminDashboard";
import ManageCoupons from "./components/Admin/Coupons/ManageCoupons";
import AddCoupon from "./components/Admin/Coupons/AddCoupon";
import Login from "./components/Users/Forms/Login";
import AddProduct from "./components/Admin/Products/AddProduct";
import RegisterForm from "./components/Users/Forms/RegisterForm";
import HomePage from "./components/HomePage/HomePage";
import Navbar from "./components/Navbar/Navbar";
import OrderHistory from "./components/Admin/Orders/ManageOrders";
import OrderPayment from "./components/Users/Products/OrderPayment";
import ManageCategories from "./components/Admin/Categories/ManageCategories";
import UpdateProduct from "./components/Admin/Products/UpdateProduct";
import ManageStocks from "./components/Admin/Products/ManageStocks";
import CategoryToAdd from "./components/Admin/Categories/CategoryToAdd";
import AddCategory from "./components/Admin/Categories/AddCategory";
import AddBrand from "./components/Admin/Categories/AddBrand";
import AddColor from "./components/Admin/Categories/AddColor";
import AllCategories from "./components/HomePage/AllCategories";
import UpdateCoupon from "./components/Admin/Coupons/UpdateCoupon";
import Product from "./components/Users/Products/Product";
import ShoppingCart from "./components/Users/Products/ShoppingCart";
import ProductsFilters from "./components/Users/Products/ProductsFilters";
import CustomerProfile from "./components/Users/Profile/CustomerProfile";
import AddReview from "./components/Users/Reviews/AddReview";
import UpdateCategory from "./components/Admin/Categories/UpdateCategory";
import ThanksForOrdering from "./components/Users/Products/ThanksForOrdering.js";
import OrdersList from "./components/Admin/Orders/OdersList";
import ManageOrders from "./components/Admin/Orders/ManageOrders";
import Customers from "./components/Admin/Customers/Customers";
import BrandsColorsList from "./components/Admin/Categories/BrandsColorsList";
import AuthRoute from "./components/AuthRoute/AuthRoute.js";
import AdminRoute from "./components/AuthRoute/AdminRoute.js";
import UpdateOrders from "./components/Admin/Orders/UpdateOrders.js";
import UpdateBrand from "./components/Admin/Categories/UpdateBrand.js";
import ColourList from "./components/Admin/Categories/ColourList.js";


const App = () => {
    
  return (
    <BrowserRouter>
      <Navbar />
      {/* hide navbar if admin */}
      <Routes>
        {/* nested route */}
        <Route path="admin" element={
            <AdminRoute>
              <AdminDashboard/>
            </AdminRoute>
        }>
        {/* products */} <Route path="" element={<AdminRoute><OrdersList /></AdminRoute>} />
          <Route path="add-product" element={<AdminRoute><AddProduct /></AdminRoute>} />
          <Route path="manage-products" element={<AdminRoute><ManageStocks /></AdminRoute>} />
          <Route path="products/edit/:id" element={<AdminRoute><UpdateProduct /></AdminRoute>} />
        {/* coupons */}
          <Route path="add-coupon" element={<AdminRoute><AddCoupon /></AdminRoute>} />
          <Route path="manage-coupon" element={<ManageCoupons />} />
          <Route path="manage-coupon/edit/:code" element={<AdminRoute><UpdateCoupon /></AdminRoute>} />
        {/* Category */}
          <Route path="category-to-add" element={<AdminRoute><CategoryToAdd /></AdminRoute>} />
          <Route path="add-category" element={<AdminRoute><AddCategory /></AdminRoute>} />
          <Route path="manage-category" element={<AdminRoute><ManageCategories /></AdminRoute>} />
          <Route path="edit-category/:id" element={<AdminRoute><UpdateCategory /></AdminRoute>} />
        {/* brand category */}
          <Route path="add-brand" element={<AdminRoute><AddBrand /></AdminRoute>} />
          <Route path="all-brands" element={<BrandsColorsList />} />
          <Route path="brand/update/:id" element={<AdminRoute><UpdateBrand /></AdminRoute>} />
        {/* color category */}
          <Route path="add-color" element={<AdminRoute><AddColor /></AdminRoute>} />
          <Route path="all-colors" element={<ColourList />} />
        {/* Orders */}
          <Route path="manage-orders" element={<ManageOrders />} />
          <Route path="orders/:id" element={<AdminRoute><UpdateOrders /></AdminRoute>} />
          <Route path="customers" element={<AdminRoute><Customers /></AdminRoute>} />
        </Route>


        
        {/* public links */}
        {/* Products */}
        <Route path="/" element={<HomePage />} />
        <Route path="/products-filters" element={<ProductsFilters />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/all-categories" element={<AllCategories />} />
        <Route path="success" element={<AuthRoute><ThanksForOrdering /></AuthRoute>} />
        {/* review */}
        <Route path="/add-review/:id" element={<AuthRoute><AddReview /></AuthRoute>} />

        {/* shopping cart */}
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        
        <Route path="/order-payment" element={
         <AuthRoute>
        <OrderPayment />
        </AuthRoute>
        } />
        
        {/* users */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/customer-profile" element={<AuthRoute><CustomerProfile /></AuthRoute>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
