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

import { useEffect } from "react";
import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import PublicRoute from "./routes/PublicRoute";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
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

import Blogs from "./Page/Blog/Blogs";
import AddBlog from "./Page/Blog/AddBlog";
import PublicBlogs from "./Page/Blog/PublicBlogs";
import PublicBlogDetail from "./Page/Blog/PublicBlogDetail";
import EditBlog from "./Page/Blog/EditBlog";
import Contact from "./Contact/Contact";
import Terms from "./Legal/Terms";
import Privacy from "./Legal/Privacy";
import Refund from "./Legal/Refund";
import Disclaimer from "./Legal/Disclamer";

const PublicLayout = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

function Home() {
  return (
    <>
      <Hero />
      <Why />
      <Mission />
      {/* <Videostrip /> */}
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

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* User Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        
        <Route path="/blogs" element={<PublicBlogs />} />
        <Route path="/blogs/:slug" element={<PublicBlogDetail />} />
        
        <Route path="/contact" element={<Contact />} />
        
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/refund" element={<Refund />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        
        <Route path="/books" element={<Product />} />
        <Route path="/books/:id" element={<ProductDetail />} />
        
        <Route path="/cart" element={<Cart />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/orders/:orderId" element={<OrderDetail />} />
        <Route path="/order-success" element={<OrderSuccess />} />
      </Route>

      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
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
        <Route path="products/edit/:id" element={<EditProduct />} />
        <Route path="orders" element={<Orders />} />
        <Route path="orders/:orderId" element={<AdminOrderDetail />} />
        <Route path="categories" element={<Categories />} />
        <Route path="users" element={<Users />} />
        
        {/* Admin Blog Routes */}
        <Route path="blogs" element={<Blogs />} />
        <Route path="blogs/add" element={<AddBlog />} />
        <Route path="blogs/edit/:slug" element={<EditBlog />} />
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
        <Route path="library" element={<Library />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
