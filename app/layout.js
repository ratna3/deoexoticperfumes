import './globals.css';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartProvider } from './context/CartContext';
import { Toast } from './components/Toast';

export const metadata = {
  metadataBase: new URL('https://deoexoticperfumes.vercel.app'),
  title: 'Deo Exotic Attar & Perfume — Handcrafted Luxury Fragrances',
  description: 'Discover handcrafted attars, exotic perfumes, bakhoor, and dhoop cones from Deo Exotic. Ancient artistry meets modern luxury in every bottle.',
  keywords: 'attar, perfume, exotic fragrance, bakhoor, dhoop cones, luxury perfume, handcrafted fragrance, Indian attar, Kannauj attar',
  openGraph: {
    title: 'Deo Exotic Attar & Perfume',
    description: 'Handcrafted luxury fragrances — attars, perfumes, bakhoor & dhoop cones.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/favicon-logo.jpg" />
      </head>
      <body>
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Toast />
        </CartProvider>
      </body>
    </html>
  );
}
