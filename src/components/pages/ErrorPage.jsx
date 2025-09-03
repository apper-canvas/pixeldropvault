import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';

const ErrorPage = () => {
  const [searchParams] = useSearchParams();
  const errorMessage = searchParams.get('message') || 'An error occurred';
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-dark">
      <div className="w-full max-w-md p-8 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl shadow-2xl border border-white/10 text-center">
        <h1 className="text-2xl font-bold text-red-400 mb-4">Authentication Error</h1>
        <p className="text-gray-300 mb-6">{errorMessage}</p>
        <Link 
          to="/login" 
          className="inline-block px-6 py-3 bg-gradient-primary text-white rounded-xl hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-200"
        >
          Return to Login
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;