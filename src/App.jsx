// import { Routes, Route } from "react-router-dom";

// import Header from "./Header/Header";
// import Hero from "./Hero/Hero";
// import Why from "./Why/Why";
// import Mission from "./Mission/Mission";
// import Videostrip from "./Videosection/Videosection";
// import PremiumStrip from "./PremiumStrip/PremiumStrip";
// import Faq from "./Faq/Faq";
// import About from "./About/About";
// import Founder from "./Founder/Founder";
// import Login from "./Page/Login";
// import Register from "./Page/Register";
// import Product from "./Page/Product/Product";
// import Checkout from "./Page/Checkout/Checkout";
// import MyOrders from "./Page/Orders/MyOrders";
// import Cart from "./Page/Cart/Cart";
// import OrderDetail from "./Page/Orders/OrderDetail";
// import OrderSuccess from "./Page/Success/OrderSuccess";
// import AdminRoute from "./Page/Admin/components/AdminRoute";
// import AdminLayout from "./Page/layouts/AdminLayout";
// import Dashboard from "./Page/Admin/Dashboard";

// function Home() {
//   return (
//     <>
//       <Hero />
//       <Why />
//       <Mission />
//       <Videostrip />
//       <PremiumStrip />
//       <Faq />
//     </>
//   );
// }

// // About page + Founder section
// function AboutPage() {
//   return (
//     <>
//       <About />
//       <Founder />
//     </>
//   );
// }

// function App() {
//   return (
//     <>
//       <Header />

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<AboutPage />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/products" element={<Product />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/checkout" element={<Checkout />} />
//         <Route path="/my-orders" element={<MyOrders />} />
//         <Route path="/orders/:orderId" element={<OrderDetail />} />
//         <Route
//           path="/order-success"
//           element={<OrderSuccess />}
//         />
//       </Routes>
//     </>
//   );
// }

// export default App;

import { Routes, Route } from "react-router-dom";

import Header from "./Header/Header";
import Hero from "./Hero/Hero";
import Why from "./Why/Why";
import Mission from "./Mission/Mission";
import Videostrip from "./Videosection/Videosection";
import PremiumStrip from "./PremiumStrip/PremiumStrip";
import Faq from "./Faq/Faq";
import About from "./About/About";
import Founder from "./Founder/Founder";

import Login from "./Page/Login";
import Register from "./Page/Register";

import Product from "./Page/Product/Product";
import Cart from "./Page/Cart/Cart";
import Checkout from "./Page/Checkout/Checkout";
import CheckoutRoute from "./routes/CheckoutRoute";

import MyOrders from "./Page/Orders/MyOrders";
import OrderDetail from "./Page/Orders/OrderDetail";
import OrderSuccess from "./Page/Success/OrderSuccess";

import AdminRoute from "./Page/Admin/components/AdminRoute";
import AdminLayout from "./Page/layouts/AdminLayout";

import Dashboard from "./Page/Admin/Dashboard";

import Products from "./Page/Admin/Products";
import ProductDetail from "./Page/Product/Productdetail";

import Orders from "./Page/Admin/Orders";
// import Categories from "./Page/Admin/Categories";
// import Coupons from "./Page/Admin/Coupons";
// import Users from "./Page/Admin/Users";
import AdminOrderDetail from "./Page/Admin/OrderDetail";
import AddProduct from "./Page/Admin/AddProduct";
import Categories from "./Page/Admin/Categories";
import Users from "./Page/Admin/Users";

import UserRoute from "./routes/UserRoute";

import AccountLayout from "./Page/account/components/AccountLayout";

import AccountDashboard from "./Page/account/Dashboard";
import Profile from "./Page/account/Profile";
import AccountOrders from "./Page/account/Orders";
import AccountOrderDetail from "./Page/account/OrderDetail";
import EditProduct from "./Page/Admin/EditProduct";
import Library from "./Page/account/Library";

function Home() {
  return (
    <>
      <Hero />
      <Why />
      <Mission />
      <Videostrip />
      <PremiumStrip />
      <Faq />
    </>
  );
}

function AboutPage() {
  return (
    <>
      <About />
      <Founder />
    </>
  );
}

function App() {
  return (
    <Routes>
      {/* User Routes */}

      <Route
        path="/"
        element={
          <>
            <Header />
            <Home />
          </>
        }
      />

      <Route
        path="/about"
        element={
          <>
            <Header />
            <AboutPage />
          </>
        }
      />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/products"
        element={
          <>
            <Header />
            <Product />
          </>
        }
      />
      <Route
        path="/products/:id"
        element={
          <>
            <Header />
            <ProductDetail />
          </>
        }
      />

      <Route
        path="/cart"
        element={
          <>
            <Header />
            <Cart />
          </>
        }
      />

      <Route
        path="/checkout"
        element={
          <CheckoutRoute>
            <Checkout />
          </CheckoutRoute>
        }
      />

      <Route
        path="/my-orders"
        element={
          <>
            <Header />
            <MyOrders />
          </>
        }
      />

      <Route
        path="/orders/:orderId"
        element={
          <>
            <Header />
            <OrderDetail />
          </>
        }
      />

      <Route
        path="/order-success"
        element={
          <>
            <Header />
            <OrderSuccess />
          </>
        }
      />

      <Route
    path="/account/library"
    element={<Library />}
/>

      {/* Admin Routes */}

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<Dashboard />} />

        <Route path="products" element={<Products />} />

        <Route path="products/add" element={<AddProduct />} />
        <Route
          path="products/edit/:id"
          element={<EditProduct />}
        />
        <Route path="orders" element={<Orders />} />
        <Route path="orders/:orderId" element={<AdminOrderDetail />} />

        <Route path="categories" element={<Categories />} />
        <Route path="users" element={<Users />} />
      </Route>

      {/* user Routes */}

      <Route
        path="/account"
        element={
          <UserRoute>
            <AccountLayout />
          </UserRoute>
        }
      >
        <Route index element={<AccountDashboard />} />

        <Route path="profile" element={<Profile />} />

        <Route path="orders" element={<AccountOrders />} />

        <Route path="orders/:orderId" element={<AccountOrderDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
