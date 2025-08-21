import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Dashboard from './pages/admin/Dashboard';
import AddFruit from './pages/admin/AddFruit';
import ManageFruits from './pages/admin/ManageFruits';
import AuthRoute from './components/AuthRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={
              <AuthRoute adminOnly>
                <Dashboard />
              </AuthRoute>
            } />
            <Route path="/admin/add" element={
              <AuthRoute adminOnly>
                <AddFruit />
              </AuthRoute>
            } />
            <Route path="/admin/manage" element={
              <AuthRoute adminOnly>
                <ManageFruits />
              </AuthRoute>
            } />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;