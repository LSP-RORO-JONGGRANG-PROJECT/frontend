"use client";

import React, { useState, FormEvent, useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [shouldRedirect, setShouldRedirect] = useState<boolean>(false);
  const [verificationStatus, setVerificationStatus] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [verificationSent, setVerificationSent] = useState<boolean>(false);
  const [verificationMessage, setVerificationMessage] = useState<string>("");

  const productName = searchParams.get('product');
  const productPrice = searchParams.get('price');

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      verifyEmail(token);
    }
  }, [searchParams]);

  useEffect(() => {
    if (shouldRedirect) {
      router.push(`/checkout?product=${encodeURIComponent(productName || '')}&price=${encodeURIComponent(productPrice || '')}`);
    }
  }, [shouldRedirect, router, productName, productPrice]);

  const verifyEmail = async (token: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/verify-email?token=${token}`);
      const data = await response.json();

      if (response.ok) {
        setVerificationStatus('Email verified successfully. You can now log in.');
        setIsLogin(true); // Switch to login form
      } else {
        setVerificationStatus(data.error || 'Verification failed. Please try again.');
      }
    } catch (error) {
      setVerificationStatus('An error occurred. Please try again later.');
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError("");
    setVerificationMessage("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setVerificationMessage("");

    if (!email || !password || (!isLogin && (!firstName || !lastName))) {
      setError("All fields are required.");
      return;
    }

    const url = isLogin
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`
      : `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`;

    const body = isLogin
      ? JSON.stringify({ email, password })
      : JSON.stringify({ firstname: firstName, lastname: lastName, email, password });

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'An error occurred');
      }

      if (isLogin) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('isLoggedIn', 'true');
        setShouldRedirect(true);
      } else {
        setVerificationSent(true);
        setVerificationMessage("Registration successful. Please check your email to verify your account.");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative w-full h-screen">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
      >
        <source src="/images/medical.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-70 z-10"></div>

      <div className="flex items-center justify-end w-full h-full z-20 pr-12 pb-20">
        <div className="bg-white backdrop-blur-md p-8 shadow-lg max-w-md w-full rounded-lg z-20">
          {verificationStatus && (
            <div className={`mb-4 p-2 rounded ${verificationStatus.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {verificationStatus}
            </div>
          )}

          <div className="flex justify-between mb-6">
            <button
              className={`w-1/2 text-center py-2 font-bold ${isLogin ? "border-b-4 border-black" : ""}`}
              onClick={toggleForm}
            >
              Login
            </button>
            <button
              className={`w-1/2 text-center py-2 font-bold ${!isLogin ? "border-b-4 border-black" : ""}`}
              onClick={toggleForm}
            >
              Register
            </button>
          </div>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {verificationMessage && <p className="text-green-500 text-center mb-4">{verificationMessage}</p>}

          <h2 className="text-2xl font-bold mb-6 text-center">{isLogin ? "Login" : "Register"}</h2>
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <div className="mb-4">
                  <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700">First Name</label>
                  <input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="First Name"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700">Last Name</label>
                  <input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Last Name"
                  />
                </div>
              </>
            )}

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Email"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password</label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Password"
              />
              <span className="text-sm text-indigo-600 cursor-pointer mt-2" onClick={togglePasswordVisibility}>
                {showPassword ? "HIDE" : "SHOW"}
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
            >
              {isLogin ? "Log In" : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;