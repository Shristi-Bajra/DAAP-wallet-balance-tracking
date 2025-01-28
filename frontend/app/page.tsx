"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [connected, setConnected] = useState(false);
  const router = useRouter();

  const handleConnect = () => {
    // Simulate connecting to a wallet
    setConnected(true);
    // Redirect to the wallet page
    router.push('/wallet');
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to Our App</h1>
      <p className="text-xl mb-6">Please connect your wallet to proceed.</p>
      <button
        onClick={handleConnect}
        className="px-6 py-3 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        {connected ? 'Connected' : 'Connect Wallet'}
      </button>
    </div>
  );
}