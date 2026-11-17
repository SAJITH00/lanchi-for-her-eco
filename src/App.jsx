import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CategoryPage from './pages/CategoryPage';
import ModelsPage from './pages/ModelsPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="product" element={<ProductPage />} />
            <Route path="category" element={<CategoryPage />} />
            <Route path="models" element={<ModelsPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="wishlist" element={<WishlistPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}
