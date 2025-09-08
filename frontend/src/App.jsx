import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/user/Login.jsx';
import SignUp from './pages/user/SignUp.jsx';
import Home from './pages/user/home.jsx';
import AllProductsPage from './pages/user/AllProduct.jsx';
import ProductDetail from './pages/user/ProductDetail.jsx';
import Cart from './pages/user/Cart.jsx';

// Admin imports
import AdminLayout from './pages/admin/layout/AdminLayout.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';
import Products from './pages/admin/Products.jsx';
import AddProduct from './pages/admin/AddProduct.jsx';
import Orders from './pages/admin/Orders.jsx';
import Customers from './pages/admin/Customers.jsx';
import Reports from './pages/admin/Reports.jsx';
import Settings from './pages/admin/Settings.jsx';
import Categories from './pages/admin/Categories.jsx';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path='/allProduct' element={<AllProductsPage/>}/>
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="products/new" element={<AddProduct />} />
          <Route path="categories" element={<Categories />} />
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<Customers />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes> 
  );
}

export default App;
