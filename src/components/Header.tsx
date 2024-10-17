import React from 'react';
import { ShoppingCart, Search } from 'lucide-react';

interface HeaderProps {
  cartItemsCount: number;
  toggleCart: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemsCount, toggleCart }) => {
  return (
    <header className="bg-blue-600 text-white p-4 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">E-Shop</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="py-1 px-3 rounded-full text-gray-800 focus:outline-none"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
          <button className="flex items-center" onClick={toggleCart}>
            <ShoppingCart size={24} />
            <span className="ml-2">Cart ({cartItemsCount})</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;