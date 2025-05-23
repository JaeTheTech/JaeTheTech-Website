import { usePerformanceOptimizations } from '../components/Performance';
import { CartProvider } from '../context/CartContext';

function MyApp({ Component, pageProps }) {
  usePerformanceOptimizations();

  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  );
}

export default MyApp;