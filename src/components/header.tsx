"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

interface HeaderProps {
  isActive?: boolean;
}

interface Product {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
}

const Header: React.FC<HeaderProps> = ({ isActive }) => {
  const scrollPosition = useScrollPosition();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [showBagDetails, setShowBagDetails] = useState(false);
  const [cart, setCart] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    if (isActive === true) {
      if (scrollPosition > 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    } else if (isActive === false) {
      setIsVisible(true);
    }
  }, [scrollPosition, isActive]);

  useEffect(() => {
    // Load cart from localStorage on component mount
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage whenever cart state changes
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/login");
  };

  const handleBagClick = () => {
    setShowBagDetails(!showBagDetails);
  };

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const headerClassName = `sticky top-0 z-50 transition-all ${
    isVisible
      ? "opacity-100 translate-y-0 shadow bg-white backdrop-filter"
      : "opacity-0 -translate-y-full"
  }`;

  return (
    <>
      <header className={headerClassName}>
        <div className="container mx-auto flex flex-wrap p-5 items-center justify-between">
          <Link href="/">
            <img src="/logos/black.png" alt="Logo" className="w-50 h-10" />
          </Link>
          <nav className="flex space-x-6">
            <Link href="/products">
              <span className="hover:text-gray-900">Products</span>
            </Link>
            <Link href="/our-story">
              <span className="hover:text-gray-900">Our Story</span>
            </Link>
            <Link href="/help">
              <span className="hover:text-gray-900">Help</span>
            </Link>
          </nav>
          <div className="relative">
            <div className="flex items-center space-x-4">
              {/* Shopping Bag Icon */}
              <div onClick={handleBagClick} className="cursor-pointer">
                <FontAwesomeIcon
                  icon={faBagShopping}
                  className="text-gray-900 border border-dark-300 p-2 rounded hover:bg-black-200"
                  size="lg"
                />
                {cart.length > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </div>

              {/* User Icon */}
              {isLoggedIn ? (
                <div
                  className="cursor-pointer"
                  onClick={() => setShowLogout(!showLogout)}
                >
                  <FontAwesomeIcon
                    icon={faUser}
                    className="text-gray-900 border border-dark-300 p-2 rounded hover:bg-black-200"
                    size="lg"
                  />
                </div>
              ) : (
                <Link href="/login">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="text-gray-900 border border-dark-300 p-2 rounded hover:bg-black-200"
                    size="lg"
                  />
                </Link>
              )}
            </div>

            {/* Logout Subheader */}
            {showLogout && isLoggedIn && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-20">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Shopping Bag Modal */}
      {showBagDetails && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-end">
          <div className="bg-white w-1/3 h-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Shopping Bag</h2>
              <button
                className="text-xl font-bold"
                onClick={() => setShowBagDetails(false)}
              >
                &times;
              </button>
            </div>

            <div className="flex flex-col space-y-4">
              {cart.length === 0 ? (
                <p>Your shopping bag is empty.</p>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center">
                    <span>{item.name}</span>
                    <span>{item.price}</span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}
              {cart.length > 0 && (
                <button className="mt-auto bg-black text-white py-2 px-4">
                  Proceed to Checkout
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
