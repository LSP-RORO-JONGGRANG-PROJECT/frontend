// src/components/verify.tsx
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter dari 'next/navigation'
import { useSearchParams } from 'next/navigation'; // Import useSearchParams

const Verify = () => {
  const router = useRouter();
  const searchParams = useSearchParams(); // Mendapatkan query parameters
  const token = searchParams.get('token'); // Mengambil token dari query params
  const [verificationStatus, setVerificationStatus] = useState('Verifying...');

  useEffect(() => {
    if (token) {
      verifyEmail(token);
    }
  }, [token]); 

  const verifyEmail = async (token: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/verify-email?token=${token}`);
      const data = await response.json();

      if (response.ok) {
        setVerificationStatus('Email verified successfully. Redirecting to login...');
        setTimeout(() => router.push('/login'), 3000);
      } else {
        setVerificationStatus(data.error || 'Verification failed. Please try again.');
      }
    } catch (error) {
      setVerificationStatus('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Email Verification</h1>
        <p>{verificationStatus}</p>
      </div>
    </div>
  );
};

export default Verify;
