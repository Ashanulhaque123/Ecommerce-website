import React, { useState } from 'react';
import { X, ShoppingBag, Clipboard } from 'lucide-react';
import { Product } from '../types';

interface CartProps {
  isOpen: boolean;
  toggleCart: () => void;
  cartItems: Product[];
}

const Cart: React.FC<CartProps> = ({ isOpen, toggleCart, cartItems }) => {
  const [secretCode, setSecretCode] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const totalPrice = cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);

  const generateSecretCode = () => {
    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
    const orderDetails = cartItems.map(item => `${item.name} - $${item.price.toFixed(2)} x ${item.quantity || 1}`).join('\n');
    const fullCode = `${code}\n\n${orderDetails}\n\nTotal: $${totalPrice.toFixed(2)}`;
    setSecretCode(fullCode);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(secretCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const placeOrder = () => {
    window.location.href = 'fb-messenger://share/?link=?app_id=184941580989360&text=HI%20%2C%20I%20wanna%20buy%20something!';
  };

  return (
    <div className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-50`}>
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Your Cart</h2>
          <button onClick={toggleCart} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="flex-grow overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex items-center mb-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">${item.price.toFixed(2)} x {item.quantity || 1}</p>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="p-4 border-t">
          <p className="text-xl font-semibold mb-4">Total: ${totalPrice.toFixed(2)}</p>
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-full w-full mb-2 hover:bg-blue-700 transition-colors"
            onClick={generateSecretCode}
          >
            Generate Secret Code
          </button>
          {secretCode && (
            <div className="mb-2">
              <textarea
                readOnly
                value={secretCode}
                className="w-full p-2 border rounded"
                rows={5}
              />
              <button
                className="mt-2 bg-gray-200 text-gray-800 py-1 px-2 rounded flex items-center justify-center w-full hover:bg-gray-300 transition-colors"
                onClick={copyToClipboard}
              >
                <Clipboard size={18} className="mr-2" />
                {isCopied ? 'Copied!' : 'Copy to Clipboard'}
              </button>
            </div>
          )}
          <button
            className="bg-green-600 text-white py-2 px-4 rounded-full flex items-center justify-center w-full hover:bg-green-700 transition-colors"
            onClick={placeOrder}
          >
            <ShoppingBag size={18} className="mr-2" />
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;