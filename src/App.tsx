import React, { useState } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Footer from './components/Footer';
import Cart from './components/Cart';
import { Product } from './types';

function App() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => [...prevItems, { ...product, quantity: 1 }]);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header cartItemsCount={cartItems.length} toggleCart={toggleCart} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <ProductList addToCart={addToCart} />
      </main>
      <Cart isOpen={isCartOpen} toggleCart={toggleCart} cartItems={cartItems} />
      <Footer />
    </div>
  );
}

export default App;