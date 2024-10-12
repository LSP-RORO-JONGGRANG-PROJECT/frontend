"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons"; 
import { useRouter } from "next/navigation";

interface HeaderProps {
  isActive?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isActive }) => {
  const scrollPosition = useScrollPosition();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
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

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    router.push('/login');
  };

  const headerClassName = `sticky top-0 z-50 transition-all ${
    isVisible
      ? "opacity-100 translate-y-0 shadow bg-white backdrop-filter"
      : "opacity-0 -translate-y-full"
  }`;

  return (
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

            <Link href="/cart">
              <FontAwesomeIcon
                icon={faShoppingCart}
                className="text-gray-900 border border-dark-300 p-2 rounded hover:bg-black-200"
                size="lg"
              />
            </Link>

            {/* Ikon akun */}
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

          {/* Tampilkan subheader logout jika user login */}
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
  );
};

export default Header;
