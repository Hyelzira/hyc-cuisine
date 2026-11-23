import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CartDrawer } from './cart/CartDrawer';
import { ScrollToTop } from './ScrollToTop';

export function PageLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-ink">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}