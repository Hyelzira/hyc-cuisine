import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/context/AuthContext';
import { CartProvider } from './components/context/CartContext';
import { ToastProvider } from './components/context/ToastContext';
import { PageLayout } from './components/layout/PageLayout';

import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { DiningPage } from './pages/DiningPage';
import { AboutPage } from './pages/AboutPage';
import { ReservationPage } from './pages/ReservationPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <Routes>
            {/* Pages wrapped in the shared Navbar + Footer shell */}
            <Route element={<PageLayout />}>
              <Route index element={<HomePage />} />
              <Route path="menu" element={<MenuPage />} />
              <Route path="dining" element={<DiningPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="reservation" element={<ReservationPage />} />
              <Route path="checkout" element={<CheckoutPage />} />
              <Route path="order/success" element={<OrderSuccessPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  );
}